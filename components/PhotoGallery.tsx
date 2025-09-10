import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_PHOTOS } from '../constants.ts';

const PhotoGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = useCallback(() => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  }, []);

  const showNextPhoto = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex + 1) % GALLERY_PHOTOS.length));
  }, []);

  const showPrevPhoto = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPhotoIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape') {
          closeModal();
      } else if (e.key === 'ArrowRight') {
          setSelectedPhotoIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex + 1) % GALLERY_PHOTOS.length));
      } else if (e.key === 'ArrowLeft') {
          setSelectedPhotoIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length));
      }
  }, [closeModal]);

  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (document.body.style.overflow === 'hidden') {
         document.body.style.overflow = 'auto'; // Ensure scroll is restored on component unmount
      }
    };
  }, [selectedPhotoIndex, handleKeyDown]);


  const selectedPhoto = selectedPhotoIndex !== null ? GALLERY_PHOTOS[selectedPhotoIndex] : null;

  const gridClasses = [
    'md:col-span-2', // Photo 1
    'md:col-span-2', // Photo 2
    'md:col-span-2', // Photo 3
    'md:col-start-2 md:col-span-2', // Photo 4
    'col-span-2 md:col-start-auto md:col-span-2', // Photo 5
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {GALLERY_PHOTOS.map((photo, index) => (
          <div
            key={photo.id}
            className={`group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl aspect-w-1 aspect-h-1 ${gridClasses[index] ?? ''}`}
            onClick={() => openModal(index)}
            onKeyDown={(e) => e.key === 'Enter' && openModal(index)}
            role="button"
            tabIndex={0}
            aria-label={`View image: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm8-3a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-caption"
        >
          <div className="relative w-full max-w-4xl p-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <p id="photo-caption" className="text-center text-white mt-4 text-2xl font-handwriting">{selectedPhoto.caption}</p>
          </div>
          
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close image viewer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <button
            onClick={showPrevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2 bg-black/20 rounded-full hidden sm:block"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button
            onClick={showNextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2 bg-black/20 rounded-full hidden sm:block"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;