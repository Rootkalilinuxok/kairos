import { PortalShell } from "@/components/shell/portal-shell";
import { requireDevelopmentSession } from "@/core/auth/development-session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireDevelopmentSession("/admin/dashboard");
  return <PortalShell portal="admin">{children}</PortalShell>;
}
