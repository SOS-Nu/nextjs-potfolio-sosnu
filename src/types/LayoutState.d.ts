import { AppMenuItemType } from "./systems/MenuItemType";

export type LayoutState = {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
};

export interface AppConfigProps {
  simple?: boolean;
  isDesktop?: boolean;
  openConfig?: boolean;
  firstLoad?: boolean;
}

export type LayoutConfig = {
  theme: string;

  // ripple: boolean;
  // inputStyle: string;
  // menuMode: "static" | "overlay" | "horizontal";
  // colorScheme: string;
  // scale: number;
  // fontFamily: FontsType;
};

export interface AppTopbarRef {
  menubutton?: HTMLButtonElement | null;
  topbarmenu?: HTMLDivElement | null;
  topbarmenubutton?: HTMLButtonElement | null;
}

export interface AppMenuItemProps {
  favoritesUser?: string;
  item?: AppMenuItemType;
  parentKey?: string;
  index?: number;
  root?: boolean;
  className?: string;
  parentName?: string;
  onFavorite?: (favoriteList: string, idMenu: string) => void;
}

export interface MenuContextProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}
