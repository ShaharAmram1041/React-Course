// libs/ui/src/AppCard.tsx
import type { ReactNode, ComponentPropsWithoutRef } from "react";

type AppCardProps = {
  title?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"section">;

export function AppCard({ title, children, className, ...rest }: AppCardProps) {
  return (
    <section className={className} {...rest}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}
