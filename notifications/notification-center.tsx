"use client";

import { Bell, CheckCheck, Clock3, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { fixtureNotifications } from "@/fixtures/development";
import type { Portal } from "@/core/types/portal";
import { useUniversalFileViewer } from "@/components/file-viewer/universal-file-viewer";
import { cn } from "@/lib/utils";

export function NotificationCenter({ portal }: { portal: Portal }) {
  const initial = fixtureNotifications.filter((notification) => notification.portals.includes(portal));
  const [read, setRead] = useState(() => new Set(initial.filter((item) => !item.unread).map((item) => item.id)));
  const { openFile } = useUniversalFileViewer();
  const unread = initial.filter((item) => !read.has(item.id)).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-11 md:size-9" aria-label={`Notifiche${unread ? `, ${unread} non lette` : ""}`}>
          <Bell className="size-4" />
          {unread ? <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-accent-brand ring-2 ring-background" /> : null}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/70 px-5 py-5 text-left">
          <div className="flex items-start justify-between gap-4 pr-8">
            <div><SheetTitle>Notifiche</SheetTitle><SheetDescription className="mt-1">Aggiornamenti filtrati per ruolo e risorsa.</SheetDescription></div>
            <Button variant="ghost" size="sm" onClick={() => setRead(new Set(initial.map((item) => item.id)))}><CheckCheck className="size-4" /> Segna lette</Button>
          </div>
        </SheetHeader>
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-3 text-xs text-muted-foreground">
          <span>{unread} non lette</span><Badge variant="outline" className="font-normal">DEV · Fixture</Badge>
        </div>
        <div className="overflow-y-auto">
          {initial.map((notification) => {
            const isRead = read.has(notification.id);
            return (
              <button key={notification.id} type="button" className={cn("relative w-full border-b border-border/60 px-5 py-4 text-left transition-colors hover:bg-muted/50", !isRead && "bg-accent-brand/[0.035]")} onClick={() => { setRead((current) => new Set(current).add(notification.id)); if (notification.file) openFile(notification.file); }}>
                {!isRead ? <span className="absolute left-2 top-6 size-1.5 rounded-full bg-accent-brand" /> : null}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0"><p className="text-sm font-medium">{notification.title}</p><p className="mt-1 text-sm leading-5 text-muted-foreground">{notification.body}</p></div>
                  {notification.file ? <FileText className="mt-0.5 size-4 shrink-0 text-accent-brand" /> : null}
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground"><span>{notification.category}</span><span className="flex items-center gap-1"><Clock3 className="size-3" />{notification.time}</span></div>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
