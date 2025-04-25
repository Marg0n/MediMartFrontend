"use client";

import { Bot, Frame, PieChart, Send, Settings, SquareTerminal } from "lucide-react";
import * as React from "react";

import Logo from "@/assets/images/logo/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  adminNavItem: [
    {
      title: "Dashboard",
      url: "/customer/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Shop",
      url: "/customer/shop/products",
      icon: Bot,
      items: [
        {
          title: "Manage Products",
          url: "/customer/shop/products",
        },
        {
          title: "Manage Categories",
          url: "/customer/shop/category",
        },
        {
          title: "Manage Brands",
          url: "/customer/shop/brand",
        },
        {
          title: "Manage Coupon",
          url: "/customer/shop/manage-coupon",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      // items: [
      //   {
      //     title: "Profile",
      //     url: "/profile",
      //   },
      // ],
    },
  ],
  // customer nav items
  //Akbar Shanto vai ekhane customer er jonne nav items add korben
  customerNavItem: [
    {
      title: "Dashboard",
      url: "/customer",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Your Order",
      url: "/customer/orderManagement",
      icon: Bot,
      // items: [
      //   {
      //     title: "Manage Products",
      //     url: "/orderManagement",
      //   },
    
      // ],
    },
    //ekhane change kora lagbe na eta common rekhechi
    {
      title: "Settings",
      url: "/customer/setting",
      icon: Settings,
      // items: [
      //   {
      //     title: "Profile",
      //     url: "/profile",
      //   },
      // ],
    },
  ],
  navSecondary: [
    {
      title: "Dashboard",
      url: "/customer",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useUser();
  console.log("user", user);
  if (isLoading) {
    return <div className="">Loading...</div>;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {user?.role === "admin" ? (
                <Link href="/admin">
                  <div className="flex items-center justify-center">
                    <Logo />
                  </div>
                  {/* <div className="grid flex-1 text-left text-sm leading-tight">
   <h2 className="font-bold text-xl">MediMart</h2>
 </div> */}
                </Link>
              ) : (
                <Link href="/customer">
                  <div className="flex items-center justify-center">
                    <Logo />
                  </div>
                  {/* <div className="grid flex-1 text-left text-sm leading-tight">
   <h2 className="font-bold text-xl">MediMart</h2>
 </div> */}
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {
          <NavMain
            items={
              user?.role === "admin" ? data.adminNavItem : data.customerNavItem
            }
          />
        }
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
