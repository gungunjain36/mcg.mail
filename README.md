# mcg.mail - Private, Programmable Communication for Web3

## What is mcg.mail?

mcg.mail is the first end-to-end encrypted, wallet-native email protocol built on Solana. It transforms your Phantom wallet into your identity and your .sol name into your email address, creating truly private, verifiable, and programmable communication.

**Core Innovation:** Instead of creating accounts, you connect your wallet. Instead of trusting servers, you trust cryptography. Instead of paying platforms, you own your communication.

## The Stack
- **Identity:** Phantom Wallet (no accounts, just connect)
- **Usernames:** Solana Name Service (.sol domains as email addresses)
- **Privacy:** Arcium (confidential message storage & AI)
- **Speed:** Triton (fast RPC queries)
- **Finance:** Reflect (paymail & anti-spam economics)
- **AI:** ASI Agents (private AI that can't read your data)

## Rating: 8.5/10

**Why it's strong:**
- It's not "just" Web3 Gmail — it's **private, verifiable, and programmable communication**
- Elite tech stack that all fits together cleanly
- Elegant UX for crypto-native users (connect, send, decrypt locally)
- Strategic extensibility: privacy today → AI tomorrow → programmable comms later

**Why not 10/10 (yet):**
- User incentive loop needs tightening for mainstream adoption
- The "why pay to send email?" question needs better positioning
- Needs social/monetary utility early before privacy alone can drive adoption

## User Incentives: Why People Will Actually Use This

### 1. **Trust & Verification** (Immediate Value)
- "No one, not even mcg.mail, can read your messages"
- Messages are verifiable on-chain — censorship-resistant communication
- Perfect for founders, investors, DAOs, project teams needing audit trails

**Positioning:** *"Gmail was for the web. mcg.mail is for the chain."*

### 2. **Financial Utility** (Core Differentiator)
This is your answer to "why pay to send email?":

**Paymail:** Attach crypto (iUSD) directly to messages
- Use case: grants, payouts, collaborations
- "Message = payment + context"

**Anti-Spam Economics:** Strangers stake small amounts to message you
- You whitelist trusted contacts (free messaging)
- Spammers lose their stake if you mark them as spam
- **Your inbox becomes an economy that pays you**

**Positioning:** *"Earn from your inbox. Spam costs them, not you."*

This isn't just email — it's **guaranteed attention with skin in the game**.

### 3. **Social Status & Network Effects** (Growth Driver)
- Every .sol name owner wants a verified communication channel
- Direct access to founders, DAOs, creators without Discord chaos
- Reputation emerges: fast replies, fair stakes, clean on-chain record = trust
- This reputation becomes valuable for protocols, DAOs, on-chain resumes

**Positioning:** *"Your wallet. Your name. Your verified inbox."*

### 4. **Private AI** (Future Moat)
- First privacy-preserving AI email agent
- Summarize, draft, analyze — all inside encrypted enclaves
- AI that works *for* you, not *through* you

## The Complete User Experience

### Connect Screen
- No sign-up, just "Connect Wallet to Read Mail"
- Your Phantom wallet becomes your login

### Main Interface (Gmail-like)
- **Sidebar:** Compose, Inbox, Sent, Spam, Settings
- **Top Bar:** Search, yourname.sol profile
- **Main Area:** Message list or selected message

### Core Flow
1. **Connect:** Phantom wallet + .sol name resolution
2. **Receive:** On-chain pings + encrypted payloads in Arcium
3. **Read:** Local decryption with your wallet
4. **Send:** Encrypt → Store → Ping on-chain
5. **Earn:** Stake requirements for strangers, paymail attachments

## Positioning Strategy

**Tagline:** "Private, programmable mail for the onchain world"

**Core Message:**
- Wallets are the new identity
- Privacy is the new trust  
- Communication is the missing link
- mcg.mail bridges that gap — verifiable, encrypted, and ownable

## Early Adoption Strategy

1. **Target crypto-native users first:** Devs, founders, DAOs already using Phantom & .sol names
2. **Grant/bounty delivery:** DAOs send funds + messages in one transaction
3. **On-chain notifications:** Bridge blockchain events to private messages
4. **Reputation layer:** Build trust through verified communication history

## Why This Wins

mcg.mail isn't competing with Gmail — it's creating the **communication layer of Solana**. When every wallet needs a verified inbox and every message can carry value, this becomes infrastructure, not just an app.

The incentive loop is: **Privacy attracts → Economics retains → Network effects scale → AI differentiates**

## Integration Setup (Arcium + MagicBlock)

- Install CLIs and toolchains (host):
  - Arcium: `arcium --version` (see docs to install)
  - Solana CLI: `solana --version`
  - Anchor: `anchor --version`

- Initialize MXE and program (skeleton):
  - MXE circuits in `encrypted-ixs/circuits/send_mail.rs`
  - Anchor program in `programs/mcg_mail/src/lib.rs`

- Frontend env (create `frontend/.env`):
```
VITE_L1_RPC=https://api.devnet.solana.com
VITE_ER_RPC=https://devnet-as.magicblock.app/
```

- Dev flow:
  - Build MXE/program: `arcium build`
  - Deploy MXE/program: `arcium deploy --cluster-offset <offset> --keypair-path ~/.config/solana/id.json --rpc-url <rpc>`
  - Initialize comp-def in program (see Arcium docs) for `seal_message_for_recipient`
  - Delegate inbox PDA on ER: call `delegate_inbox` with ER validator as remaining account

- Frontend compose currently encrypts (placeholder) and logs payload to send via ER. Replace with real `@arcium-hq/client` encryption + Anchor tx when program IDs are available.
