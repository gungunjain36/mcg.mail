use anchor_lang::prelude::*;
use arcium_anchor::prelude::*;
use ephemeral_rollups_sdk::anchor::{delegate, ephemeral};
use ephemeral_rollups_sdk::cpi::DelegateConfig;

const COMP_DEF_OFFSET_SEAL_MESSAGE: u32 = comp_def_offset("seal_message_for_recipient");

declare_id!("Dmr92s93bQwh7ZeyxtJmA7T48xeULCPKRX4axmEKSBZJ");

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy)]
pub struct EncryptedMessage {
    pub ciphertext: [u8; 32], // The Arcium encrypted payload
    pub nonce: [u8; 16],
    pub sender: Pubkey,
    pub timestamp: i64,
}

#[account]
pub struct UserProfile {
    pub sol_name: String,
    pub arcium_pubkey: [u8; 32],
    pub spam_stake_amount: u64,
    pub owner: Pubkey,
}

const MAX_MESSAGES: usize = 100;

#[account]
pub struct Inbox {
    pub messages: [EncryptedMessage; MAX_MESSAGES],
    pub message_count: u64,
    pub owner: Pubkey,
}

#[ephemeral]
#[arcium_program]
pub mod blockend {
    use super::*;

    pub fn init_profile(
        ctx: Context<InitProfile>,
        sol_name: String,
        arcium_pubkey: [u8; 32],
        spam_stake_amount: u64,
    ) -> Result<()> {
        let profile = &mut ctx.accounts.user_profile;
        profile.sol_name = sol_name;
        profile.arcium_pubkey = arcium_pubkey;
        profile.spam_stake_amount = spam_stake_amount;
        profile.owner = ctx.accounts.user.key();
        Ok(())
    }

    pub fn init_inbox(ctx: Context<InitInbox>) -> Result<()> {
        let inbox = &mut ctx.accounts.inbox;
        inbox.message_count = 0;
        inbox.owner = ctx.accounts.user.key();
        Ok(())
    }

    pub fn send_message(
        ctx: Context<SendMessage>,
        computation_offset: u64,
        encrypted_message_input: Vec<u8>,
        recipient_arcium_pubkey: [u8; 32],
        nonce: u128,
    ) -> Result<()> {
        let args = vec![
            Argument::PlaintextU128(nonce),
            Argument::EncryptedBytes(encrypted_message_input),
            Argument::ArcisPubkey(recipient_arcium_pubkey),
        ];

        ctx.accounts.sign_pda_account.bump = ctx.bumps.sign_pda_account;

        queue_computation(
            ctx.accounts,
            computation_offset,
            args,
            None,
            vec![SendMessageCallback::callback_ix(&[
                CallbackAccount {
                    pubkey: ctx.accounts.recipient_inbox.key(),
                    is_writable: true,
                },
                CallbackAccount {
                    pubkey: ctx.accounts.sender_profile.key(),
                    is_writable: false,
                },
            ])],
        )?;
        Ok(())
    }

    #[arcium_callback(encrypted_ix = "seal_message_for_recipient")]
    pub fn send_message_callback(
        ctx: Context<SendMessageCallback>,
        output: ComputationOutputs<SealMessageForRecipientOutput>,
    ) -> Result<()> {
        let result = match output {
            ComputationOutputs::Success(SealMessageForRecipientOutput { field_0 }) => field_0,
            _ => return Err(ErrorCode::AbortedComputation.into()),
        };

        let new_message = EncryptedMessage {
            ciphertext: result.ciphertexts[0],
            nonce: result.nonce.to_le_bytes(),
            sender: ctx.accounts.sender_profile.owner,
            timestamp: Clock::get()?.unix_timestamp,
        };

        let inbox = &mut ctx.accounts.recipient_inbox;
        if (inbox.message_count as usize) < MAX_MESSAGES {
            inbox.messages[inbox.message_count as usize] = new_message;
            inbox.message_count += 1;
        }

        Ok(())
    }

