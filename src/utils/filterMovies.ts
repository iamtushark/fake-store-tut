import Movie from "../Interfaces/Movies/movie";

export const filterMovies = (movies: Movie[], searchQuery: string): Movie[] => {
  // console.log(searchQuery, movies);
  
  if (!searchQuery || searchQuery === "") {
    return movies;
  }

  return movies.filter(movie => {
    const titleLower = movie.Title.toLowerCase();
    const queryLower = searchQuery.toLowerCase();
    
    // Check for exact match or if the query is a substring of the title
    return titleLower === queryLower || titleLower.includes(queryLower);
  }).sort((a, b) => {
    // Sort based on how close the match is
    const titleALower = a.Title.toLowerCase();
    const titleBLower = b.Title.toLowerCase();
    const queryLower = searchQuery.toLowerCase();

    // Prioritize exact matches first
    const aIsExactMatch = titleALower === queryLower;
    const bIsExactMatch = titleBLower === queryLower;
    if (aIsExactMatch && !bIsExactMatch) return -1;
    if (!aIsExactMatch && bIsExactMatch) return 1;

    // Then prioritize startsWith matches
    const aStartsWith = titleALower.startsWith(queryLower);
    const bStartsWith = titleBLower.startsWith(queryLower);
    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;

    // Finally, prioritize includes matches
    const aIncludes = titleALower.includes(queryLower);
    const bIncludes = titleBLower.includes(queryLower);
    if (aIncludes && !bIncludes) return -1;
    if (!aIncludes && bIncludes) return 1;

    return 0;
  });
};
