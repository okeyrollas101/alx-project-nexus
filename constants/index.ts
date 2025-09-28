
import { Home, LogOut, ShoppingCart, Truck, User } from "lucide-react";
import { ComponentType } from "react";

export interface navLinkProps{
  name:string;
  path:string;
  icon: ComponentType<any>
}

export const navLinks : navLinkProps[] = [
  { name: "Home", path: "/dashboard", icon: Home },
  { name: "Users", path: "/dashboard/users", icon: User },
  { name: "Products", path: "/dashboard/products", icon: Truck },
  { name: "Orders", path: "/dashboard/orders", icon: ShoppingCart },
  { name: "Logout", path: "/", icon: LogOut },
];

export const headerNavlinks = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];