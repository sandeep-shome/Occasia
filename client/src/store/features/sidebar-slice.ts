import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SidebarProperty = {
  id: string;
  name: string;
};

export interface ISidebarState {
  speeches: SidebarProperty[];
}

const initialState: ISidebarState = {
  speeches: [],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<SidebarProperty[]>) => {
      state.speeches = state.speeches.concat(action.payload);
    },
  },
});

export const { setInitialState } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
