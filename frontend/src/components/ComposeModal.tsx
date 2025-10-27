import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-light">New Message</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="relative">
            <label className="block text-xs font-light text-muted-foreground mb-2">To</label>
            <Input
              value={to}
              onChange={(e) => handleToChange(e.target.value)}
              placeholder="Enter .sol name"
              className="rounded-xl"
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTo(suggestion);
                      setSuggestions([]);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-secondary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-light text-muted-foreground mb-2">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-light text-muted-foreground mb-2">Message</label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message..."
              rows={12}
              className="rounded-xl"
            />
          </div>

          <div className="pt-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <DollarSign className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Attach Crypto (V2)
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend} disabled={!to || !subject || !body}>Send</Button>
        </div>
        <DialogClose className="absolute right-4 top-4 text-muted-foreground"><X className="w-5 h-5" strokeWidth={1.5} /></DialogClose>
      </DialogContent>
    </Dialog>
  );
}
