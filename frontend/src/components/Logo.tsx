import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn('text-primary', className)}
    >
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#g)" opacity="0.12" />
      <path
        d="M12 22c0-2.209 1.791-4 4-4h32c2.209 0 4 1.791 4 4v0c0 1.24-.574 2.406-1.546 3.156L34.454 39.156c-1.458 1.12-3.45 1.12-4.908 0L13.546 25.156C12.574 24.406 12 23.24 12 22v0z"
        fill="currentColor"
      />
      <path
        d="M12 26.5l14.682 11.12c2.01 1.523 4.626 1.523 6.636 0L48 26.5V42a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V26.5z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}


