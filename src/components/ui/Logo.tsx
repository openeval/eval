import Image from "next/image";

import { cn } from "~/lib/utils";

interface LogoProps {
  className?: string;
}
export function Logo({ className, ...props }: LogoProps) {
  return (
    <Image
      {...props}
      src="logo.svg"
      alt="logo"
      className={cn(className)}
      priority
      width={170}
      height={90}
    />
  );
}
