import { PenSquare, Inbox, Send, ShieldAlert, Settings } from 'lucide-react';
import { Page } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onCompose: () => void;
}

export default function Sidebar({ currentPage, onPageChange, onCompose }: SidebarProps) {
  const menuItems = [
    { id: 'inbox' as Page, label: '<inbox_>', icon: Inbox },
    { id: 'sent' as Page, label: '<sent_>', icon: Send },
    { id: 'spam' as Page, label: '<spam_v2_>', icon: ShieldAlert, badge: 'V2' },
    { id: 'settings' as Page, label: '<settings_v2_>', icon: Settings, badge: 'V2' },
  ];

  return (
    <div className="w-56 bg-white border-r border-border/60 flex flex-col h-full">
      <div className="p-6 pb-8">
        <Button onClick={onCompose} className="w-full rounded-full" size="sm">
          <PenSquare className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Compose
        </Button>
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
                  ? 'bg-secondary text-foreground font-normal'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
