import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SidebarItem {
  id: string;
  title: string;
}
interface SidebarState {
  items: SidebarItem[];
}

const initialState: SidebarState = {
  items: [],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setInitialState: (
      state,
      action: PayloadAction<{ name: string; id: string }[]>
    ) => {
      let speechArray: SidebarItem[] = [];
      for (const speech of action.payload) {
        speechArray.push({
          id: speech.id,
          title: speech.name,
        });
      }
      state.items = speechArray;
    },
    addSidebarItem: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      state.items.unshift({
        title: action.payload.name,
        id: action.payload.id,
      });
    },
  },
});

export const { setInitialState, addSidebarItem } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
