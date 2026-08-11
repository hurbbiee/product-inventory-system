import { AppSidebar } from "@/components/layouts/app-sidebar";
import { DashboardHeader } from "@/components/layouts/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CSSProperties } from "react";

export default function FullScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider
        defaultOpen
        style={
          {
            "--sidebar-width": "17rem",
            "--sidebar-width-icon": "4.5rem",
            "--sidebar-width-mobile": "18rem",
          } as CSSProperties
        }
      >
        <AppSidebar />

        <SidebarInset>
          <DashboardHeader />

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
