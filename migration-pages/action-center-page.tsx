"use client";

import { useState } from "react";
import { CheckCircle2, Filter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageFrame } from "@/components/pages/page-frame";
import { ActionCenterCard } from "@/components/action-center/action-center-card";
import { fixtureActions } from "@/fixtures/development";
import type { Portal } from "@/core/types/portal";

export function ActionCenterPage({ portal }: { portal: Portal }) {
  const actions = fixtureActions.filter((action) => action.portal.includes(portal));
  const [resolved, setResolved] = useState<Set<string>>(new Set());
  return <PageFrame title={portal === "advisor" ? "Richieste e chiarimenti" : "Decisions"} description="Un’unica coda per approvazioni, discrepanze, richieste e scadenze. Le fixture non eseguono mutazioni."><Tabs defaultValue="all" className="gap-0 overflow-hidden border-y border-border/70 bg-background md:rounded-lg md:border"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-3 py-2"><TabsList variant="line" className="h-8"><TabsTrigger value="all">Aperte <span className="ml-1 text-xs text-muted-foreground">{actions.length-resolved.size}</span></TabsTrigger><TabsTrigger value="high">Priorità alta</TabsTrigger><TabsTrigger value="resolved">Risolte</TabsTrigger></TabsList><Button variant="outline" size="sm" className="h-8"><Filter className="size-3.5" /> Filtra</Button></div><TabsContent value="all" className="m-0"><div className="divide-y divide-border/60 px-4 md:px-5">{actions.filter((action) => !resolved.has(action.id)).map((action) => <div key={action.id} className="grid items-center gap-3 lg:grid-cols-[1fr_auto]"><ActionCenterCard action={action} onOpen={() => toast.info("Dettaglio azione fixture")} /><Button variant="outline" size="sm" className="mb-3 lg:mb-0" onClick={() => { setResolved((current) => new Set(current).add(action.id)); toast.success("Azione fixture segnata come risolta"); }}><CheckCircle2 className="size-3.5" /> Risolvi fixture</Button></div>)}</div></TabsContent><TabsContent value="high" className="m-0"><div className="px-5">{actions.filter((action) => action.priority === "Alta" && !resolved.has(action.id)).map((action) => <ActionCenterCard key={action.id} action={action} />)}</div></TabsContent><TabsContent value="resolved" className="m-0"><div className="min-h-64 px-5">{actions.filter((action) => resolved.has(action.id)).map((action) => <ActionCenterCard key={action.id} action={action} />)}{!resolved.size ? <div className="flex min-h-64 flex-col items-center justify-center text-center"><CheckCircle2 className="size-8 text-muted-foreground/50" /><p className="mt-3 text-sm font-medium">Nessuna azione fixture risolta</p><p className="mt-1 text-xs text-muted-foreground">Le risoluzioni reali saranno verificate dal motore di compliance.</p></div> : null}</div></TabsContent></Tabs></PageFrame>;
}
