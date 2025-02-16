"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function ShopSwitcher({
  shops,
}: {
  shops: {
    name: string;
    logo: React.ElementType;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeShop, setActiveShop] = React.useState(shops[0] || null); // Set activeShop to null if no shops

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-colors duration-200"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeShop ? (
                  <activeShop.logo className="size-4" />
                ) : (
                  <div className="size-4 bg-gray-200 rounded-full" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeShop ? activeShop.name : "ไม่มีร้าน"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {shops.length > 0 ? (
              <>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  ร้าน
                </DropdownMenuLabel>
                {shops.map((shop, index) => (
                  <DropdownMenuItem
                    key={shop.name}
                    onClick={() => setActiveShop(shop)}
                    className="gap-2 p-2 hover:bg-gray-100 transition-colors duration-200"
                    role="menuitem"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <shop.logo className="size-4 shrink-0" />
                    </div>
                    {shop.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            ) : (
              <DropdownMenuItem className="p-2 text-muted-foreground">
                ไม่มีร้านให้เลือก
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="gap-2 p-2 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">เพิ่มร้านใหม่</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
