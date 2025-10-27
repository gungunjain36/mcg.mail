import { Mail } from 'lucide-react';

interface ConnectScreenProps {
  onConnect: () => void;
}

export default function ConnectScreen({ onConnect }: ConnectScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-12 flex justify-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <Mail className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-5xl font-light tracking-tight text-black mb-4">
          mcg.mail
        </h1>

        <p className="text-slate-500 text-base mb-16 font-light">
          Truly private, on-chain mail.
        </p>

        <button
          onClick={onConnect}
          className="w-full bg-black text-white px-8 py-4 rounded-full font-normal text-sm hover:bg-slate-800 transition-all duration-300 ease-out"
        >
          Connect Wallet
        </button>

        <div className="mt-12">
          <a
            href="#"
            className="text-xs text-slate-400 hover:text-black transition-colors font-light"
          >
            Learn about MCG Protocol
          </a>
        </div>
      </div>
    </div>
  );
}
