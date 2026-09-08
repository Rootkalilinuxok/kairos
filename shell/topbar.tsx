"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, Command, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { navigationItemForRoute } from "@/core/navigation/registry";
import type { Portal } from "@/core/types/portal";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { developmentExperienceConfig, developmentFixtureContext } from "@/fixtures/development";
import { useUniversalCommandBar } from "@/components/command-bar/universal-command-bar";

const portalRoutes: Record<Portal, string> = { admin:"/admin/dashboard", advisor:"/advisor/dashboard", employee:"/employee/home" };
const portalLabels: Record<Portal, string> = { admin:"Admin", advisor:"Commercialista", employee:"Dipendente" };

export function Topbar({ portal }: { portal: Portal }) {
  const pathname = usePathname();
  const current = navigationItemForRoute(pathname);
  const { openCommandBar } = useUniversalCommandBar();
  return (
    <header className="kairos-topbar sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b px-3 backdrop-blur-xl sm:px-4">
      <SidebarTrigger className="size-11 md:size-8" />
      <div className="mx-1 h-4 w-px bg-border" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium tracking-tight">{current?.label ?? portalLabels[portal]}</div>
        <div className="hidden truncate text-xs text-muted-foreground sm:block">{current?.description}</div>
      </div>
      <Button type="button" variant="ghost" size="icon" className="size-11 lg:hidden" onClick={() => openCommandBar("search")} aria-label="Apri Universal Command Bar"><Search className="size-4" /></Button>
      <Button type="button" variant="outline" className="kairos-command-launcher hidden h-8 w-56 justify-start gap-2 text-xs font-normal lg:flex" onClick={() => openCommandBar("search")} aria-label="Apri Universal Command Bar"><Search className="size-3.5" /> Ask KAIROS or search… <kbd className="ml-auto rounded border border-current/20 px-1.5 py-0.5 text-[10px]">⌘ K</kbd></Button>
      <div className="hidden items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/7 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-amber-700 dark:text-amber-300 sm:flex">{developmentExperienceConfig.environment.badge}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="hidden h-8 gap-1.5 px-2 text-xs md:flex"><Command className="size-3.5" /> {portalLabels[portal]} <ChevronsUpDown className="size-3" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52"><DropdownMenuLabel>Visualizza come · solo test</DropdownMenuLabel><DropdownMenuSeparator />{(Object.keys(portalRoutes) as Portal[]).map((item) => <DropdownMenuItem key={item} asChild><Link href={portalRoutes[item]}>{portalLabels[item]}{item === portal ? <span className="ml-auto">✓</span> : null}</Link></DropdownMenuItem>)}</DropdownMenuContent>
      </DropdownMenu>
      <ThemeSwitcher />
      <NotificationCenter portal={portal} />
      <div className="kairos-user-avatar hidden size-8 items-center justify-center rounded-full border text-xs font-semibold sm:flex">{developmentFixtureContext.users.admin.initials}</div>
    </header>
  );
}
