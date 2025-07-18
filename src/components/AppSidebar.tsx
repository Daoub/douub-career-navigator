
import { Home, Info, Package, Phone, Shield, FileText, LogIn, UserPlus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";

const navigationItems = [
  { title: "الرئيسية", url: "/", icon: Home },
  { title: "من نحن", url: "/about", icon: Info },
  { title: "خدماتنا", url: "/services", icon: Package },
  { title: "باقة الاشتراك", url: "/pricing", icon: Package },
  { title: "تواصل معنا", url: "/contact", icon: Phone },
  { title: "سياسة الخصوصية", url: "/privacy", icon: Shield },
  { title: "الشروط والأحكام", url: "/terms", icon: FileText },
  { title: "تسجيل دخول", url: "/login", icon: LogIn },
  { title: "سجل حسابك", url: "/signup", icon: UserPlus },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-l" side="right">
      <SidebarContent>
        <div className="p-4 border-b">
          <Logo size="md" />
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-right">القائمة الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className="flex items-center gap-3 text-right">
                      <span className="flex-1">{item.title}</span>
                      <item.icon className="h-4 w-4" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
