export interface Message {
  id: string;
  from: string;
  fromAddress: string;
  to: string;
  toAddress: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  paymail?: PaymailAttachment;
}

export interface PaymailAttachment {
  amount: number;
  currency: string;
  claimed: boolean;
}

export type Page = 'inbox' | 'sent' | 'spam' | 'settings' | 'message';

export interface WalletConnection {
  publicKey: string;
  solName: string;
  connected: boolean;
}
