import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define the YT type for the YouTube player API to avoid TS errors
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
  const playerRef = useRef<any>(null);
  const videoId = 'Y8HOfcYWZoo'; // Celine Dion - The Power of Love

  const createPlayer = useCallback(() => {
    if (!window.YT) return;
    playerRef.current = new window.YT.Player('youtube-player-container', {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: videoId, // Required for loop to work correctly
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (event: any) => {
          // Attempt to play, volume set to a reasonable level
          event.target.setVolume(50);
          event.target.playVideo();
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        },
      },
    });
  }, [videoId]);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
        
        window.onYouTubeIframeAPIReady = () => {
          createPlayer();
        };
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
    if (!playerRef.current) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      <div id="youtube-player-container" className="fixed -top-full -left-full w-0 h-0"></div>
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        {isPlaying ? (
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
