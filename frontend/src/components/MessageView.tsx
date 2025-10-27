import { ArrowLeft, Reply, Forward, Trash2, DollarSign, Sparkles } from 'lucide-react';
import { Message } from '../types';
import { formatFullDate } from '../utils/dateUtils';

interface MessageViewProps {
  message: Message;
  onBack: () => void;
  onReply: () => void;
}

export default function MessageView({ message, onBack, onReply }: MessageViewProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-shrink-0 border-b border-slate-50 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm font-light">Back</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={onReply}
              className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-black hover:bg-slate-50 rounded-full transition-all text-sm font-light"
            >
              <Reply className="w-4 h-4" strokeWidth={1.5} />
              <span>Reply</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-black hover:bg-slate-50 rounded-full transition-all text-sm font-light">
              <Forward className="w-4 h-4" strokeWidth={1.5} />
              <span>Forward</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all text-sm font-light">
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-light text-black mb-6 tracking-tight">
          {message.subject}
        </h1>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-xs font-light">
              {message.from.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-normal text-black">{message.from}</span>
                <span className="text-xs text-slate-400 font-light">
                  ({message.fromAddress.slice(0, 6)}...{message.fromAddress.slice(-4)})
                </span>
              </div>
              <div className="text-xs text-slate-400 font-light">
                to {message.to}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400 font-light">
            {formatFullDate(message.timestamp)}
          </div>
        </div>
      </div>

      {message.paymail && (
        <div className="flex-shrink-0 mx-8 mt-6">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-700" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-normal text-sm text-emerald-900">
                  Payment Attached
                </div>
                <div className="text-sm text-emerald-700 font-light">
                  This email includes {message.paymail.amount} {message.paymail.currency}
                </div>
              </div>
            </div>
            {!message.paymail.claimed && (
              <button className="px-5 py-2 bg-black text-white rounded-full text-sm font-light hover:bg-slate-800 transition-colors">
                Claim
              </button>
            )}
            {message.paymail.claimed && (
              <span className="text-sm text-emerald-700 font-light">Claimed</span>
            )}
          </div>
        </div>
      )}

      <div className="flex-shrink-0 mx-8 mt-6 mb-6">
        <div className="flex items-center gap-2 p-3 bg-slate-50/50 border border-slate-100 rounded-full">
          <Sparkles className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
          <span className="text-xs text-slate-400 font-light">AI Toolbar (V2)</span>
          <button className="ml-auto px-3 py-1.5 text-xs font-light bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
            Summarize
          </button>
          <button className="px-3 py-1.5 text-xs font-light bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
            Find Related
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="prose prose-slate max-w-none">
          <div className="whitespace-pre-wrap text-slate-600 leading-relaxed font-light text-sm">
            {message.body}
          </div>
        </div>
      </div>
    </div>
  );
}
