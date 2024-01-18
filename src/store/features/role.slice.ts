import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Role } from "@/types/role";

export interface RoleState {
  roleList: Role[] | null;
}

const initialState: RoleState = {
  roleList: null,
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoleListAction: (state, action: PayloadAction<Role[]>) => {
      state.roleList = action.payload;
    },
  },
});

export const { setRoleListAction } = roleSlice.actions;

export const roleReducer = roleSlice.reducer;
