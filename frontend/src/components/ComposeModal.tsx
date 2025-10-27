import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (to: string, subject: string, body: string) => void;
  replyTo?: {
    address: string;
    subject: string;
  };
}

export default function ComposeModal({ isOpen, onClose, onSend, replyTo }: ComposeModalProps) {
  const [to, setTo] = useState(replyTo?.address || '');
  const [subject, setSubject] = useState(replyTo?.subject ? `Re: ${replyTo.subject}` : '');
  const [body, setBody] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToChange = (value: string) => {
    setTo(value);

    if (value.length > 0) {
      const mockSuggestions = [
        `${value}.sol`,
        `${value}123.sol`,
        `${value}_official.sol`,
      ].filter(s => s.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSend = () => {
    if (to && subject && body) {
      onSend(to, subject, body);
      setTo('');
      setSubject('');
      setBody('');
      setSuggestions([]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl mx-4 flex flex-col max-h-[calc(100vh-10rem)]">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
          <h2 className="text-lg font-light text-black">New Message</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-5">
            <div className="relative">
              <label className="block text-xs font-light text-slate-500 mb-2">
                To
              </label>
              <input
                type="text"
                value={to}
                onChange={(e) => handleToChange(e.target.value)}
                placeholder="Enter .sol name"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-transparent transition-all text-sm font-light placeholder:text-slate-400"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setTo(suggestion);
                        setSuggestions([]);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors font-light"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-light text-slate-500 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-transparent transition-all text-sm font-light placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-light text-slate-500 mb-2">
                Message
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your message..."
                rows={12}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-transparent resize-none transition-all text-sm font-light placeholder:text-slate-400 leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-black transition-colors font-light">
                <DollarSign className="w-4 h-4" strokeWidth={1.5} />
                <span>Attach Crypto (V2)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 px-8 py-5 border-t border-slate-50 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2 text-slate-500 hover:text-black rounded-full transition-colors text-sm font-light"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!to || !subject || !body}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-sm font-light"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
