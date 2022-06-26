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
    email?: string;
    password?: string;
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
        const response = await serverService.signIn(credential);
        return response;
      
    }
);
export const signUp = createAsyncThunk(
    "user/signUp",
    async (credential: SignAction) => {
      const response = serverService.signUp(credential);
      return response;
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
            state.accessToken = action.payload.token;
            state.isAuthenticated = true;
            state.isAuthenticating = false;
            state.user = action.payload.user;
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