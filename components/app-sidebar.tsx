"use client";

import { Calendar, Scissors, Settings, Store, User } from "lucide-react";
import type * as React from "react";

import { NavUser } from "@/components/nav-user";
import { ShopSwitcher } from "@/components/shop-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  shops: [],
  navMain: [
    {
      title: "แดชบอร์ด",
      url: "/app/dashboard",
      icon: Settings,
      isActive: true,
    },
    {
      title: "การนัดหมาย",
      url: "/app/appointments",
      icon: Calendar,
    },
    {
      title: "บริการ",
      url: "/app/services",
      icon: Scissors,
    },
    {
      title: "ช่างตัดผม",
      url: "/app/barbers",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const session = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ShopSwitcher shops={data.shops} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  asChild
                >
                  <Link href={item.url}>
                    <item.icon />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
