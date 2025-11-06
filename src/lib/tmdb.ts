// TMDB API configuration and helper functions
const TMDB_API_KEY = "8265bd1679663a7ea12ac168da84d2e8";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Genre[];
  video?: boolean;
  runtime?: number;
  videos?: {
    results: Video[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieCategory {
  title: string;
  endpoint: string;
}

export const movieCategories: MovieCategory[] = [
  { title: "Trending Now", endpoint: "/trending/movie/week" },
  { title: "Top Rated", endpoint: "/movie/top_rated" },
  { title: "Action Movies", endpoint: "/discover/movie?with_genres=28" },
  { title: "Comedy Movies", endpoint: "/discover/movie?with_genres=35" },
  { title: "Horror Movies", endpoint: "/discover/movie?with_genres=27" },
  { title: "Romance Movies", endpoint: "/discover/movie?with_genres=10749" },
  { title: "Documentaries", endpoint: "/discover/movie?with_genres=99" },
  { title: "Sci-Fi Movies", endpoint: "/discover/movie?with_genres=878" },
];

class TMDBClient {
  private async fetchFromTMDB(endpoint: string) {
    const url = `${TMDB_BASE_URL}${endpoint}${
      endpoint.includes("?") ? "&" : "?"
    }api_key=${TMDB_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }
    return response.json();
  }

  async getTrendingMovies(): Promise<Movie[]> {
    const data = await this.fetchFromTMDB("/trending/movie/week");
    return data.results;
  }

  async getMoviesByCategory(endpoint: string): Promise<Movie[]> {
    const data = await this.fetchFromTMDB(endpoint);
    return data.results;
  }

  async getMovieDetails(movieId: number): Promise<Movie> {
    const data = await this.fetchFromTMDB(
      `/movie/${movieId}?append_to_response=videos,credits`
    );
    return data;
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const data = await this.fetchFromTMDB(
      `/search/movie?query=${encodeURIComponent(query)}`
    );
    return data.results;
  }

  async getGenres(): Promise<Genre[]> {
    const data = await this.fetchFromTMDB("/genre/movie/list");
    return data.genres;
  }

  getImageUrl(path: string | null, size: string = "original"): string {
    if (!path) return "/placeholder.svg";
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  getPosterUrl(path: string | null): string {
    return this.getImageUrl(path, "w500");
  }

  getBackdropUrl(path: string | null): string {
    return this.getImageUrl(path, "original");
  }
}

export const tmdb = new TMDBClient();
