import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-md md:px-6">
      <SidebarTrigger className="-ml-1 text-muted-foreground" />
      <Separator orientation="vertical" className="hidden h-5 md:block" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[15px] font-semibold tracking-tight md:text-base">{title}</h1>
        {subtitle && (
          <p className="hidden truncate text-xs text-muted-foreground md:block">{subtitle}</p>
        )}
      </div>
      <div className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products, orders, customers…"
          className="h-9 w-72 rounded-md border-border/70 bg-muted/40 pl-8 text-[13px] placeholder:text-muted-foreground/70 focus-visible:bg-background"
        />
      </div>
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
        <Bell className="h-[18px] w-[18px]" />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
      </Button>
      <Separator orientation="vertical" className="hidden h-7 sm:block" />
      <div className="flex items-center gap-2.5">
        <div className="hidden text-right sm:block">
          <p className="text-[13px] font-medium leading-tight">Ramesh Shah</p>
          <p className="text-[11px] text-muted-foreground">Store Owner</p>
        </div>
        <Avatar className="h-9 w-9 border">
          <AvatarImage src="https://i.pravatar.cc/100?img=12" />
          <AvatarFallback className="bg-muted text-[11px] font-semibold">RS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
