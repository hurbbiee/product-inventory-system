"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Boxes,
  ChevronRight,
  LayoutDashboard,
  Package,
  Plug,
  Settings,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useUserStorage } from "@/hooks/use-user-storage";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

/* -------------------------------------------------------------------------- */
/* Menu                                                                       */
/* -------------------------------------------------------------------------- */

const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Inventory",
    items: [
      {
        title: "Products",
        href: "/products",
        icon: Package,
      },
      {
        title: "Stock Activity",
        href: "/stock",
        icon: Boxes,
      },
    ],
  },
];

const settingMenus: NavItem[] = [
  {
    title: "Users & Roles",
    href: "/settings/users",
    icon: Users,
  },
  {
    title: "Integrations",
    href: "/settings/integrations",
    icon: Plug,
  },
  {
    title: "Automation",
    href: "/settings/automation",
    icon: SlidersHorizontal,
  },
];

/* -------------------------------------------------------------------------- */
/* Style                                                                      */
/* -------------------------------------------------------------------------- */

const sidebarStyle = {
  "--sidebar": "#0f172a",
  "--sidebar-foreground": "#f8fafc",
  "--sidebar-accent": "#1e293b",
  "--sidebar-accent-foreground": "#ffffff",
  "--sidebar-border": "#1e293b",

  "--sidebar-width": "16.5rem",
  "--sidebar-width-icon": "4.5rem",
} as CSSProperties;

const menuButtonClass =
  "h-10 rounded-lg px-3 text-slate-400 " +
  "hover:bg-white/5 hover:text-white " +
  "data-[active=true]:bg-white/10 " +
  "data-[active=true]:font-medium " +
  "data-[active=true]:text-white";

/* -------------------------------------------------------------------------- */
/* Utils                                                                      */
/* -------------------------------------------------------------------------- */

function isRouteActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/* -------------------------------------------------------------------------- */
/* Nav Item                                                                   */
/* -------------------------------------------------------------------------- */

interface AppNavItemProps {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
  onNavigate: () => void;
}

