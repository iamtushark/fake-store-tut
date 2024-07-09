import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { AppThunk } from "../../app/store";
import { getComments, addComment } from "../../utils/dbOperations/dbOperations";
import { Comments } from "../../utils/dbOperations/interfaces";

interface CommentsSliceState {
  comments: Record<string, Comments>;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CommentsSliceState = {
  comments: {},
  status: "idle",
};

export const commentsSlice = createAppSlice({
  name: "comments",
  initialState,
  reducers: create => ({
    fetchComments: create.asyncThunk(
      async (movieId: string) => {
        const comments = await getComments(movieId);
        return { movieId, comments };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{ movieId: string; comments: Comments }>,
        ) => {
          state.status = "succeeded";
          state.comments[action.payload.movieId] = action.payload.comments;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    addNewComment: create.asyncThunk(
      async ({
        userId,
        movieId,
        comment,
      }: {
        userId: string;
        movieId: string;
        comment: string;
      }) => {
        await addComment(userId, movieId, comment);
        return { userId, movieId, comment };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{
            userId: string;
            movieId: string;
            comment: string;
          }>,
        ) => {
          const { userId, movieId, comment } = action.payload;
          if (!state.comments[movieId]) {
            state.comments[movieId] = {};
          }
          if (!state.comments[movieId][userId]) {
            state.comments[movieId][userId] = [];
          }
          state.comments[movieId][userId].push(comment);
          state.status = "succeeded";
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectComments: state => state.comments,
    selectStatus: state => state.status,
  },
});

export const { fetchComments, addNewComment } = commentsSlice.actions;

export const { selectComments, selectStatus } = commentsSlice.selectors;

export default commentsSlice.reducer;
