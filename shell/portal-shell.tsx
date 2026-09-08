"use client";

import type { Portal } from "@/core/types/portal";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AccessProvider } from "@/components/gates/permission-gate";
import { AppSidebar } from "@/components/shell/app-sidebar";
import { Topbar } from "@/components/shell/topbar";
import { MobileNavigation } from "@/components/shell/mobile-navigation";
import { ContextCapsuleProvider } from "@/components/providers/context-capsule-provider";
import { UniversalCommandBarProvider } from "@/components/command-bar/universal-command-bar";

export function PortalShell({ portal, children }: { portal: Portal; children: React.ReactNode }) {
  return (
    <AccessProvider>
      <ContextCapsuleProvider portal={portal}>
        <UniversalCommandBarProvider portal={portal}>
          <SidebarProvider data-density={portal === "employee" ? "touch" : "compact"} defaultOpen={portal !== "employee"} style={{ "--sidebar-width": portal === "employee" ? "14.5rem" : "16rem" } as React.CSSProperties}>
            <AppSidebar portal={portal} />
            <SidebarInset className="kairos-surface-l0 kairos-app-canvas min-w-0 bg-canvas-subtle">
              <Topbar portal={portal} />
              <div className="min-h-0 flex-1 pb-[4.5rem] md:pb-0">{children}</div>
              <MobileNavigation portal={portal} />
            </SidebarInset>
          </SidebarProvider>
        </UniversalCommandBarProvider>
      </ContextCapsuleProvider>
    </AccessProvider>
  );
}
