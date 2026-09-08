"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, ChevronsUpDown, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { navigationForPortal, type IconKey, type NavigationItem } from "@/core/navigation/registry";
import type { NavigationGroupKey, NavigationSectionKey, Portal } from "@/core/types/portal";
import { dictionaries } from "@/core/i18n/dictionaries";
import { iconRegistry } from "@/components/shell/icon-registry";
import { PermissionGate, FeatureFlagGate } from "@/components/gates/permission-gate";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { developmentFixtureContext } from "@/fixtures/development";
import { cn } from "@/lib/utils";
import {
  initializeSidebarDisclosureState,
  KAIROS_SIDEBAR_SECTIONS_STORAGE_KEY,
  openSidebarDisclosureKeys,
  parseSidebarDisclosureState,
  sectionDisclosureKey,
  setSidebarDisclosureOpen,
  sidebarDisclosureKeysForRoute,
  subsectionDisclosureKey,
  type SidebarDisclosureState,
} from "@/core/navigation/sidebar-disclosure";

const portalLabels: Record<Portal, string> = { admin: "Admin Workspace", advisor: "Advisor Portal", employee: "Employee Workspace" };

const sectionIcons: Partial<Record<NavigationSectionKey, IconKey>> = {
  work: "briefcase",
  intelligence: "chart",
  control: "shield",
  automations: "workflow",
  settings: "settings",
};

