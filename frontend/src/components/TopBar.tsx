import { Search, Mail } from 'lucide-react';
import { WalletConnection } from '../types';

interface TopBarProps {
  wallet: WalletConnection;
}

export default function TopBar({ wallet }: TopBarProps) {
  return (
    <div className="h-14 bg-white border-b border-slate-100 flex items-center px-6 gap-8">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
          <Mail className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
        </div>
        <span className="font-light text-sm text-black tracking-tight">mcg.mail</span>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border-0 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-light"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-normal text-black">{wallet.solName}</div>
          <div className="text-xs text-slate-400 font-light">
            {wallet.publicKey.slice(0, 4)}...{wallet.publicKey.slice(-4)}
          </div>
        </div>
        <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-xs font-light">
          {wallet.solName.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
