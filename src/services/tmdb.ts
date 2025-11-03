import { fetchFromTMDB } from '../config/tmdb';
import type { Movie, Video, Genre } from '../types/movie';

const DEMO_MOVIES: Movie[] = [
  {
    id: 1,
    title: 'The Matrix',
    name: 'The Matrix',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop_path: '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    vote_average: 8.7,
    release_date: '1999-03-30',
    first_air_date: '1999-03-30',
    media_type: 'movie',
    genre_ids: [28, 878],
  },
  {
    id: 2,
    title: 'Inception',
    name: 'Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    vote_average: 8.4,
    release_date: '2010-07-16',
    first_air_date: '2010-07-16',
    media_type: 'movie',
    genre_ids: [28, 878, 53],
  },
  {
    id: 3,
    title: 'The Dark Knight',
    name: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
    vote_average: 9.0,
    release_date: '2008-07-18',
    first_air_date: '2008-07-18',
    media_type: 'movie',
    genre_ids: [28, 80, 18],
  },
  {
    id: 4,
    title: 'Interstellar',
    name: 'Interstellar',
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg',
    vote_average: 8.6,
    release_date: '2014-11-07',
    first_air_date: '2014-11-07',
    media_type: 'movie',
    genre_ids: [12, 18, 878],
  },
  {
    id: 5,
    title: 'Breaking Bad',
    name: 'Breaking Bad',
    overview: 'A high school chemistry teacher turned methamphetamine producer partners with a former student.',
    poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    vote_average: 9.5,
    release_date: '2008-01-20',
    first_air_date: '2008-01-20',
    media_type: 'tv',
    genre_ids: [18, 80],
  },
  {
    id: 6,
    title: 'Stranger Things',
    name: 'Stranger Things',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.',
    poster_path: '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    vote_average: 8.6,
    release_date: '2016-07-15',
    first_air_date: '2016-07-15',
    media_type: 'tv',
    genre_ids: [18, 9648, 878],
  },
];

const DEMO_GENRES: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export const getTrending = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTMDB('/trending/all/week');
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trending:', error);
    return DEMO_MOVIES;
  }
};

export const getPopular = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTMDB('/movie/popular');
    return data.results || [];
  } catch (error) {
    console.error('Error fetching popular:', error);
    return DEMO_MOVIES;
  }
};

export const getTopRated = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTMDB('/movie/top_rated');
    return data.results || [];
  } catch (error) {
    console.error('Error fetching top rated:', error);
    return DEMO_MOVIES;
  }
};

export const getNowPlaying = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTMDB('/movie/now_playing');
    return data.results || [];
  } catch (error) {
    console.error('Error fetching now playing:', error);
    return DEMO_MOVIES;
  }
};

export const getTVShows = async (): Promise<Movie[]> => {
  try {
    const data = await fetchFromTMDB('/tv/popular');
    return data.results || [];
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return DEMO_MOVIES.filter((m) => m.media_type === 'tv');
  }
};

export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const data = await fetchFromTMDB(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return DEMO_MOVIES.filter((m) => m.genre_ids.includes(genreId));
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];
  try {
    const data = await fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}`);
    return data.results || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    const lowerQuery = query.toLowerCase();
    return DEMO_MOVIES.filter(
      (m) =>
        m.title?.toLowerCase().includes(lowerQuery) ||
        m.name?.toLowerCase().includes(lowerQuery) ||
        m.overview?.toLowerCase().includes(lowerQuery)
    );
  }
};

export const getMovieVideos = async (movieId: number, mediaType: string = 'movie'): Promise<Video[]> => {
  try {
    const data = await fetchFromTMDB(`/${mediaType}/${movieId}/videos`);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

export const getGenres = async (): Promise<Genre[]> => {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      fetchFromTMDB('/genre/movie/list'),
      fetchFromTMDB('/genre/tv/list'),
    ]);

    const allGenres = [...(movieGenres.genres || []), ...(tvGenres.genres || [])];
    const uniqueGenres = Array.from(new Map(allGenres.map((g: Genre) => [g.id, g])).values());

    return uniqueGenres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return DEMO_GENRES;
  }
};


export const getMovieDetails = async (id: number, mediaType: string = "movie") => {
  try {
    const data = await fetchFromTMDB(`/${mediaType}/${id}?append_to_response=credits`);
    return data;
  } catch (error) {
    console.error("Error fetching movie or TV show details:", error);
    return null;
  }
};

export const getSimilarMovies = async (id: number, mediaType: string = "movie") => {
  try {
    const data = await fetchFromTMDB(`/${mediaType}/${id}/similar`);
    return data.results || [];
  } catch (error) {
    console.error("Error fetching similar movies/shows:", error);
    return [];
  }
};



// Fetch trailer (YouTube video)
export const getTrailer = async (id: number): Promise<string | null> => {
  try {
    // Try fetching movie trailers
    let data = await fetchFromTMDB(`/movie/${id}/videos`);
    if (data.results?.length > 0) {
      const trailer = data.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) return `https://www.youtube.com/embed/${trailer.key}`;
    }

    // Try fetching TV trailers
    data = await fetchFromTMDB(`/tv/${id}/videos`);
    if (data.results?.length > 0) {
      const trailer = data.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) return `https://www.youtube.com/embed/${trailer.key}`;
    }

    return null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};



