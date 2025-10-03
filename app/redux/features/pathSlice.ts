import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavItem } from "@/src/types/Types";
import HomeIcon from "@/src/shared/icons/HomeIcon";
import ListIcon from "@/src/shared/icons/ListIcon";
import UsesCasesIcon from "@/src/shared/icons/UsesCasesIcon";
import PowerBiIcon from "@/src/shared/icons/PowerBiIcon";

interface tabState {
  selectedTab: string;
}

export const navItems: NavItem[] = [
  { name: 'Home', href: '/inicio', icon: HomeIcon },
  { name: 'Tableros', href: '/inicio/tableros', icon: PowerBiIcon },
  { name: 'Listados', href: '/inicio/listados', icon: ListIcon },
  { name: 'Casos de uso', href: '/inicio/casos', icon: UsesCasesIcon },
];

const initialHref = typeof window !== 'undefined' ? window.location.pathname : '/inicio';

const initialState: tabState = {
  selectedTab: initialHref,
};

export const pathSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = pathSlice.actions;
export default pathSlice.reducer;
