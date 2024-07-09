import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Grid,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button,
  IconButton,
  TextField,
  Rating,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";
import {
  addNewLike,
  removeExistingLike,
  selectLikes,
} from "../../features/likes/likeSlice";
import { selectLoggedInUser } from "../../features/user/userSlice";
import {
  selectRatings,
  addNewRating,
  fetchRatings,
} from "../../features/ratings/ratingSlice";
import {
  selectComments,
  addNewComment,
  fetchComments,
} from "../../features/comments/commentSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import dummyData from "../../assets/data/movies.json";
import { Ratings } from "../../utils/dbOperations/interfaces";

const getMovieById = (id: string) => {
  return dummyData.find((movie) => movie.imdbID === id);
};

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movie = getMovieById(id || "");
  const user = useSelector(selectLoggedInUser);
  const likes = useSelector(selectLikes);
  const ratings = useSelector(selectRatings);
  const comments = useSelector(selectComments);
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(
    user ? !!likes[user]?.has(id || "") : false
  );
  const [rating, setRating] = useState<number | undefined>();
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    setIsLiked(user ? !!likes[user]?.has(id || "") : false);
  }, [likes, id, user]);

  useEffect(() => {
    if (id) {
      dispatch(fetchRatings(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  if (!movie || !id) {
    return <Typography variant="h6">Movie not found</Typography>;
  }

  const userHasRated = user && ratings[id] && ratings[id][user];
  const userHasCommented = user && comments[id] && comments[id][user];

  const handleFavoriteClick = () => {
    if (!user) {
      toast.error("Please log in to add to favorites");
      return;
    }
    if (isLiked && id) {
      dispatch(removeExistingLike({ userId: user, movieId: id }));
      setIsLiked(false);
    } else if (id) {
      dispatch(addNewLike({ userId: user, movieId: id }));
      setIsLiked(true);
    }
  };

  const handleAddRatingAndComment = () => {
    if (user && id && rating !== undefined && comment.trim()) {
      dispatch(addNewRating({ userId: user, movieId: id, rating }));
      dispatch(addNewComment({ userId: user, movieId: id, comment }));
      setRating(undefined);
      setComment("");
    } else {
      if(!user){
      toast.error("Please log in and try again");}
      else{
      toast.error("Please provide both, rating and a comment");}
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                alt={movie.Title}
                image={movie.Poster}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = "/abstract-image.jpg";
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "70vh",
                  maxWidth: "40vw",
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h4" component="h1">
                  {movie.Title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {movie.Year} | {movie.Genre} | {movie.Runtime}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1">{movie.Plot}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Directed by: {movie.Director}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Written by: {movie.Writer}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Starring: {movie.Actors}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Language: {movie.Language}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Country: {movie.Country}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Awards: {movie.Awards}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              IMDb Rating: {movie.imdbRating} ({movie.imdbVotes} votes)
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Box Office: {movie.BoxOffice}
            </Typography>
          </Box>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
            <FavoriteIcon color={isLiked ? "secondary" : "inherit"} />
          </IconButton>
          {!userHasRated && !userHasCommented && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="movie-rating"
                value={rating ?? 0}
                precision={1}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setRating(newValue);
                  }
                }}
              />
              <Button
                onClick={handleAddRatingAndComment}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
              >
                Submit
              </Button>
            </Box>
          )}
        </CardContent>
        {!userHasRated && !userHasCommented && (
          <CardContent>
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              label="Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
          </CardContent>
        )}
        <CardContent>
          <Typography variant="h6">Ratings and Comments</Typography>
          {ratings[id] &&
            Object.keys(ratings[id]).map((userId, idx) => (
              <Box
                key={idx}
                sx={{
                  mt: 2,
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  padding: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {userId}: {ratings[id][userId]} stars
                </Typography>
                <Typography variant="body2">
                  {comments[id]?.[userId]?.join(", ") ?? ""}
                </Typography>
              </Box>
            ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetail;
