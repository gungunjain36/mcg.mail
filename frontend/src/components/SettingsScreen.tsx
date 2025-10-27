import { ShieldCheck, User } from 'lucide-react';

export default function SettingsScreen() {
  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="max-w-2xl mx-auto p-8 py-10">
        <h1 className="text-3xl font-light text-black mb-2 tracking-tight">Settings</h1>
        <p className="text-slate-400 mb-12 text-sm font-light">Manage your identity and protocol-level rules</p>

        <div className="space-y-8">
          <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-base font-normal text-black">Profile</h2>
                <p className="text-xs text-slate-400 font-light">Your on-chain identity settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-light text-slate-500 mb-2">
                  Default Sending Identity
                </label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-transparent bg-white text-sm font-light">
                  <option>yourname.sol</option>
                  <option>alternative.sol</option>
                </select>
                <p className="mt-2 text-xs text-slate-400 font-light">
                  Select which .sol domain to use when sending messages
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-base font-normal text-black">Spam Filter</h2>
                <p className="text-xs text-slate-400 font-light">Protect your inbox with crypto-economic spam prevention</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-xl">
                <div>
                  <div className="font-normal text-sm text-black">Enable Anti-Spam Stake</div>
                  <div className="text-xs text-slate-400 mt-1 font-light">
                    Require strangers to stake crypto to message you
                  </div>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-300">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1 shadow-sm" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-light text-slate-500 mb-2">
                  Required Stake Amount
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    defaultValue="1.00"
                    step="0.01"
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-transparent text-sm font-light"
                  />
                  <select className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-transparent bg-white text-sm font-light">
                    <option>iUSD</option>
                    <option>SOL</option>
                  </select>
                </div>
                <p className="mt-2 text-xs text-slate-400 font-light">
                  Strangers must stake this amount to email you. They forfeit it if you mark them as spam.
                </p>
              </div>

              <div>
                <label className="block text-xs font-light text-slate-500 mb-2">
                  Allowlist
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl bg-white">
                    <span className="text-sm text-black font-light">alice.sol</span>
                    <button className="text-xs text-slate-400 hover:text-red-600 transition-colors font-light">Remove</button>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl bg-white">
                    <span className="text-sm text-black font-light">bob.sol</span>
                    <button className="text-xs text-slate-400 hover:text-red-600 transition-colors font-light">Remove</button>
                  </div>
                </div>
                <button className="mt-3 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-light text-slate-600 hover:bg-white hover:text-black transition-colors">
                  Add to Allowlist
                </button>
                <p className="mt-2 text-xs text-slate-400 font-light">
                  Users on your allowlist can always email you for free
                </p>
              </div>

              <div>
                <label className="block text-xs font-light text-slate-500 mb-2">
                  Blocklist
                </label>
                <div className="text-sm text-slate-400 p-5 border border-slate-200 rounded-xl text-center bg-white font-light">
                  No blocked users
                </div>
                <button className="mt-3 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-light text-slate-600 hover:bg-white hover:text-black transition-colors">
                  Add to Blocklist
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/30 rounded-2xl border border-slate-100 p-8">
            <div className="text-xs text-slate-400 font-light">
              <p className="font-normal text-slate-600 mb-2 text-sm">About mcg.mail</p>
              <p className="leading-relaxed">
                Powered by MCG Protocol with Phantom wallet integration, Solana Name Service,
                Arcium for privacy, and Triton for speed.
              </p>
              <div className="mt-5 flex gap-4">
                <a href="#" className="text-slate-500 hover:text-black transition-colors">Documentation</a>
                <a href="#" className="text-slate-500 hover:text-black transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-500 hover:text-black transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
