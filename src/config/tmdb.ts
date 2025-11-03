// config/tmdb.ts
console.log('Loaded TMDB Token:', import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN);

export const BASE_URL = 'https://api.themoviedb.org/3';

const API_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

if (!API_TOKEN) {
  throw new Error('TMDB API token is not defined in your environment variables');
}

// Generic fetch function for TMDB API
export const fetchFromTMDB = async (endpoint: string): Promise<any> => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Image helpers
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const POSTER_SIZE = 'w500';
export const BACKDROP_SIZE = 'original';

export const FALLBACK_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"%3E%3Crect width="500" height="750" fill="%23111111"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23666666" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

export const getImageUrl = (path: string | null, size: string = POSTER_SIZE): string => {
  if (!path) return FALLBACK_IMAGE;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};






// import dotenv from 'dotenv';
// dotenv.config();

// export const BASE_URL = 'https://api.themoviedb.org/3';
// export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
// export const POSTER_SIZE = 'w500';
// export const BACKDROP_SIZE = 'original';

// export const FALLBACK_IMAGE =
//   'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"%3E%3Crect width="500" height="750" fill="%23111111"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23666666" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

// const V4_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN as string;

// if (!V4_TOKEN) {
//   console.warn('⚠️ TMDB_READ_ACCESS_TOKEN is missing in .env');
// }

// /**
//  * Fetch wrapper using TMDB v4 Bearer token
//  */
// export const fetchFromTMDB = async (endpoint: string): Promise<any> => {
//   const url = `${BASE_URL}${endpoint}`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${V4_TOKEN}`,
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//   });

//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(`TMDB API error: ${response.status} - ${text}`);
//   }

//   return response.json();
// };

// /**
//  * Build full image URL or fallback placeholder
//  */
// export const getImageUrl = (path: string | null, size: string = POSTER_SIZE): string => {
//   if (!path) return FALLBACK_IMAGE;
//   return `${IMAGE_BASE_URL}/${size}${path}`;
// };





// // config/tmdb.ts
// import dotenv from 'dotenv';
// dotenv.config();

// /**
//  * Load TMDB keys from environment variables
//  * (Make sure .env is at your project root)
//  */
// const V3_KEY = process.env.TMDB_API_KEY as string;
// const V4_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN as string;

// if (!V3_KEY || !V4_TOKEN) {
//   console.warn('⚠️ TMDB API key or Read Access Token is missing in .env file');
// }

// /**
//  * API base URLs
//  */
// export const BASE_URL = 'https://api.themoviedb.org/3';
// export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
// export const POSTER_SIZE = 'w500';
// export const BACKDROP_SIZE = 'original';

// export const FALLBACK_IMAGE =
//   'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"%3E%3Crect width="500" height="750" fill="%23111111"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23666666" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

// /**
//  * Build full image URL or use fallback placeholder
//  */
// export const getImageUrl = (path: string | null, size: string = POSTER_SIZE): string => {
//   if (!path) return FALLBACK_IMAGE;
//   return `${IMAGE_BASE_URL}/${size}${path}`;
// };

// /**
//  * Fetch data from TMDB using the v4 Bearer token (preferred)
//  */
// export const fetchFromTMDB = async (endpoint: string): Promise<any> => {
//   const url = `${BASE_URL}${endpoint}`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${V4_TOKEN}`,
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`TMDB API error: ${response.status} - ${errorText}`);
//   }

//   return response.json();
// };

// /**
//  * Optional: Fetch using v3 API key (useful for some endpoints)
//  */
// export const fetchWithV3Key = async (endpoint: string): Promise<any> => {
//   const url = `${BASE_URL}${endpoint}?api_key=${V3_KEY}`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`TMDB API error: ${response.status} - ${errorText}`);
//   }

//   return response.json();
// };





// const API_KEYS = [
//   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWU2ZDc3MmY5MDg3YWVhYzQzMmEyOTM1ZWJlMjk0NCIsIm5iZiI6MTczMjMyNTEwOC4yMjk1NTIyLCJzdWIiOiI2NzQwMWJiY2NhM2FjMDQ3YWQ0YzRkODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BdmOmhVbszsXK1jJcgbAJmqJKxBh5FvOzpAYpKxZiQI',
//   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmUxYjg2MWM4ZDFmZDU2N2Y5YjY3ZmZjNzg1YjEwYiIsIm5iZiI6MTczMjMyNTA4MC43MTQ5MzM5LCJzdWIiOiI2NzQwMWJhMGE4YmU5ZjMxMTE5M2M3NzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BFVmnH-b6iWdRUb7N3lTaXjPdRt-INJpD1Tn7rLbhrE'
// ];

// let currentKeyIndex = 0;

// export const getApiKey = (): string => {
//   return API_KEYS[currentKeyIndex];
// };

// export const rotateApiKey = (): void => {
//   currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
// };

// export const BASE_URL = 'https://api.themoviedb.org/3';
// export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
// export const POSTER_SIZE = 'w500';
// export const BACKDROP_SIZE = 'original';
// export const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"%3E%3Crect width="500" height="750" fill="%23111111"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23666666" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

// export const getImageUrl = (path: string | null, size: string = POSTER_SIZE): string => {
//   if (!path) return FALLBACK_IMAGE;
//   return `${IMAGE_BASE_URL}/${size}${path}`;
// };
