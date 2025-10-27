import { Wallet, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

interface ConnectScreenProps {
  onConnect: () => void;
}

export default function ConnectScreen({ onConnect }: ConnectScreenProps) {
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
          redacted_mail. private _ on-chain _ minimal
        </p>

        <div className="bg-card border border-border rounded-md text-left p-5 mb-8">
          <div className="h-3 w-24 bg-muted rounded-[2px] mb-3" />
          <div className="h-3 w-48 bg-muted rounded-[2px] mb-2" />
          <div className="h-3 w-40 bg-muted rounded-[2px]" />
        </div>

        <Button onClick={onConnect} className="rounded-md px-5">
          <Wallet className="w-4 h-4 mr-2" strokeWidth={1.5} />
          connect_wallet
          <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
        </Button>

        <div className="mt-8">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-light">
            read_docs &gt;
          </a>
        </div>
      </div>
    </div>
  );
}
