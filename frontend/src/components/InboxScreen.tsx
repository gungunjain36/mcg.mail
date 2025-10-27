import { Message } from '../types';
import { formatDistanceToNow } from '../utils/dateUtils';

interface InboxScreenProps {
  messages: Message[];
  onMessageSelect: (message: Message) => void;
}

export default function InboxScreen({ messages, onMessageSelect }: InboxScreenProps) {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-slate-300 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
          </div>
          <p className="text-slate-500 font-light text-sm">Your inbox is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="divide-y divide-slate-50">
        {messages.map((message) => (
          <button
            key={message.id}
            onClick={() => onMessageSelect(message)}
            className={`w-full text-left px-8 py-5 hover:bg-slate-50/50 transition-all duration-200 ${
              !message.isRead ? 'bg-slate-50/30' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className={`text-sm ${!message.isRead ? 'font-normal text-black' : 'font-light text-slate-900'}`}>
                    {message.from}
                  </span>
                  {!message.isRead && (
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  )}
                </div>
                <div className={`text-sm mb-1.5 ${!message.isRead ? 'font-normal text-black' : 'font-light text-slate-600'}`}>
                  {message.subject}
                </div>
                <div className="text-sm text-slate-400 truncate font-light">
                  {message.body.substring(0, 100)}...
                </div>
              </div>
              <div className="text-xs text-slate-400 whitespace-nowrap font-light">
                {formatDistanceToNow(message.timestamp)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
