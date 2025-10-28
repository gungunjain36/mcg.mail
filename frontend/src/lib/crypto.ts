export type EncryptedComposePayload = {
  ciphertext: Uint8Array;
  nonce: Uint8Array; // 16 bytes
};

export function getRandomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(arr);
    return arr;
  }
  // Fallback (not cryptographically secure)
  for (let i = 0; i < length; i++) arr[i] = Math.floor(Math.random() * 256);
  return arr;
}

async function sha256(data: Uint8Array): Promise<Uint8Array> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return new Uint8Array(digest);
  }
  // Minimal fallback: XOR fold to 32 bytes (not secure; for demo only)
  const out = new Uint8Array(32);
  for (let i = 0; i < data.length; i++) out[i % 32] ^= data[i];
  return out;
}

export async function pseudoEncryptMessage(subject: string, body: string): Promise<EncryptedComposePayload> {
  const nonce = getRandomBytes(16);
  const encoder = new TextEncoder();
  const input = encoder.encode(`${subject}\u0000${body}`);
  const ciphertext = await sha256(input);
  return { ciphertext, nonce };
}


