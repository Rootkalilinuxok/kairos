"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationItemForRoute } from "@/core/navigation/registry";
import type { Portal } from "@/core/types/portal";
import {
  emptyPageContext,
  type ContextCapsule,
  type MutablePageContext,
} from "@/core/context/context-capsule";
import { developmentFixtureContext } from "@/fixtures/development";

interface ContextCapsuleValue {
  capsule: ContextCapsule;
  updatePageContext: (patch: Partial<MutablePageContext>) => void;
  resetPageContext: () => void;
}

const ContextCapsuleContext = createContext<ContextCapsuleValue | null>(null);

export function ContextCapsuleProvider({ portal, children }: { portal: Portal; children: React.ReactNode }) {
  const route = usePathname();
  const currentNavigationItem = navigationItemForRoute(route);
  const [pageState, setPageState] = useState<{ route: string; value: MutablePageContext }>({ route, value: emptyPageContext });
  const pageContext = pageState.route === route ? pageState.value : emptyPageContext;

  const updatePageContext = useCallback((patch: Partial<MutablePageContext>) => {
    setPageState((current) => ({ route, value: { ...(current.route === route ? current.value : emptyPageContext), ...patch } }));
  }, [route]);
  const resetPageContext = useCallback(() => setPageState({ route, value: emptyPageContext }), [route]);

  const capsule = useMemo<ContextCapsule>(() => ({
    contractVersion: "1.0",
    user: {
      id: `dev-user-${developmentFixtureContext.users.admin.username}`,
      username: developmentFixtureContext.users.admin.username,
      displayName: developmentFixtureContext.users.admin.displayName,
      roles: [developmentFixtureContext.users.admin.role],
    },
    organization: {
      id: developmentFixtureContext.tenant.id,
      name: developmentFixtureContext.tenant.name,
      locale: developmentFixtureContext.tenant.locale,
      currency: developmentFixtureContext.tenant.currency,
    },
    portal,
    route,
    currentPage: currentNavigationItem ? {
      key: currentNavigationItem.key,
      label: currentNavigationItem.breadcrumbLabel,
      description: currentNavigationItem.description,
      module: currentNavigationItem.module,
    } : null,
    ...pageContext,
    permissions: "all",
  }), [currentNavigationItem, pageContext, portal, route]);

  const value = useMemo(() => ({ capsule, updatePageContext, resetPageContext }), [capsule, resetPageContext, updatePageContext]);
  return <ContextCapsuleContext.Provider value={value}>{children}</ContextCapsuleContext.Provider>;
}

export function useContextCapsule() {
  const context = useContext(ContextCapsuleContext);
  if (!context) throw new Error("useContextCapsule must be used inside ContextCapsuleProvider");
  return context;
}
