"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Factory,
  FileText,
  LayoutDashboard,
  PanelLeft,
  Settings,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/inventory", icon: Boxes, label: "Inventory" },
  { href: "/vendors", icon: Truck, label: "Vendors" },
  { href: "/production", icon: Factory, label: "Production" },
  { href: "/quality-control", icon: ShieldCheck, label: "Quality Control" },
  { href: "/ai-insights", icon: Sparkles, label: "AI Insights" },
  { href: "/compliance", icon: FileText, label: "Compliance" },
];

const pageTitles: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/inventory": "Inventory Management",
  "/vendors": "Vendor Tracking",
  "/production": "Production Monitoring",
  "/quality-control": "Quality Control",
  "/ai-insights": "AI Production Insights",
  "/compliance": "Compliance Vault",
};

function Logo() {
  return (
    <div className="flex items-center gap-2">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
      >
        <path d="M9 3v2.4L6.5 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.5l2.5 2.6V21" />
        <path d="M9 3h6v18H9" />
        <path d="M15 21v-2.6L17.5 16H20a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.5L15 5.4V3" />
      </svg>
      <h1 className="text-xl font-bold text-foreground">TextileFlow</h1>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <SidebarProvider>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="border-r"
        defaultOpen
      >
        <SidebarHeader className="h-16 p-4">
          <div className="group-data-[state=expanded]:block hidden">
            <Logo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-lg font-semibold">{currentPageTitle}</h2>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