// import { BASE_URL, fetchFromTMDB } from '../config/tmdb';
// import type { Movie, Video, Genre } from '../types/movie';

// interface TMDBResponse<T> {
//   results: T[];
//   page: number;
//   total_pages: number;
// }

// const DEMO_MOVIES: Movie[] = [
//   {
//     id: 1,
//     title: 'The Matrix',
//     name: 'The Matrix',
//     overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
//     poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
//     backdrop_path: '/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
//     vote_average: 8.7,
//     release_date: '1999-03-30',
//     first_air_date: '1999-03-30',
//     media_type: 'movie',
//     genre_ids: [28, 878]
//   },
//   {
//     id: 2,
//     title: 'Inception',
//     name: 'Inception',
//     overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
//     poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
//     backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
//     vote_average: 8.4,
//     release_date: '2010-07-16',
//     first_air_date: '2010-07-16',
//     media_type: 'movie',
//     genre_ids: [28, 878, 53]
//   },
//   {
//     id: 3,
//     title: 'The Dark Knight',
//     name: 'The Dark Knight',
//     overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.',
//     poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
//     backdrop_path: '/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
//     vote_average: 9.0,
//     release_date: '2008-07-18',
//     first_air_date: '2008-07-18',
//     media_type: 'movie',
//     genre_ids: [28, 80, 18]
//   },
//   {
//     id: 4,
//     title: 'Interstellar',
//     name: 'Interstellar',
//     overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
//     poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
//     backdrop_path: '/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg',
//     vote_average: 8.6,
//     release_date: '2014-11-07',
//     first_air_date: '2014-11-07',
//     media_type: 'movie',
//     genre_ids: [12, 18, 878]
//   },
//   {
//     id: 5,
//     title: 'Breaking Bad',
//     name: 'Breaking Bad',
//     overview: 'A high school chemistry teacher turned methamphetamine producer partners with a former student.',
//     poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
//     backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
//     vote_average: 9.5,
//     release_date: '2008-01-20',
//     first_air_date: '2008-01-20',
//     media_type: 'tv',
//     genre_ids: [18, 80]
//   },
//   {
//     id: 6,
//     title: 'Stranger Things',
//     name: 'Stranger Things',
//     overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.',
//     poster_path: '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
//     backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
//     vote_average: 8.6,
//     release_date: '2016-07-15',
//     first_air_date: '2016-07-15',
//     media_type: 'tv',
//     genre_ids: [18, 9648, 878]
//   }
// ];

// const DEMO_GENRES: Genre[] = [
//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
//   { id: 35, name: 'Comedy' },
//   { id: 80, name: 'Crime' },
//   { id: 99, name: 'Documentary' },
//   { id: 18, name: 'Drama' },
//   { id: 10751, name: 'Family' },
//   { id: 14, name: 'Fantasy' },
//   { id: 36, name: 'History' },
//   { id: 27, name: 'Horror' },
//   { id: 10402, name: 'Music' },
//   { id: 9648, name: 'Mystery' },
//   { id: 10749, name: 'Romance' },
//   { id: 878, name: 'Science Fiction' },
//   { id: 53, name: 'Thriller' },
//   { id: 10752, name: 'War' },
//   { id: 37, name: 'Western' }
// ];

