import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/presentation/shadcnUI/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border-slate-200 border-b-4 border-x-2 active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary:
          "bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 text-primary-foreground hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 border-blue-900 border-b-4 border-x-2 active:border-b-0",
        primaryOutline:
          "bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-300 text-blue-600 hover:from-blue-400 hover:via-blue-600 hover:to-blue-800 border-neutral-400 hover:border-blue-900 hover:text-white border-b-4 active:border-b-0",
        success:
          "bg-gradient-to-b from-green-400 via-green-600 to-green-800 text-primary-foreground hover:from-green-500 hover:via-green-700 hover:to-green-900 border-green-900 border-b-4 border-x-2 active:border-b-0",
        successOutline:
          "bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-300 text-green-600 hover:from-green-400 hover:via-green-600 hover:to-green-800 border-neutral-400 hover:border-green-900 hover:text-white border-b-4 border-x-2 active:border-b-0",
        danger:
          "bg-gradient-to-b from-red-400 via-red-600 to-red-800 text-primary-foreground hover:from-red-500 hover:via-red-700 hover:to-red-900 border-red-900 border-b-4 border-x-2 active:border-b-0",
        dangerOutline:
          "bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-300 text-red-600 hover:from-red-400 hover:via-red-600 hover:to-red-800 border-neutral-400 hover:border-red-900 hover:text-white border-b-4 border-x-2 active:border-b-0",
        warning:
          "bg-gradient-to-b from-yellow-400 via-yellow-600 to-yellow-800 text-primary-foreground hover:from-yellow-500 hover:via-yellow-700 hover:to-yellow-900 border-yellow-900 border-b-4 border-x-2 active:border-b-0",
        warningOutline:
          "bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-300 text-yellow-600 hover:from-yellow-400 hover:via-yellow-600 hover:to-yellow-800 border-neutral-400 hover:border-yellow-900 hover:text-white border-b-4 border-x-2 active:border-b-0",
        super:
          "bg-gradient-to-b from-indigo-400 via-indigo-600 to-indigo-800 text-primary-foreground hover:from-indigo-500 hover:via-indigo-700 hover:to-indigo-900 border-indigo-900 border-b-4 border-x-2 active:border-b-0",
        superOutline:
          "bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-300 text-indigo-600 hover:from-indigo-400 hover:via-indigo-600 hover:to-indigo-800 border-neutral-400 hover:border-indigo-900 hover:text-white border-b-4 border-x-2 active:border-b-0",
        locked:
          "bg-neutral-200 text-black hover:bg-neutral-300 border-neutral-400 border-b-4",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        transparent: "bg-transparent text-black hover:text-accent-foreground",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        square: "size-32 rounded-md",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
