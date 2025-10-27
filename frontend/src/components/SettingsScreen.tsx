import { ShieldCheck, User } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SettingsScreen() {
  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="max-w-2xl mx-auto p-8 py-10">
        <h1 className="text-3xl font-light text-foreground mb-2 tracking-tight">Settings</h1>
        <p className="text-muted-foreground mb-12 text-sm font-light">Manage your identity and protocol-level rules</p>

        <div className="space-y-8">
          <div className="bg-secondary rounded-2xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-base font-normal text-foreground">Profile</h2>
                <p className="text-xs text-muted-foreground font-light">Your on-chain identity settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-light text-muted-foreground mb-2">
                  Default Sending Identity
                </label>
                <select className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent bg-white text-sm font-light">
                  <option>yourname.sol</option>
                  <option>alternative.sol</option>
                </select>
                <p className="mt-2 text-xs text-muted-foreground font-light">
                  Select which .sol domain to use when sending messages
                </p>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-2xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-base font-normal text-foreground">Spam Filter</h2>
                <p className="text-xs text-muted-foreground font-light">Protect your inbox with crypto-economic spam prevention</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 bg-white border border-border rounded-xl">
                <div>
                  <div className="font-normal text-sm text-foreground">Enable Anti-Spam Stake</div>
                  <div className="text-xs text-muted-foreground mt-1 font-light">
                    Require strangers to stake crypto to message you
                  </div>
                </div>
                <Switch />
              </div>

              <div>
                <label className="block text-xs font-light text-muted-foreground mb-2">
                  Required Stake Amount
                </label>
                <div className="flex gap-2">
                  <Input type="number" defaultValue="1.00" step="0.01" className="flex-1 rounded-xl" />
                  <select className="px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent bg-white text-sm font-light">
                    <option>iUSD</option>
                    <option>SOL</option>
                  </select>
                </div>
                <p className="mt-2 text-xs text-muted-foreground font-light">
                  Strangers must stake this amount to email you. They forfeit it if you mark them as spam.
                </p>
              </div>

              <div>
                <label className="block text-xs font-light text-muted-foreground mb-2">
                  Allowlist
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3.5 border border-border rounded-xl bg-white">
                    <span className="text-sm text-foreground font-light">alice.sol</span>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">Remove</Button>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-border rounded-xl bg-white">
                    <span className="text-sm text-foreground font-light">bob.sol</span>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">Remove</Button>
                  </div>
                </div>
                <Button variant="outline" className="mt-3 w-full rounded-xl">Add to Allowlist</Button>
                <p className="mt-2 text-xs text-muted-foreground font-light">
                  Users on your allowlist can always email you for free
                </p>
              </div>

              <div>
                <label className="block text-xs font-light text-muted-foreground mb-2">
                  Blocklist
                </label>
                <div className="text-sm text-muted-foreground p-5 border border-border rounded-xl text-center bg-white font-light">
                  No blocked users
                </div>
                <Button variant="outline" className="mt-3 w-full rounded-xl">Add to Blocklist</Button>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-2xl border border-border p-8">
            <div className="text-xs text-muted-foreground font-light">
              <p className="font-normal text-foreground mb-2 text-sm">About mcg.mail</p>
              <p className="leading-relaxed">
                Powered by MCG Protocol with Phantom wallet integration, Solana Name Service,
                Arcium for privacy, and Triton for speed.
              </p>
              <div className="mt-5 flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
