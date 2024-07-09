import { getRatings, addRating } from '../../utils/dbOperations/dbOperations';
import { Ratings } from '../../utils/dbOperations/interfaces';
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { AppThunk } from "../../app/store";
import { getComments, addComment } from "../../utils/dbOperations/dbOperations";
import { Comments } from "../../utils/dbOperations/interfaces";
import { Rating } from '../../Interfaces/Movies/movie';

interface RatingsSliceState {
  ratings: Record<string, Ratings>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RatingsSliceState = {
  ratings: {},
  status: 'idle',
};

export const ratingSlice = createAppSlice({
  name: "ratings",
  initialState,
  reducers: create => ({
    fetchRatings: create.asyncThunk(
      async (movieId: string) => {
        const ratings = await getRatings(movieId);
        return { movieId, ratings };
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (
          state,
          action: PayloadAction<{ movieId: string; ratings: Ratings }>,
        ) => {
          state.status = "succeeded";
          state.ratings[action.payload.movieId] = action.payload.ratings;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    addNewRating: create.asyncThunk(
      async ({
        userId,
        movieId,
        rating,
      }: {
        userId: string;
        movieId: string;
        rating: number;
      }) => {
        await addRating(userId, movieId, rating);
        return { userId, movieId, rating };
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
            rating: number;
          }>,
        ) => {
          const { userId, movieId, rating } = action.payload;
          if (!state.ratings[movieId]) {
            state.ratings[movieId] = {};
          }
          if (!state.ratings[movieId][userId]) {
            state.ratings[movieId][userId] = rating;
          }
          state.ratings[movieId][userId]= rating;
          state.status = "succeeded";
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectRatings: state => state.ratings,
    selectStatus: state => state.status,
  },
});

export const { fetchRatings, addNewRating } = ratingSlice.actions;

export const { selectRatings, selectStatus } = ratingSlice.selectors;

export default ratingSlice.reducer;
