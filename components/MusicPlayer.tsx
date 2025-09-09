import React, { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const playlistId = 'PLcaHoylU0Ow_c3KEWEhzKF0dr6iHJUmup';

  const onPlayerReady = useCallback((event: any) => {
    event.target.setVolume(50);
    setIsPlayerReady(true);
  }, []);

  const onPlayerStateChange = useCallback((event: any) => {
    if (event.data === window.YT?.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT?.PlayerState.PAUSED || event.data === window.YT?.PlayerState.ENDED) {
      setIsPlaying(false);
    }
  }, []);

  const createPlayer = useCallback(() => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('youtube-player-container', {
        height: '0',
        width: '0',
        playerVars: {
          loop: 1,
          listType: 'playlist',
          list: playlistId,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  }, [onPlayerReady, onPlayerStateChange, playlistId]);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
        window.onYouTubeIframeAPIReady = createPlayer;
      } else {
        createPlayer();
      }
    };

    loadYouTubeAPI();

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [createPlayer]);

  const togglePlay = () => {
    if (!playerRef.current || !isPlayerReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      <div id="youtube-player-container" className="fixed -top-full -left-full"></div>
      <button
        onClick={togglePlay}
        disabled={!isPlayerReady}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition-all duration-300 hover:scale-110 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!isPlayerReady ? (
           <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.002v4.005a1 1 0 001.555.833l3.196-2.003a1 1 0 000-1.664L9.555 7.168z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </>
  );
};

export default MusicPlayer;
