import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { tmdb, Movie, Genre } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGenres();
    loadMovies();
  }, []);

  useEffect(() => {
    if (selectedGenre !== "all") {
      loadMoviesByGenre(selectedGenre);
    } else {
      loadMovies();
    }
  }, [selectedGenre]);

  const loadGenres = async () => {
    try {
      const genreList = await tmdb.getGenres();
      setGenres(genreList);
    } catch (error) {
      console.error("Error loading genres:", error);
    }
  };

  const loadMovies = async () => {
    setLoading(true);
    try {
      const trending = await tmdb.getTrendingMovies();
      setMovies(trending);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoviesByGenre = async (genreId: string) => {
    setLoading(true);
    try {
      const movieList = await tmdb.getMoviesByCategory(
        `/discover/movie?with_genres=${genreId}`
      );
      setMovies(movieList);
    } catch (error) {
      console.error("Error loading movies by genre:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-12 max-w-[1920px] mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Movies
          </h1>

          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading movies...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
