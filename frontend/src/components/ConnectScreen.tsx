import { useEffect } from 'react';
import { Shield, KeyRound, CheckCircle2, Lock } from 'lucide-react';
import Logo from './Logo';
import WalletButton from './WalletButton';
import { useWallet } from '@solana/wallet-adapter-react';

interface ConnectScreenProps {
  onConnect: () => void;
}

export default function ConnectScreen({ onConnect }: ConnectScreenProps) {
  const { connected } = useWallet();

  useEffect(() => {
    if (connected) onConnect();
  }, [connected, onConnect]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <div className="mb-10 flex justify-center">
          <Logo className="w-12 h-12" />
        </div>

        <h1 className="text-4xl font-light tracking-tight text-foreground mb-3">
          <span className="opacity-70">&lt;</span> mcg_mail <span className="opacity-70">/&gt;</span>
        </h1>

        <p className="text-muted-foreground text-sm mb-10 font-light">
          encrypted communication on solana
        </p>

        <div className="bg-card border border-border rounded-md text-left p-5 mb-8">
          <div className="text-xs text-muted-foreground mb-3 tracking-wider">[ mail_preview ]</div>

          <div className="grid gap-2 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">from:</span>
              <span className="text-foreground">&lt;alice.sol&gt;</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">to:</span>
              <span className="text-foreground">&lt;you.sol&gt;</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">subject:</span>
              <span className="text-foreground">welcome_to &lt;mcg_mail/&gt;</span>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-relaxed">
            <p className="text-foreground/90">hey — welcome to the future of private communication.</p>
            <div className="grid gap-2">
              <div className="flex items-start gap-2 text-foreground/90">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary" />
                <span>End-to-end encrypted using <span className="underline underline-offset-4">Arcium</span></span>
              </div>
              <div className="flex items-start gap-2 text-foreground/90">
                <Shield className="w-4 h-4 mt-0.5 text-primary" />
                <span>Verifiable on the <span className="underline underline-offset-4">Solana</span> blockchain</span>
              </div>
              <div className="flex items-start gap-2 text-foreground/90">
                <KeyRound className="w-4 h-4 mt-0.5 text-primary" />
                <span>Only readable by you with your <span className="underline underline-offset-4">Phantom</span> wallet</span>
              </div>
              <div className="flex items-start gap-2 text-foreground/90">
                <Lock className="w-4 h-4 mt-0.5 text-primary" />
                <span>Censorship-resistant and truly decentralized.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
