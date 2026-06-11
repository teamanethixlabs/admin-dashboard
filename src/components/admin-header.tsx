import { Bell, Search, Calendar, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
      <Separator orientation="vertical" className="hidden h-5 md:block" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-base font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <>
              <span className="hidden text-muted-foreground/40 md:inline">•</span>
              <p className="hidden truncate text-[13px] text-muted-foreground md:block">{subtitle}</p>
            </>
          )}
        </div>
      </div>

      {/* Date display */}
      <div className="hidden items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 lg:flex">
        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[12px] font-medium text-muted-foreground">{dateStr}</span>
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <Input
          placeholder="Search anything…"
          className="h-9 w-64 rounded-lg border-border/50 bg-muted/40 pl-9 text-[13px] placeholder:text-muted-foreground/50 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/30 transition-all"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border/50 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/50">
          ⌘K
        </kbd>
      </div>

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all">
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
        <span className="absolute right-2 top-2 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
        </span>
      </Button>

      <Separator orientation="vertical" className="hidden h-7 sm:block" />

      {/* User profile */}
      <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/60">
        <div className="hidden text-right sm:block">
          <p className="text-[13px] font-semibold leading-tight">Ramesh Shah</p>
          <p className="text-[11px] text-muted-foreground">Store Owner</p>
        </div>
        <Avatar className="h-9 w-9 border-2 border-primary/20 ring-2 ring-background">
          <AvatarImage src="https://i.pravatar.cc/100?img=12" />
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-[11px] font-bold text-white">RS</AvatarFallback>
        </Avatar>
        <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
      </button>
    </header>
  );
}