function AppNavItem({
  item,
  pathname,
  collapsed,
  onNavigate,
}: AppNavItemProps) {
  const active = isRouteActive(pathname, item.href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={item.href} onClick={onNavigate} />}
        isActive={active}
        tooltip={item.title}
        className={cn(
          menuButtonClass,
          collapsed && "mx-auto size-11 justify-center p-0",
        )}
      >
        <item.icon className="size-5 shrink-0" />

        {!collapsed && <span className="truncate">{item.title}</span>}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

export function AppSidebar() {
  const pathname = usePathname();

  const { state, setOpen, isMobile, setOpenMobile } = useSidebar();

  const isCollapsed = state === "collapsed";
  const isSettingsActive = pathname.startsWith("/settings");

  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);

  /* ------------------------------------------------------------------------ */
  /* user                                                                     */
  /* ------------------------------------------------------------------------ */
  const user = useUserStorage();
  /* ------------------------------------------------------------------------ */
  /* Settings state                                                           */
  /* ------------------------------------------------------------------------ */

  const showSettingsMenu = !isCollapsed && (settingsOpen || isSettingsActive);
  /* ------------------------------------------------------------------------ */
  /* Navigation                                                               */
  /* ------------------------------------------------------------------------ */

  const handleNavigate = () => {
    if (isMobile) {
      setOpenMobile(false);
      return;
    }

    if (isCollapsed) {
      setOpen(true);
    }
  };

  const handleSettingsOpenChange = (open: boolean) => {
    if (open && isCollapsed && !isMobile) {
      setOpen(true);
    }

    setSettingsOpen(open);
  };

  const handleSettingsClick = () => {
    if (isMobile) {
      return;
    }

    if (isCollapsed) {
      setOpen(true);
      setSettingsOpen(true);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* user display                                                             */
  /* ------------------------------------------------------------------------ */

  const userName = user?.name ?? "Name";

  const userRole = user?.role ?? "Role";

  const userInitial = userName.trim().charAt(0).toUpperCase() || "N";
  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      style={sidebarStyle}
      className="border-r border-sidebar-border"
    >
      {/* -------------------------------------------------------------------- */}
      {/* Brand                                                                */}
      {/* -------------------------------------------------------------------- */}

      <SidebarHeader
        className={cn(
          "border-b border-sidebar-border",
          isCollapsed ? "p-2.5" : "p-3",
        )}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/dashboard" onClick={handleNavigate} />}
              tooltip="StockFlow"
              className={cn(
                "h-12 rounded-xl hover:bg-white/5",
                isCollapsed ? "mx-auto size-11 justify-center p-0" : "px-2",
              )}
            >
              <div
                className="
                  flex
                  size-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-600
                  text-white
                "
              >
                <Boxes className="size-5" />
              </div>

              {!isCollapsed && (
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold text-white">
                    StockFlow
                  </span>

                  <span className="truncate text-xs text-slate-500">
                    Inventory System
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* -------------------------------------------------------------------- */}
      {/* Menu                                                                 */}
      {/* -------------------------------------------------------------------- */}

      <SidebarContent className="px-2 py-3">
        {navSections.map((section) => (
          <SidebarGroup key={section.label} className="px-1 py-2">
            {!isCollapsed && (
              <SidebarGroupLabel
                className="
                  mb-1
                  px-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-slate-600
                "
              >
                {section.label}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {section.items.map((item) => (
                  <AppNavItem
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    collapsed={isCollapsed}
                    onNavigate={handleNavigate}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* ------------------------------------------------------------------ */}
        {/* Settings                                                           */}
        {/* ------------------------------------------------------------------ */}

        <SidebarGroup className="px-1 py-2">
          {!isCollapsed && (
            <SidebarGroupLabel
              className="
                mb-1
                px-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-600
              "
            >
              System
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Collapsible
                  open={showSettingsMenu}
                  onOpenChange={handleSettingsOpenChange}
                >
                  <CollapsibleTrigger
                    onClick={handleSettingsClick}
                    render={
                      <SidebarMenuButton
                        tooltip="Settings"
                        isActive={isSettingsActive}
                        className={cn(
                          menuButtonClass,
                          isCollapsed && "mx-auto size-11 justify-center p-0",
                        )}
                      />
                    }
                  >
                    <Settings className="size-5 shrink-0" />

                    {!isCollapsed && (
                      <>
                        <span>Settings</span>

                        <ChevronRight
                          className={cn(
                            "ml-auto size-4 transition-transform",
                            settingsOpen && "rotate-90",
                          )}
                        />
                      </>
                    )}
                  </CollapsibleTrigger>

                  {!isCollapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub
                        className="
                          mx-3
                          mt-1
                          gap-1
                          border-white/10
                        "
                      >
                        {settingMenus.map((item) => {
                          const active = isRouteActive(pathname, item.href);

                          return (
                            <SidebarMenuSubItem key={item.href}>
                              <SidebarMenuSubButton
                                render={
                                  <Link
                                    href={item.href}
                                    onClick={handleNavigate}
                                  />
                                }
                                isActive={active}
                                className="
                                  rounded-lg
                                  text-slate-500
                                  hover:bg-white/5
                                  hover:text-white

                                  data-[active=true]:bg-white/5
                                  data-[active=true]:text-white
                                "
                              >
                                <item.icon className="size-4 shrink-0" />

                                <span>{item.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* -------------------------------------------------------------------- */}
      {/* Organization                                                         */}
      {/* -------------------------------------------------------------------- */}

      <SidebarFooter
        className={cn(
          "border-t border-sidebar-border",
          isCollapsed ? "p-2.5" : "p-3",
        )}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={userName}
              onClick={() => {
                if (isCollapsed) {
                  setOpen(true);
                }
              }}
              className={cn(
                "h-12 rounded-xl hover:bg-white/5",
                isCollapsed ? "mx-auto size-11 justify-center p-0" : "px-2",
              )}
            >
              <div
                className="
                  flex
                  size-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-violet-400/30
                  bg-violet-500/10
                  text-sm
                  font-semibold
                  text-violet-300
                "
              >
                {userInitial}
              </div>

              {!isCollapsed && (
                <div className="grid min-w-0 flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-medium text-white">
                    {userName}
                  </span>

                  <span className="truncate text-xs text-slate-500">
                    {userRole}
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
