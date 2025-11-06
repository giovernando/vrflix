import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { MovieCarousel } from "@/components/MovieCarousel";
import { Footer } from "@/components/Footer";
import { tmdb, Movie, movieCategories } from "@/lib/tmdb";

export default function Home() {
  const [categoryMovies, setCategoryMovies] = useState<{ [key: string]: Movie[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = async () => {
    try {
      const promises = movieCategories.map(async (category) => {
        const movies = await tmdb.getMoviesByCategory(category.endpoint);
        return { title: category.title, movies };
      });

      const results = await Promise.all(promises);
      const moviesMap: { [key: string]: Movie[] } = {};
      
      results.forEach((result) => {
        moviesMap[result.title] = result.movies;
      });

      setCategoryMovies(moviesMap);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner />
      
      <div className="space-y-8 pb-12">
        {movieCategories.map((category) => (
          <MovieCarousel
            key={category.title}
            title={category.title}
            movies={categoryMovies[category.title] || []}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
