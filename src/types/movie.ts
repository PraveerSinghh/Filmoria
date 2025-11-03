export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  media_type?: string;
}

export interface Video {
  id: string;
  key: string;
  type: string;
  site: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}