    pub fn delegate_inbox(ctx: Context<DelegateInput>) -> Result<()> {
        ctx.accounts.delegate_pda(
            &ctx.accounts.payer,
            &[b"inbox", ctx.accounts.payer.key().as_ref()],
            DelegateConfig {
                validator: ctx.remaining_accounts.first().map(|acc| acc.key()),
                ..Default::default()
            },
        )?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitProfile<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 + 32 + 4 + 200, // 200 for sol_name string
        seeds = [b"profile", user.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitInbox<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + (56 * MAX_MESSAGES) + 8 + 32, // EncryptedMessage is 32+16+32+8=88, lets say 56 for anchor internal sizing
        seeds = [b"inbox", user.key().as_ref()],
        bump
    )]
    pub inbox: Account<'info, Inbox>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[delegate]
#[derive(Accounts)]
pub struct DelegateInput<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    /// CHECK: The pda to delegate (the Inbox)
    #[account(mut, del, seeds = [b"inbox", payer.key().as_ref()], bump)]
    pub pda: AccountInfo<'info>,
}

#[queue_computation_accounts("seal_message_for_recipient", payer)]
#[derive(Accounts)]
#[instruction(computation_offset: u64)]
pub struct SendMessage<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(seeds = [b"profile", payer.key().as_ref()], bump)]
    pub sender_profile: Account<'info, UserProfile>,

    #[account(mut, seeds = [b"inbox", recipient_profile.owner.as_ref()], bump)]
    pub recipient_inbox: Account<'info, Inbox>,

    #[account(seeds = [b"profile", recipient_profile.owner.as_ref()], bump)]
    pub recipient_profile: Account<'info, UserProfile>,

    #[account(
        init_if_needed,
        space = 9,
        payer = payer,
        seeds = [&SIGN_PDA_SEED],
        bump,
        address = derive_sign_pda!(),
    )]
    pub sign_pda_account: Account<'info, SignerAccount>,
    #[account(
        address = derive_mxe_pda!()
    )]
    pub mxe_account: Account<'info, MXEAccount>,
    #[account(
        mut,
        address = derive_mempool_pda!()
    )]
    /// CHECK: mempool_account, checked by the arcium program.
    pub mempool_account: UncheckedAccount<'info>,
    #[account(
        mut,
        address = derive_execpool_pda!()
    )]
    /// CHECK: executing_pool, checked by the arcium program.
    pub executing_pool: UncheckedAccount<'info>,
    #[account(
        mut,
        address = derive_comp_pda!(computation_offset)
    )]
    /// CHECK: computation_account, checked by the arcium program.
    pub computation_account: UncheckedAccount<'info>,
    #[account(
        address = derive_comp_def_pda!(COMP_DEF_OFFSET_SEAL_MESSAGE)
    )]
    pub comp_def_account: Account<'info, ComputationDefinitionAccount>,
    #[account(
        mut,
        address = derive_cluster_pda!(mxe_account)
    )]
    pub cluster_account: Account<'info, Cluster>,
    #[account(
        mut,
        address = ARCIUM_FEE_POOL_ACCOUNT_ADDRESS,
    )]
    pub pool_account: Account<'info, FeePool>,
    #[account(
        address = ARCIUM_CLOCK_ACCOUNT_ADDRESS
    )]
    pub clock_account: Account<'info, ClockAccount>,
    pub system_program: Program<'info, System>,
    pub arcium_program: Program<'info, Arcium>,
}

#[callback_accounts("seal_message_for_recipient")]
#[derive(Accounts)]
pub struct SendMessageCallback<'info> {
    pub arcium_program: Program<'info, Arcium>,
    #[account(
        address = derive_comp_def_pda!(COMP_DEF_OFFSET_SEAL_MESSAGE)
    )]
    pub comp_def_account: Account<'info, ComputationDefinitionAccount>,
    #[account(address = ::anchor_lang::solana_program::sysvar::instructions::ID)]
    /// CHECK: instructions_sysvar, checked by the account constraint
    pub instructions_sysvar: AccountInfo<'info>,

    #[account(mut, seeds=[b"inbox", recipient_inbox.owner.as_ref()], bump)]
    pub recipient_inbox: Account<'info, Inbox>,

    #[account(seeds=[b"profile", sender_profile.owner.as_ref()], bump)]
    pub sender_profile: Account<'info, UserProfile>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The computation was aborted")]
    AbortedComputation,
    #[msg("Cluster not set")]
    ClusterNotSet,
}
