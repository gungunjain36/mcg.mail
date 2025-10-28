import { Connection, PublicKey } from '@solana/web3.js';

export type Providers = {
  l1: Connection;
  er: Connection;
};

export function createProviders(): Providers {
  const l1Rpc = (import.meta as any).env?.VITE_L1_RPC || 'https://api.devnet.solana.com';
  const erRpc = (import.meta as any).env?.VITE_ER_RPC || 'https://devnet-as.magicblock.app/';
  return {
    l1: new Connection(l1Rpc, 'confirmed'),
    er: new Connection(erRpc, 'confirmed'),
  };
}

export async function isDelegatedInbox(_owner: PublicKey): Promise<boolean> {
  // Placeholder: real check would read delegation state from program accounts
  return true;
}


