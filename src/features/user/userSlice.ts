import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { AppThunk } from "../../app/store";
import { addUser, logUser } from "../../utils/dbOperations/dbOperations";
import { User } from "../../utils/dbOperations/interfaces";
import { localStorageKeys } from "../../utils/dbOperations/config";

interface UserSliceState {
  loggedInUser: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserSliceState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    setUser: create.reducer((state, action: PayloadAction<string>) => {
      state.loggedInUser = action.payload;
    }),
    addNewUser: create.asyncThunk(
      async ({ userId, user }: { userId: string; user: User }) => {
        const success = await addUser(userId, user);
        if (!success) {
          throw new Error("User already exists");
        }
        return userId;
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.loggedInUser = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to add user";
        },
      },
    ),
    loginUser: create.asyncThunk(
      async ({ userId, password }: { userId: string; password: string }) => {
        const success = await logUser(userId, password);
        if (!success) {
          throw new Error("User not found");
        }
        return userId;
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.loggedInUser = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || "Failed to log in";
        },
      },
    ),
    logoutUser: create.asyncThunk(
      async () => {
        return localStorage.removeItem(localStorageKeys.user);
      },
      {
        fulfilled: state => {
          state.loggedInUser = null;
          state.status = "idle";
          state.error = null;
        },
      },
    ),
  }),
  selectors: {
    selectLoggedInUser: state => state.loggedInUser,
    selectStatus: state => state.status,
    selectError: state => state.error,
  },
});

export const { addNewUser, loginUser, logoutUser, setUser } = userSlice.actions;

export const { selectLoggedInUser, selectStatus, selectError } =
  userSlice.selectors;

export default userSlice.reducer;
