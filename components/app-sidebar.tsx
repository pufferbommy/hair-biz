"use client";

import { Calendar, Scissors, Settings, User } from "lucide-react";
import type * as React from "react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "Barber Shop Owner",
    email: "owner@barbershop.com",
    avatar: "/avatars/barber.jpg",
  },
  teams: [
    {
      name: "Barber Team",
      logo: User,
      plan: "Professional",
    },
  ],
  navMain: [
    {
      title: "แดชบอร์ด",
      url: "/admin/dashboard",
      icon: Settings,
      isActive: true,
    },
    {
      title: "การนัดหมาย",
      url: "/admin/appointments",
      icon: Calendar,
    },
    {
      title: "บริการ",
      url: "/admin/services",
      icon: Scissors,
    },
    {
      title: "ช่างตัดผม",
      url: "/admin/barbers",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
