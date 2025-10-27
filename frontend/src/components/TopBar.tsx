import { Search } from 'lucide-react';
import { WalletConnection } from '../types';
import Logo from './Logo';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface TopBarProps {
  wallet: WalletConnection;
}

export default function TopBar({ wallet }: TopBarProps) {
  return (
    <div className="h-14 bg-white border-b border-border/60 flex items-center px-6 gap-8">
      <div className="flex items-center gap-2.5">
        <Logo className="w-6 h-6" />
        <span className="font-light text-sm text-foreground tracking-tight">&lt;mcg_mail/&gt;</span>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 rounded-full bg-secondary focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-normal text-foreground">{wallet.solName}</div>
          <div className="text-xs text-muted-foreground font-light">
            {wallet.publicKey.slice(0, 4)}...{wallet.publicKey.slice(-4)}
          </div>
        </div>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-light">
            {wallet.solName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
