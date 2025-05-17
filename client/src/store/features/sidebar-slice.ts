import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SidebarItem {
  id: string;
  title: string;
  url: string;
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
          url: `/dashboard/arena/${speech.id}`,
        });
      }
      state.items = speechArray;
    },
  },
});

export const { setInitialState } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
