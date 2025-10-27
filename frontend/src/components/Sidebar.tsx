import { PenSquare, Inbox, Send, ShieldAlert, Settings } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onCompose: () => void;
}

export default function Sidebar({ currentPage, onPageChange, onCompose }: SidebarProps) {
  const menuItems = [
    { id: 'inbox' as Page, label: 'Inbox', icon: Inbox },
    { id: 'sent' as Page, label: 'Sent', icon: Send },
    { id: 'spam' as Page, label: 'Spam', icon: ShieldAlert, badge: 'V2' },
    { id: 'settings' as Page, label: 'Settings', icon: Settings, badge: 'V2' },
  ];

  return (
    <div className="w-56 bg-white border-r border-slate-100 flex flex-col h-full">
      <div className="p-6 pb-8">
        <button
          onClick={onCompose}
          className="w-full bg-black text-white px-5 py-2.5 rounded-full font-light text-sm hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <PenSquare className="w-4 h-4" strokeWidth={1.5} />
          Compose
        </button>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-full mb-1 transition-all duration-200 text-sm ${
                isActive
                  ? 'bg-slate-50 text-black font-normal'
                  : 'text-slate-500 hover:text-black hover:bg-slate-50/50 font-light'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-light">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
