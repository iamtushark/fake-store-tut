import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { AppThunk } from "../../app/store";
import {
  getLikes,
  addLike,
  removeLike,
} from "../../utils/dbOperations/dbOperations";
import { Likes } from "../../utils/dbOperations/interfaces";

interface LikesSliceState {
  likes: Record<string, Likes>;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: LikesSliceState = {
  likes: {},
  status: "idle",
};

export const likesSlice = createAppSlice({
  name: "likes",
  initialState,
  reducers: create => ({
    fetchLikes: create.asyncThunk(
      async (userId: string) => {
        const likes = await getLikes(userId);
        return { userId, likes };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{ userId: string; likes: Likes }>,
        ) => {
          state.status = "succeeded";
          state.likes[action.payload.userId] = action.payload.likes;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    addNewLike: create.asyncThunk(
      async ({ userId, movieId }: { userId: string; movieId: string }) => {
        await addLike(userId, movieId);
        return { userId, movieId };
      },
      {
        fulfilled: (
          state,
          action: PayloadAction<{ userId: string; movieId: string }>,
        ) => {
          const { userId, movieId } = action.payload;
          if (!state.likes[userId]) {
            state.likes[userId] = new Set<string>();
          }
          state.likes[userId].add(movieId);
        },
      },
    ),
    removeExistingLike: create.asyncThunk(
      async ({ userId, movieId }: { userId: string; movieId: string }) => {
        await removeLike(userId, movieId);
        return { userId, movieId };
      },
      {
        fulfilled: (
          state,
          action: PayloadAction<{ userId: string; movieId: string }>,
        ) => {
          const { userId, movieId } = action.payload;
          if (state.likes[userId]) {
            state.likes[userId].delete(movieId);
            if (state.likes[userId].size === 0) {
              delete state.likes[userId];
            }
          }
        },
      },
    ),
  }),
  selectors: {
    selectLikes: state => state.likes,
    selectStatus: state => state.status,
  },
});

export const { fetchLikes, addNewLike, removeExistingLike } =
  likesSlice.actions;

export const { selectLikes, selectStatus } = likesSlice.selectors;

export default likesSlice.reducer;
