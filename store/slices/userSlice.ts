import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "@/models/user.model";
import { RootState } from "@/store/store";
import * as serverService from "@/services/serverService";

interface UserState {
    username: string;
    accessToken: string;
    error?: string;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    user?: UserData;
}
interface SingleProp {
    data: string;
}
interface SignAction {
    username: string;
    email: string;
    password: string;
}

const initialState: UserState = {
    username: "",
    accessToken: "",
    isAuthenticated: false,
    isAuthenticating: true,
    user: undefined,
};

export const signIn = createAsyncThunk(
    "user/signIn",
    async (credential: SignAction) => {
      const p1 = new Promise((res) => setTimeout(() => res({singIn: "success"}),1000));
      return await p1;
    }
);
export const signUp = createAsyncThunk(
    "user/signUp",
    async (credential: SignAction) => {
      const response = serverService.signUp(credential);
      return response.data;
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        resetUsername: (state, action: PayloadAction<SingleProp>) => {
            state.username = action.payload.data;
          },
    },
    extraReducers: builder => {
        builder
        .addCase(signIn.pending, (state, action) => {
            state.isAuthenticating = true;
        })
        .addCase(signIn.fulfilled, (state, action: any) => {
            state.username = action.payload.result;
            state.isAuthenticating = false;
            state.isAuthenticated = true;
        })
        .addCase(signIn.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = action.error.message;
        })
        .addCase(signUp.pending, (state, action) => {
            state.isAuthenticating = true;
        })
        .addCase(signUp.fulfilled, (state, action: any) => {
            state.accessToken = "";
            state.user = undefined;
            state.isAuthenticated = false;
        })
        .addCase(signUp.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = action.error.message;
        });
    }
});

export const { resetUsername } = userSlice.actions;

// export common user selector
export const userSelector = (store: RootState) => store.user;
export const isAuthenticatedSelector = (store: RootState): boolean =>
  store.user.isAuthenticated;
export const isAuthenticatingSelector = (store: RootState): boolean =>
  store.user.isAuthenticating;


export default userSlice.reducer;