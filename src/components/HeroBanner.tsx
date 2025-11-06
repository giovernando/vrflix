import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Info, Plus, Check } from "lucide-react";
import { Button } from "./ui/button";
import { tmdb, Movie } from "@/lib/tmdb";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

export const HeroBanner = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    loadHeroMovie();
  }, []);

  useEffect(() => {
    if (movie && user) {
      checkWatchlist();
    }
  }, [movie, user]);

  const loadHeroMovie = async () => {
    try {
      const trending = await tmdb.getTrendingMovies();
      if (trending.length > 0) {
        const randomMovie = trending[Math.floor(Math.random() * Math.min(5, trending.length))];
        setMovie(randomMovie);
      }
    } catch (error) {
      console.error("Error loading hero movie:", error);
    }
  };

  const checkWatchlist = async () => {
    if (!movie || !user) return;

    const { data } = await supabase
      .from("watchlist")
      .select("id")
      .eq("movie_id", movie.id)
      .eq("user_id", user.id)
      .maybeSingle();

    setIsInWatchlist(!!data);
  };

  const toggleWatchlist = async () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    if (!movie) return;

    try {
      if (isInWatchlist) {
        await supabase
          .from("watchlist")
          .delete()
          .eq("movie_id", movie.id)
          .eq("user_id", user.id);
        setIsInWatchlist(false);
        toast.success("Removed from My List");
      } else {
        await supabase.from("watchlist").insert({
          user_id: user.id,
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        });
        setIsInWatchlist(true);
        toast.success("Added to My List");
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      toast.error("Failed to update watchlist");
    }
  };

  if (!movie) return null;

  return (
    <div className="relative h-[85vh] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${tmdb.getBackdropUrl(movie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1920px] mx-auto px-4 md:px-12 flex items-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            {movie.title}
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/80 gap-2"
              onClick={() => navigate(`/player/${movie.id}`)}
            >
              <Play className="h-5 w-5 fill-current" />
              Play
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="bg-muted/70 hover:bg-muted gap-2"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="bg-muted/70 hover:bg-muted gap-2"
              onClick={toggleWatchlist}
            >
              {isInWatchlist ? (
                <Check className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              My List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
