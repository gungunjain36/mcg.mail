use arcis_imports::*;

#[encrypted]
mod circuits {
    use arcis_imports::*;

    // This is the struct the SENDER encrypts for the MXE
    pub struct MessageInput {
        subject: [u8; 64], // Use fixed-size arrays for strings
        body: [u8; 256],
    }

    // This is the struct the MPC circuit will re-encrypt for the RECIPIENT
    #[derive(Clone, Copy)]
    pub struct MessageOutput {
        subject: [u8; 64],
        body: [u8; 256],
    }

    #[instruction]
    pub fn seal_message_for_recipient(
        // The sender encrypts the message for the MXE
        message_ctxt: Enc<Mxe, MessageInput>,
        // The recipient's public key, passed in plaintext
        recipient_key: Shared,
    ) -> Enc<Shared, MessageOutput> {
        // 1. Decrypt the sender's message inside the MPC enclave
        let message = message_ctxt.to_arcis();

        // 2. Create the output struct
        let output = MessageOutput {
            subject: message.subject,
            body: message.body,
        };

        // 3. "Seal" (re-encrypt) the output for the recipient
        // This is the core magic:
        // It computes on Mxe-encrypted data and returns Shared-encrypted data
        // for a *different* user (the recipient).
        recipient_key.from_arcis(output)
    }
}
