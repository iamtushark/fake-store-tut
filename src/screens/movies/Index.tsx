import React, { useEffect, useState } from "react";
import getMovies from "../../api/getMovies";
import Movie from "../../Interfaces/Movies/movie";
import dummyData from "../../assets/data/movies.json";
import CommonCircularProgress from "../../components/Common/CommonCircularProgress";
import CommonBox from "../../components/Common/CommonBox";
import CommonGrid from "../../components/Common/CommonGrid";
import CommonHeadingTypography from "../../components/Common/CommonHeadingTypography";
import MovieCard from "../../components/MovieCard";
import { useSelector } from "react-redux";
import { selectLikes, selectStatus } from "../../features/likes/likeSlice";
import { selectLoggedInUser } from "../../features/user/userSlice";
import { TextField, Box } from "@mui/material";
import { filterMovies } from "../../utils/filterMovies";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const user = useSelector(selectLoggedInUser);
  const likes = useSelector(selectLikes);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const data = await getMovies();
        const data: Movie[] = dummyData.map((value, index) => ({
          ...value,
        }));
        setMovies(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const isMovieLiked = (id: string) => {
    return user ? !!likes[user]?.has(id) : false;
  };

  const filteredMovies = filterMovies(movies, searchQuery);

  console.log(status);
  if (loading || status === "idle" || status === "loading") {
    return (
      <CommonBox
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <CommonCircularProgress size={80} sx={{ color: "black" }} />
      </CommonBox>
    );
  }

  if (error) {
    return (
      <CommonBox sx={{ textAlign: "center", color: "red", mt: 4 }}>
        <CommonHeadingTypography variant="h6">{error}</CommonHeadingTypography>
      </CommonBox>
    );
  }

  return (
    <>
      <CommonBox>
        <Box>
        <TextField
          label="Search Movies"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        </Box>
        <CommonGrid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {filteredMovies.map((movie) => (
            <CommonGrid item lg={3} sm={6} md={4} xs={12} key={movie.imdbID}>
              <MovieCard movie={movie} id={movie.imdbID} liked={isMovieLiked(movie.imdbID)} />
            </CommonGrid>
          ))}
        </CommonGrid>
      </CommonBox>
    </>
  );
};

export default Movies;
