import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Mail className={cn('text-primary', className)} />
  );
}
