import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "./store"
// Type for our state
export interface AuthState {
    id: string,
  name: string,
  email: string
}

const initialState: AuthState = {
    id: '',
  name: '',
  email: ''
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.name && state.auth.email && state.auth.id ? {name: state.auth.name, email: state.auth.email, id: state.auth.id} : {name: '', email: '', id: ''}

export default authSlice.reducer;