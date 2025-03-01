"use client";

import { ChevronsUpDown, Plus, Store } from "lucide-react";

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
import { useEffect, useState } from "react";

interface Shop {
  name: string;
  logo: React.ElementType;
}

export function ShopSwitcher({
  shops,
}: {
  shops: Shop[];
}) {
  const { isMobile } = useSidebar();
  console.log(shops);
  const [activeShop, setActiveShop] = useState<Shop | null>(null);

  useEffect(() => {
    setActiveShop(shops[0] || null);
  }, [shops]);

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
                <Store size={16} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeShop?.name}
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
                  <Store size={16} />
                </div>
                {shop.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
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
