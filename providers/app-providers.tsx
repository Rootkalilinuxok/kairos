"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { UniversalFileViewerProvider } from "@/components/file-viewer/universal-file-viewer";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider delayDuration={250}>
        <UniversalFileViewerProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </UniversalFileViewerProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
