"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUserStorage } from "@/hooks/use-user-storage";

interface PageInfo {
  title: string;
  description: string;
}

function getPageInfo(pathname: string): PageInfo {
  if (pathname.startsWith("/products")) {
    return {
      title: "Products",
      description: "จัดการรายการสินค้าในคลัง",
    };
  }

  if (pathname.startsWith("/stock")) {
    return {
      title: "Stock Activity",
      description: "ตรวจสอบการเพิ่มและลดสินค้า",
    };
  }

  if (pathname.startsWith("/settings/users")) {
    return {
      title: "Users & Roles",
      description: "จัดการผู้ใช้งานและสิทธิ์การเข้าถึง",
    };
  }

  if (pathname.startsWith("/settings/integrations")) {
    return {
      title: "Integrations",
      description: "จัดการการเชื่อมต่อกับระบบภายนอก",
    };
  }

  if (pathname.startsWith("/settings/automation")) {
    return {
      title: "Automation",
      description: "ตั้งค่าการทำงานอัตโนมัติ",
    };
  }

  if (pathname.startsWith("/settings")) {
    return {
      title: "Settings",
      description: "ตั้งค่าระบบ",
    };
  }

  return {
    title: "Dashboard",
    description: "ภาพรวมคลังสินค้าของคุณ",
  };
}

export function DashboardHeader() {
  const pathname = usePathname();

  const pageInfo = getPageInfo(pathname);

  const user = useUserStorage();
  const userName = user?.name || "N";
  const userInitial = userName.trim().charAt(0).toUpperCase() || "N";
  return (
    <header
      className="
        sticky top-0 z-40
        flex h-16
        items-center justify-between
        border-b
        bg-background/95
        px-4
        backdrop-blur
        md:px-6
      "
    >
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger
          className="
            size-9
            shrink-0
            rounded-lg
            border
            bg-background
            text-muted-foreground
            shadow-xs
            hover:bg-muted
            hover:text-foreground
          "
        />

        <div className="hidden h-5 w-px bg-border sm:block" />

        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold md:text-base">
            {pageInfo.title}
          </h1>

          <p className="hidden truncate text-xs text-muted-foreground md:block">
            {pageInfo.description}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          className="
            hidden
            size-9
            rounded-lg
            text-muted-foreground
            hover:text-foreground
            sm:inline-flex
          "
        >
          <Search className="size-4.5" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="
            relative
            size-9
            rounded-lg
            text-muted-foreground
            hover:text-foreground
          "
        >
          <Bell className="size-4.5" />

          <span
            className="
              absolute
              right-2
              top-2
              size-1.5
              rounded-full
              bg-red-500
              ring-2
              ring-background
            "
          />

          <span className="sr-only">Notifications</span>
        </Button>

        {/* Separator */}
        <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

        {/* Profile */}
        <Button
          variant="ghost"
          className="
            size-9
            rounded-full
            bg-muted
            p-0
            hover:bg-muted/80
          "
        >
          <p className="text-lg">{userInitial}</p>

          <span className="sr-only">User profile</span>
        </Button>
      </div>
    </header>
  );
}
