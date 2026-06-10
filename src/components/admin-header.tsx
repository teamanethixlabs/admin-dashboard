import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <SidebarTrigger className="-ml-1" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold md:text-lg">{title}</h1>
        {subtitle && (
          <p className="hidden truncate text-xs text-muted-foreground md:block">{subtitle}</p>
        )}
      </div>
      <div className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search…" className="h-9 w-64 pl-8" />
      </div>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
      </Button>
      <div className="flex items-center gap-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://i.pravatar.cc/100?img=12" />
          <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium leading-tight">Ramesh Shah</p>
          <p className="text-xs text-muted-foreground">Store Owner</p>
        </div>
      </div>
    </header>
  );
}
