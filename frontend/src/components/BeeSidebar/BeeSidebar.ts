import { ReactNode } from 'react';

export interface BeeSidebarItem {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  image?: string;
  children?: BeeSidebarItem[];
}

export interface BeeSidebarProps {
  userName: string;
  userRole?: string;
  userImage: string;
  items: BeeSidebarItem[];
}
