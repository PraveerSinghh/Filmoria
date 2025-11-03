import { useEffect, useState } from 'react';
import { Play, Minimize2 } from 'lucide-react';
import { getImageUrl } from '../config/tmdb';
import type { Movie } from '../types/movie';

interface NowPlayingProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function NowPlaying({ movie, onClose }: NowPlayingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!movie) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [movie]);

  if (!movie) return null;

  const title = movie.title || movie.name || 'Untitled';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-t border-purple-600/30 shadow-2xl animate-slide-up">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center space-x-4">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={title}
            className="w-16 h-24 object-cover rounded shadow-lg"
            onError={(e) => {
              e.currentTarget.src = getImageUrl(null);
            }}
          />

          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold text-sm truncate">{title}</h4>
            <p className="text-gray-400 text-xs mt-1">Now Playing</p>

            <div className="mt-2 bg-gray-700 rounded-full h-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Play className="w-5 h-5 text-white fill-current" />
            </button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Minimize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
