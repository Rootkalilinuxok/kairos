"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Portal } from "@/core/types/portal";
import { mobileNavigationForPortal } from "@/core/navigation/registry";
import { iconRegistry } from "@/components/shell/icon-registry";
import { useSidebar } from "@/components/ui/sidebar";
import { useUniversalCommandBar } from "@/components/command-bar/universal-command-bar";
import { cn } from "@/lib/utils";

export function MobileNavigation({ portal }: { portal: Portal }) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const { openCommandBar } = useUniversalCommandBar();
  const items = mobileNavigationForPortal(portal);

  return (
    <nav aria-label="Navigazione mobile" className="fixed inset-x-0 bottom-0 z-40 grid h-[4.25rem] grid-cols-5 border-t border-border/80 bg-background/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      {items.map((item) => {
        const Icon = iconRegistry[item.icon];
        const active = item.behavior === "route" && item.route === pathname;
        const content = <><Icon className="size-[1.15rem]" /><span className="mt-1 truncate px-0.5 text-[11px] font-medium">{item.label}</span></>;
        const className = cn("kairos-mobile-nav-item relative flex min-h-11 min-w-0 flex-col items-center justify-center text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transform-none", active && "text-accent-brand-foreground after:absolute after:top-0 after:h-0.5 after:w-6 after:rounded-full after:bg-accent-brand");

        if (item.behavior === "menu") return <button type="button" key={item.key} className={className} onClick={toggleSidebar} aria-label="Apri menu completo">{content}</button>;
        if (item.behavior === "command-actions") return <button type="button" key={item.key} className={className} onClick={() => openCommandBar("action")} aria-label="Apri azioni KAIROS in anteprima">{content}</button>;
        return <Link key={item.key} href={item.route!} className={className} aria-current={active ? "page" : undefined}>{content}</Link>;
      })}
    </nav>
  );
}
