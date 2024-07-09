// dbOperations.ts
import localforage from 'localforage';
import {
  DBLikes,
  DBComments,
  DBUsers,
  Likes,
  Comments,
  User,
  DBRatings,
  Ratings,
} from './interfaces';
import { DBKeys, localStorageKeys } from './config';

localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'movies-explorer',
  version: 1.0,
  storeName: 'movies',
  description: 'a data store for movies',
});

const INITIAL_USERS: DBUsers = {};
const INITIAL_LIKES: DBLikes = {};
const INITIAL_COMMENTS: DBComments = {};
const INITIAL_RATINGS: DBRatings = {};

export const getLikes = async (userId: string): Promise<Likes> => {
  let likes = await localforage.getItem<DBLikes>(DBKeys.likes);

  if (!likes) {
    await localforage.setItem(DBKeys.likes, INITIAL_LIKES);
    likes = INITIAL_LIKES;
  }

  return likes[userId];
};

export const getComments = async (movieID: string): Promise<Comments> => {
  let comments = await localforage.getItem<DBComments>(DBKeys.comments);

  if (!comments) {
    await localforage.setItem(DBKeys.comments, INITIAL_COMMENTS);
    comments = INITIAL_COMMENTS;
  }

  return comments[movieID];
};

export const addUser = async (
  userId: string,
  userData: User,
): Promise<boolean> => {
  let users = await localforage.getItem<DBUsers>(DBKeys.users);

  if (!users) {
    await localforage.setItem(DBKeys.users, INITIAL_USERS);
    users = INITIAL_USERS;
  }

  if (users[userId]) {
    return false;
  }

  users[userId] = userData;
  await localforage.setItem(DBKeys.users, users);
  return true;
};

export const logUser = async (
  userId: string,
  password: string,
): Promise<boolean> => {
  const users = await localforage.getItem<DBUsers>(DBKeys.users);

  if (users && users[userId]) {
    const user = users[userId];
    if (user.password === password) {
      localStorage.setItem(localStorageKeys.user, userId);
      return true;
    }
  }

  return false;
};

export const addComment = async (
  userId: string,
  movieId: string,
  comment: string,
): Promise<void> => {
  let comments = await localforage.getItem<DBComments>(DBKeys.comments);

  if (!comments) {
    await localforage.setItem(DBKeys.comments, INITIAL_COMMENTS);
    comments = INITIAL_COMMENTS;
  }

  if (!comments[movieId]) {
    comments[movieId] = {};
  }

  if (!comments[movieId][userId]) {
    comments[movieId][userId] = [];
  }

  comments[movieId][userId].push(comment);
  await localforage.setItem(DBKeys.comments, comments);
};

export const addLike = async (
  userId: string,
  movieId: string,
): Promise<void> => {
  let likes = await localforage.getItem<DBLikes>(DBKeys.likes);

  if (!likes) {
    await localforage.setItem(DBKeys.likes, INITIAL_LIKES);
    likes = INITIAL_LIKES;
  }

  if (!likes[userId]) {
    likes[userId] = new Set<string>();
  }

  likes[userId].add(movieId);
  await localforage.setItem(DBKeys.likes, likes);
};

export const removeLike = async (
  userId: string,
  movieId: string,
): Promise<void> => {
  let likes = await localforage.getItem<DBLikes>(DBKeys.likes);

  if (likes && likes[userId]) {
    likes[userId].delete(movieId);

    if (likes[userId].size === 0) {
      delete likes[userId];
    }

    await localforage.setItem(DBKeys.likes, likes);
  }
};

export const getRatings = async (movieId: string): Promise<Ratings> => {
  let ratings = await localforage.getItem<DBRatings>(DBKeys.ratings);

  if (!ratings) {
    await localforage.setItem(DBKeys.ratings, INITIAL_RATINGS);
    ratings = INITIAL_RATINGS;
  }

  return ratings[movieId];
};

export const addRating = async (
  userId: string,
  movieId: string,
  rating: number,
): Promise<void> => {
  let ratings = await localforage.getItem<DBRatings>(DBKeys.ratings);

  if (!ratings) {
    await localforage.setItem(DBKeys.ratings, INITIAL_RATINGS);
    ratings = INITIAL_RATINGS;
  }

  if (!ratings[movieId]) {
    ratings[movieId] = {};
  }

  ratings[movieId][userId] = rating;
  await localforage.setItem(DBKeys.ratings, ratings);
};

export const initializeDataStore = async (): Promise<void> => {
  let users = await localforage.getItem<DBUsers>(DBKeys.users);
  if (!users) {
    await localforage.setItem(DBKeys.users, INITIAL_USERS);
  }

  let likes = await localforage.getItem<DBLikes>(DBKeys.likes);
  if (!likes) {
    await localforage.setItem(DBKeys.likes, INITIAL_LIKES);
  }

  let comments = await localforage.getItem<DBComments>(DBKeys.comments);
  if (!comments) {
    await localforage.setItem(DBKeys.comments, INITIAL_COMMENTS);
  }

  let ratings = await localforage.getItem<DBRatings>(DBKeys.ratings);
  if (!ratings) {
    await localforage.setItem(DBKeys.ratings, INITIAL_RATINGS);
  }
};
