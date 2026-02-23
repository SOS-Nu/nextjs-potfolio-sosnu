import { LayoutConfig, LayoutState } from "@/types/LayoutState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetState } from "../actions/resetState";

interface InitalState {
  toast: {
    type: "error" | "info" | "success" | "warn";
    title: string;
    body: string;
    timelife?: number;
    show: boolean;
  };
  language: number;
  layoutState: LayoutState;
  layoutConfig: LayoutConfig;
  isTablet: boolean;
}

// State mặc định tĩnh (Clean State)
const initialState: InitalState = {
  toast: { body: "", show: false, title: "", type: "success", timelife: 3000 },

  language: 1, // Mặc định là 1 (hoặc Tiếng Việt)

  layoutState: {
    configSidebarVisible: false,
    profileSidebarVisible: false,
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  },

  layoutConfig: {
    // colorScheme: "light",
    // inputStyle: "outlined",
    // menuMode: "static",
    // ripple: true,
    theme: "dark",
    // scale: 12,
    // fontFamily: "openSans",
  },

  isTablet: typeof window === "undefined" ? false : window.innerWidth <= 1024,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowToast: (state, action) => {
      state.toast = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLayoutState: (state, action: PayloadAction<LayoutState>) => {
      state.layoutState = action.payload;
    },
    setLayoutConfig: (state, action: PayloadAction<LayoutConfig>) => {
      state.layoutConfig = action.payload;
    },
    setIsTablet: (state, action) => {
      state.isTablet = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export const {
  setShowToast,
  setLanguage,
  setLayoutState,
  setLayoutConfig,
  setIsTablet,
} = appSlice.actions;
export default appSlice.reducer;
