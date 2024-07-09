import Movie from "../Interfaces/Movies/movie";
import { fetchGet } from "../utils/axiosWrapper";
import BASE_API_URL from "./base";

const getMovies = async () => {
  const url = BASE_API_URL;

  try {
    const response: Array<Movie> = await fetchGet(url);
    const movies = response.map((movie: Movie, index: number) => ({
      ...movie,
      id: index,
    }));
    return movies;
  } catch (error) {
    console.error("Error fetching movies", error);
    throw error;
  }
};

export default getMovies;
