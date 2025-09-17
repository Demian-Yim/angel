import React, { useEffect, useCallback } from 'react';
import { GALLERY_PHOTOS, MEDIA_LINKS } from '../constants.ts';
import type { GalleryPhoto } from '../types.ts';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({ isOpen, onClose }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-4">
      <h3 className="text-2xl font-bold text-pink-700">{title}</h3>
      <div className="mt-2 h-1 w-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-library-title"
    >
      <div
        className="relative bg-rose-50/90 w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="media-library-title" className="font-handwriting text-4xl font-bold text-rose-700">
            💖 미디어 보관함
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close media library"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-10">
          {/* Photos Section */}
          <section>
            <SectionHeader title="우리의 사진첩" />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {GALLERY_PHOTOS.map((photo) => (
                <a key={photo.id} href={photo.src} target="_blank" rel="noopener noreferrer" className="group block aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </section>

          {/* Shared Albums Section */}
          <section>
            <SectionHeader title="공유 앨범" />
            <div className="flex flex-col sm:flex-row justify-start items-center gap-6">
              {MEDIA_LINKS.albums.map((album) => (
                <a key={album.title} href={album.url} target="_blank" rel="noopener noreferrer" className="group text-center">
                  <div className="bg-white p-2 rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                    <img src={album.imageUrl} alt={`Album cover for ${album.title}`} className="w-40 h-40 object-cover rounded-md" />
                  </div>
                  <p className="mt-3 font-semibold text-rose-700">{album.title}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Music & Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <SectionHeader title="음악 플레이리스트" />
              <a href={MEDIA_LINKS.music.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/70 rounded-xl shadow-inner hover:shadow-md transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L15,19C12.81,19 11.2,18.84 10.17,18.56C9.27,18.31 8.69,17.73 8.44,16.83C8.31,16.36 8.22,15.73 8.16,14.93C8.09,14.13 8.06,13.44 8.06,12.84L8,12C8,9.81 8.16,8.2 8.44,7.17C8.69,6.27 9.27,5.69 10.17,5.44C11.2,5.16 12.81,5 15,5L15.84,5.06C16.44,5.06 17.13,5.09 17.93,5.16C18.73,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"></path>
                </svg>
                <div>
                  <h4 className="font-bold text-lg text-rose-800">{MEDIA_LINKS.music.title}</h4>
                  <p className="text-sm text-gray-600">YouTube에서 플레이리스트 열기</p>
                </div>
              </a>
            </section>
            
            <section>
              <SectionHeader title="유용한 링크" />
              {MEDIA_LINKS.guides.map((guide) => (
                <a key={guide.title} href={guide.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/70 rounded-xl shadow-inner hover:shadow-md transition-shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg text-rose-800">{guide.title}</h4>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </div>
                </a>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
