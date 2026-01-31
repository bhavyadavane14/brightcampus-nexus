import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Status variants for campus system
        approved: "border-success/20 bg-success/10 text-success",
        pending: "border-warning/20 bg-warning/10 text-warning",
        rejected: "border-destructive/20 bg-destructive/10 text-destructive",
        draft: "border-border bg-muted text-muted-foreground",
        completed: "border-primary/20 bg-primary/10 text-primary",
        // Role variants
        admin: "border-destructive/20 bg-destructive/10 text-destructive font-bold",
        organizer: "border-primary/20 bg-primary/10 text-primary font-bold",
        participant: "border-accent/20 bg-accent/10 text-accent font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
