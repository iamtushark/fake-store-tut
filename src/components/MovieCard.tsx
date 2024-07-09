import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import MovieProps from "../Interfaces/Movies/movie";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import { selectLoggedInUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import {
  addNewLike,
  removeExistingLike,
  selectLikes,
} from "../features/likes/likeSlice";

interface Props {
  id: string;
  movie: MovieProps;
  liked : boolean;
}

const MovieCard: React.FC<Props> = ({ id, movie, liked }) => {
  const onErrorLoadingImage = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "/abstract-image.jpg";
  };
  const dispatch = useAppDispatch();
  const user = useSelector(selectLoggedInUser);
  
  const [isLiked, setIsLiked] = useState(liked);

  const handleFavoriteClick = () => {
    if (!user) {
      toast.error("Please log in to add to favorites");
      return;
    }
    if (isLiked) {
      dispatch(removeExistingLike({ userId: user, movieId: id }));
      setIsLiked(false);
    } else {
      dispatch(addNewLike({ userId: user, movieId: id }));
      setIsLiked(true);
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="body2" component="h1">
            {movie.Title}
          </Typography>
        }
        subheader={"Release: " + (movie.Released || "Unknown")}
      />
      <MuiLink underline="none" variant="inherit" href={`/movies/${id}`}>
        <CardMedia
          component="img"
          alt={movie.Title}
          onError={onErrorLoadingImage}
          image={movie.Poster}
          sx={{
            width: "100%",
            maxHeight: 500,
          }}
        />
      </MuiLink>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          <FavoriteIcon color={isLiked ? "secondary" : "inherit"} />
        </IconButton>
        <Fab size="small" color="secondary" aria-label="Rating">
          <Typography variant="button">{movie.imdbRating}</Typography>
        </Fab>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