function RouteItem({ item, pathname, nested = false }: { item: NavigationItem; pathname: string; nested?: boolean }) {
  const Icon = iconRegistry[item.icon];
  const active = pathname === item.route;
  const aiUtility = item.key === "admin.ai";
  const content = <Link href={item.route} aria-current={active ? "page" : undefined}><Icon className="size-4" /><span>{item.label}</span></Link>;

  return (
    <FeatureFlagGate moduleKey={item.module}>
      <PermissionGate permission={item.permission}>
        {nested ? (
          <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild isActive={active} size="sm" className="kairos-sidebar-route">{content}</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        ) : (
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={active} tooltip={item.label} className={cn("kairos-sidebar-route h-8 text-[13px]", aiUtility && "kairos-sidebar-ai-cta h-12")}>{content}</SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </PermissionGate>
    </FeatureFlagGate>
  );
}

function AdminNestedNavigation({ items, pathname }: { items: NavigationItem[]; pathname: string }) {
  const { isMobile, setOpen: setSidebarOpen, state: sidebarState } = useSidebar();
  const visibleItems = useMemo(() => items.filter((item) => item.placement !== "utility"), [items]);
  const sections = useMemo(() => Array.from(new Set(visibleItems.map((item) => item.section)))
      .map((section) => ({
        key: section,
        label: visibleItems.find((item) => item.section === section)!.sectionLabel,
        order: Math.min(...visibleItems.filter((item) => item.section === section).map((item) => item.sectionOrder)),
        items: visibleItems.filter((item) => item.section === section).sort((a, b) => a.order - b.order),
      }))
      .sort((a, b) => a.order - b.order),
    [visibleItems],
  );

  const utilityItems = useMemo(() => items.filter((item) => item.placement === "utility"), [items]);
  const disclosureDefaults = useMemo<SidebarDisclosureState>(() => {
    const defaults: Record<string, boolean> = {};

    for (const section of sections) {
      if (section.items.every((item) => item.placement === "primary")) continue;
      defaults[sectionDisclosureKey(section.key)] = section.items.some((item) => item.defaultExpanded);

      const subsectionKeys = Array.from(new Set(section.items.flatMap((item) => item.subsection ? [item.subsection] : [])));
      for (const subsection of subsectionKeys) {
        defaults[subsectionDisclosureKey(section.key, subsection)] = section.items
          .filter((item) => item.subsection === subsection)
          .some((item) => item.defaultExpanded);
      }
    }

    return defaults;
  }, [sections]);
  const activeDisclosureKeys = useMemo(() => sidebarDisclosureKeysForRoute(items, pathname), [items, pathname]);
  const [disclosureState, setDisclosureState] = useState<SidebarDisclosureState>(() =>
    initializeSidebarDisclosureState(disclosureDefaults, {}, activeDisclosureKeys),
  );
  const [persistenceReady, setPersistenceReady] = useState(false);
  const initialDefaults = useRef(disclosureDefaults);
  const initialActiveKeys = useRef(activeDisclosureKeys);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    let persistedState: SidebarDisclosureState = {};
    try {
      persistedState = parseSidebarDisclosureState(
        window.localStorage.getItem(KAIROS_SIDEBAR_SECTIONS_STORAGE_KEY),
      );
    } catch {
      // Persistence is optional; disclosure remains fully functional when storage is unavailable.
    }
    setDisclosureState(initializeSidebarDisclosureState(initialDefaults.current, persistedState, initialActiveKeys.current));
    setPersistenceReady(true);
  }, []);

  useEffect(() => {
    if (!persistenceReady || previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setDisclosureState((current) => openSidebarDisclosureKeys(current, activeDisclosureKeys));
  }, [activeDisclosureKeys, pathname, persistenceReady]);

  useEffect(() => {
    if (!persistenceReady) return;
    try {
      window.localStorage.setItem(KAIROS_SIDEBAR_SECTIONS_STORAGE_KEY, JSON.stringify(disclosureState));
    } catch {
      // Private browsing and strict storage policies must not block navigation.
    }
  }, [disclosureState, persistenceReady]);

  const setDisclosureOpen = useCallback((key: string, open: boolean) => {
    setDisclosureState((current) => setSidebarDisclosureOpen(current, key, open));
  }, []);

  const setSectionOpen = useCallback((key: string, open: boolean) => {
    if (!isMobile && sidebarState === "collapsed") {
      setSidebarOpen(true);
      setDisclosureOpen(key, true);
      return;
    }
    setDisclosureOpen(key, open);
  }, [isMobile, setDisclosureOpen, setSidebarOpen, sidebarState]);

  return (
    <>
      {sections.map((section) => {
        const primary = section.items.every((item) => item.placement === "primary");

        if (primary) {
          return (
            <SidebarGroup key={section.key} className="py-0.5">
              <SidebarGroupContent><SidebarMenu>{section.items.map((item) => <RouteItem key={item.key} item={item} pathname={pathname} />)}</SidebarMenu></SidebarGroupContent>
            </SidebarGroup>
          );
        }

        const SectionIcon = iconRegistry[sectionIcons[section.key] ?? section.items[0].icon];
        const directItems = section.items.filter((item) => !item.subsection);
        const subsectionKeys = Array.from(new Set(section.items.flatMap((item) => item.subsection ? [item.subsection] : [])));
        const subsectionGroups = subsectionKeys.map((subsection) => {
          const subsectionItems = section.items.filter((item) => item.subsection === subsection).sort((a, b) => a.order - b.order);
          return {
            key: subsection,
            label: subsectionItems[0].subsectionLabel ?? dictionaries.it.groups[subsection],
            order: subsectionItems[0].subsectionOrder ?? subsectionItems[0].order,
            items: subsectionItems,
          };
        }).sort((a, b) => a.order - b.order);
        const sectionEntries = [
          ...directItems.map((item) => ({ kind:"item" as const, order:item.order, item })),
          ...subsectionGroups.map((subsection) => ({ kind:"subsection" as const, order:subsection.items[0].order, subsection })),
        ].sort((a, b) => a.order - b.order);
        const sectionStateKey = sectionDisclosureKey(section.key);
        const sectionOpen = disclosureState[sectionStateKey] ?? false;
        const sectionContentId = `kairos-sidebar-section-${section.key}`;

        return (
          <SidebarGroup key={section.key} className="py-0.5">
            <Collapsible open={sectionOpen} onOpenChange={(open) => setSectionOpen(sectionStateKey, open)}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton type="button" tooltip={section.label} aria-expanded={sectionOpen} aria-controls={sectionContentId} className="h-8 text-[12px] font-semibold tracking-[0.08em]">
                      <SectionIcon className="size-4" />
                      <span>{section.label}</span>
                      <ChevronRight aria-hidden="true" className={cn("kairos-disclosure-chevron ml-auto size-3.5 motion-reduce:transition-none", sectionOpen && "rotate-90")} />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </SidebarMenu>
              <CollapsibleContent forceMount id={sectionContentId} aria-hidden={!sectionOpen} inert={!sectionOpen} className="kairos-disclosure-content group-data-[collapsible=icon]:hidden">
                <div className="kairos-disclosure-inner">
                  {sectionEntries.map((entry) => {
                    if (entry.kind === "item") return <SidebarMenuSub key={entry.item.key} className="py-0"><RouteItem item={entry.item} pathname={pathname} nested /></SidebarMenuSub>;
                    const subsection = entry.subsection;
                    const subsectionStateKey = subsectionDisclosureKey(section.key, subsection.key);
                    const subsectionOpen = disclosureState[subsectionStateKey] ?? false;
                    const subsectionContentId = `kairos-sidebar-subsection-${section.key}-${subsection.key}`;
                    return (
                      <Collapsible key={subsection.key} open={subsectionOpen} onOpenChange={(open) => setDisclosureOpen(subsectionStateKey, open)}>
                        <CollapsibleTrigger type="button" aria-expanded={subsectionOpen} aria-controls={subsectionContentId} className="mx-3.5 flex h-7 w-[calc(100%-1.75rem)] items-center gap-2 rounded-md px-2 text-xs font-medium text-sidebar-foreground/65 outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:hidden">
                          <ChevronRight aria-hidden="true" className={cn("kairos-disclosure-chevron size-3 motion-reduce:transition-none", subsectionOpen && "rotate-90")} />
                          <span>{subsection.label}</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent forceMount id={subsectionContentId} aria-hidden={!subsectionOpen} inert={!subsectionOpen} className="kairos-disclosure-content group-data-[collapsible=icon]:hidden">
                          <div className="kairos-disclosure-inner"><SidebarMenuSub>{subsection.items.map((item) => <RouteItem key={item.key} item={item} pathname={pathname} nested />)}</SidebarMenuSub></div>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        );
      })}
      {utilityItems.length ? (
        <SidebarGroup className="mt-auto border-t border-sidebar-border/70 pt-2">
          <SidebarGroupLabel className="h-6 px-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-sidebar-foreground/45">Global utility</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{utilityItems.map((item) => <RouteItem key={item.key} item={item} pathname={pathname} />)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
      ) : null}
    </>
  );
}

function PortalGroupedNavigation({ items, pathname }: { items: NavigationItem[]; pathname: string }) {
  const groups = Array.from(new Set(items.map((item) => item.group)));
  return <>{groups.map((group) => (
    <SidebarGroup key={group} className="py-1">
      <SidebarGroupLabel className="h-6 px-2 text-xs font-semibold uppercase tracking-[0.13em] text-sidebar-foreground/45">{dictionaries.it.groups[group as NavigationGroupKey]}</SidebarGroupLabel>
      <SidebarGroupContent><SidebarMenu>{items.filter((item) => item.group === group).map((item) => <RouteItem key={item.key} item={item} pathname={pathname} />)}</SidebarMenu></SidebarGroupContent>
    </SidebarGroup>
  ))}</>;
}

export function AppSidebar({ portal }: { portal: Portal }) {
  const pathname = usePathname();
  const items = useMemo(() => navigationForPortal(portal), [portal]);

  return (
    <Sidebar collapsible="icon" className="kairos-app-sidebar border-r border-sidebar-border/80">
      <SidebarHeader className="kairos-sidebar-header border-b border-sidebar-border/70 p-3 group-data-[collapsible=icon]:p-2">
        <div className="flex h-10 items-center gap-3 overflow-hidden px-1">
          <div className="brand-mark shrink-0"><span /></div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden"><div className="truncate text-sm font-semibold tracking-tight">KAIROS</div><div className="truncate text-xs text-sidebar-foreground/55">{portalLabels[portal]}</div></div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto w-full justify-start gap-2 rounded-md px-2 py-2 text-left group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-sidebar-accent text-xs font-bold">{developmentFixtureContext.tenant.initials}</div>
              <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden"><div className="truncate text-xs font-medium">{developmentFixtureContext.tenant.name}</div><div className="truncate text-xs text-sidebar-foreground/55">{developmentFixtureContext.tenant.label}</div></div>
              <ChevronsUpDown className="size-3.5 group-data-[collapsible=icon]:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64"><DropdownMenuLabel>Contesto organizzazione</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem disabled>{developmentFixtureContext.tenant.name} <span className="ml-auto text-xs">Fixture</span></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem disabled>Lo switch multi-tenant sarà collegato in una fase successiva</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent className="kairos-sidebar-content scrollbar-thin py-2">
        {portal === "admin" ? <AdminNestedNavigation items={items} pathname={pathname} /> : <PortalGroupedNavigation items={items} pathname={pathname} />}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/70 p-2">
        <div className="flex items-center gap-2 rounded-md px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand"><ShieldCheck className="size-3.5" /></div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden"><div className="truncate text-xs font-medium">{developmentFixtureContext.users.admin.username} · {developmentFixtureContext.users.admin.role}</div><div className="truncate text-xs text-amber-600 dark:text-amber-300">{developmentFixtureContext.users.admin.access}</div></div>
          <form action="/api/dev-auth/logout" method="post" className="group-data-[collapsible=icon]:hidden"><Button type="submit" variant="ghost" size="icon" className="size-7" aria-label="Esci"><LogOut className="size-3.5" /></Button></form>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
