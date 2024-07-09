export type Likes = Set<string>;

export interface DBLikes {
  [userId: string]: Likes;
}

export interface Comments {
  [movieID: string]: Array<string>;
}

export interface DBComments {
  [userId: string]: Comments;
}

export interface User {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface DBUsers {
  [userId: string]: User;
}

export interface Ratings {
  [userId: string]: number;
}

export interface DBRatings {
  [movieId: string]: Ratings;
}
