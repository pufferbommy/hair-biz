"use client";

import { NavUser } from "@/components/nav-user";
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
import { useQuery } from "@tanstack/react-query";
import { Calendar, Scissors, Settings, User } from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "./session-provider";
import { ShopSwitcher } from "./shop-switcher";

const navMain = [
  {
    id: nanoid(),
    title: "แดชบอร์ด",
    url: "/app/dashboard",
    icon: Settings,
    isActive: true,
  },
  {
    id: nanoid(),
    title: "การจอง",
    url: "/app/bookings",
    icon: Calendar,
  },
  {
    id: nanoid(),
    title: "บริการ",
    url: "/app/services",
    icon: Scissors,
  },
  {
    id: nanoid(),
    title: "ช่างตัดผม",
    url: "/app/barbers",
    icon: User,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const session = useSession();

  const query = useQuery({
    queryKey: ["shops"],
    queryFn: async () => {
      const response = await fetch("/api/shops");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ShopSwitcher shops={query.data?.shops || []} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  asChild
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
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