// const fetchWithRetry = async (url: string, retries = 2): Promise<any> => {
//   for (let i = 0; i <= retries; i++) {
//     try {
//       const response = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${getApiKey()}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         return await response.json();
//       }

//       if (response.status === 401 && i < retries) {
//         rotateApiKey();
//         continue;
//       }

//       throw new Error(`HTTP ${response.status}`);
//     } catch (error) {
//       if (i === retries) throw error;
//       rotateApiKey();
//     }
//   }
// };

// export const getTrending = async (): Promise<Movie[]> => {
//   try {
//     const data = await fetchWithRetry(`${BASE_URL}/trending/all/week`);
//     return data.results || [];
//   } catch (error) {
//     console.error('Error fetching trending:', error);
//     return DEMO_MOVIES;
//   }
// };

// export const getPopular = async (): Promise<Movie[]> => {
//   try {
//     const data = await fetchWithRetry(`${BASE_URL}/movie/popular`);
//     return data.results || [];
//   } catch (error) {
//     console.error('Error fetching popular:', error);
//     return DEMO_MOVIES;
//   }
// };

// export const getTopRated = async (): Promise<Movie[]> => {
//   try {
//     const data = await fetchWithRetry(`${BASE_URL}/movie/top_rated`);
//     return data.results || [];
//   } catch (error) {
//     console.error('Error fetching top rated:', error);
//     return DEMO_MOVIES;
//   }
// };

// export const getNowPlaying = async (): Promise<Movie[]> => {
//   try {
//     const data = await fetchWithRetry(`${BASE_URL}/movie/now_playing`);
//     return data.results || [];
//   } catch (error) {
//     console.error('Error fetching now playing:', error);
//     return DEMO_MOVIES;
//   }
// };

// export const getTVShows = async (): Promise<Movie[]> => {
//   try {
//     const data = await fetchWithRetry(`${BASE_URL}/tv/popular`);
//     return data.results || [];
//   } catch (error) {
//     console.error('Error fetching TV shows:', error);
//     return DEMO_MOVIES.filter(m => m.media_type === 'tv');
//   }
// };

// export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
//   try {
//     const data = await fetchWithRetry(
//       `${BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`
//     );
//     return data.results || [];
//   } catch (error) {
//     console.error('Error fetching movies by genre:', error);
//     return DEMO_MOVIES.filter(m => m.genre_ids.includes(genreId));
//   }
// };

// export const searchMovies = async (query: string): Promise<Movie[]> => {
//   if (!query.trim()) return [];
//   try {
//     const data = await fetchWithRetry(
//       `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}`
//     );
//     return data.results || [];
//   } catch (error) {
//     console.error('Error searching movies:', error);
//     const lowerQuery = query.toLowerCase();
//     return DEMO_MOVIES.filter(m =>
//       m.title?.toLowerCase().includes(lowerQuery) ||
//       m.name?.toLowerCase().includes(lowerQuery) ||
//       m.overview?.toLowerCase().includes(lowerQuery)
//     );
//   }
// };

// export const getMovieVideos = async (movieId: number, mediaType: string = 'movie'): Promise<Video[]> => {
//   try {
//     const data = await fetchWithRetry(`${BASE_URL}/${mediaType}/${movieId}/videos`);
//     return data.results || [];
//   } catch (error) {
//     console.error('Error fetching videos:', error);
//     return [];
//   }
// };

// export const getGenres = async (): Promise<Genre[]> => {
//   try {
//     const [movieGenres, tvGenres] = await Promise.all([
//       fetchWithRetry(`${BASE_URL}/genre/movie/list`),
//       fetchWithRetry(`${BASE_URL}/genre/tv/list`),
//     ]);

//     const allGenres = [...(movieGenres.genres || []), ...(tvGenres.genres || [])];
//     const uniqueGenres = Array.from(
//       new Map(allGenres.map((g: Genre) => [g.id, g])).values()
//     );

//     return uniqueGenres;
//   } catch (error) {
//     console.error('Error fetching genres:', error);
//     return DEMO_GENRES;
//   }
// };
