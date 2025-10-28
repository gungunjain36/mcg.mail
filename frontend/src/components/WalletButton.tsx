import { useCallback, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Wallet, LogOut, SwitchCamera, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function shorten(addr: string) {
  return addr.slice(0, 4) + '...' + addr.slice(-4);
}

export default function WalletButton() {
  const { connected, connecting, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  const label = useMemo(() => {
    if (connecting) return 'connecting_';
    if (connected && publicKey) return `<${shorten(publicKey.toBase58())}>`;
    return 'connect_wallet';
  }, [connected, connecting, publicKey]);

  const onCopy = useCallback(async () => {
    if (!publicKey) return;
    try {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {}
  }, [publicKey]);

  if (!connected) {
    return (
      <Button onClick={() => setVisible(true)} className="rounded-md px-4" size="sm">
        <Wallet className="w-4 h-4 mr-2" strokeWidth={1.5} />
        {label}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-md px-3" size="sm">
          <Wallet className="w-4 h-4 mr-2" strokeWidth={1.5} />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={onCopy} className="cursor-pointer">
          {copied ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          copy_address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setVisible(true)} className="cursor-pointer">
          <SwitchCamera className="w-4 h-4 mr-2" />
          change_wallet
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => disconnect()} className="text-destructive cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


