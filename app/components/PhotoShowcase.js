'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const PhotoShowcase = () => {
  const photos = [
    {
      id: 1,
      src: '/imgs/000.jpg',
      title: 'Still, we hang on',
      description: 'Canon Photo Marathon 2025 - Home',
      tags: ['b&w', 'architecture', 'geom', 'lighting']
    },
    {
      id: 2,
      src: '/imgs/001.jpg',
      title: 'A great glory',
      description: 'Canon Photo Marathon 2025 - Vintage',
      tags: ['lighting']
    },
    {
      id: 3,
      src: '/imgs/002.jpg',
      title: 'Sepia spirals',
      description: 'Canon Photo Marathon 2025 - Vintage',
      tags: ['p&r']
    },
    {
      id: 4,
      src: '/imgs/003.jpg',
      title: 'title',
      description: 'Canon Photo Marathon 2025 - Vibes',
      tags: ['lighting']
    },
    {
      id: 5,
      src: '/imgs/004.jpg',
      title: 'title',
      description: 'Somewhere in the Peranakan Museum, Singapore',
      tags: ['lighting']
    },
    {
      id: 6,
      src: '/imgs/005.jpg',
      title: 'By hand.',
      description: 'Singapore NE Show',
      tags: []
    },
    {
      id: 7,
      src: '/imgs/006.jpg',
      title: 'title',
      description: 'Singapore NE Show',
      tags: ['-ve']
    },
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading state for each image
  const [modalImageLoaded, setModalImageLoaded] = useState(false); // Modal image loading state
  const imageRef = useRef(null);

  const tags = ['all', 'portrait', 'b&w', 'nature', 'architecture', 'lighting', 'p&r', 'geom', '-ve'];

  useEffect(() => {
    let filtered = photos;

    // Apply tag filter
    if (activeFilter !== 'all') {
      filtered = photos.filter(photo =>
        photo.tags.includes(activeFilter)
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(photo =>
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPhotos(filtered);
  }, [activeFilter, searchTerm]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const openModal = (photo) => {
    setModalPhoto(photo);
    setModalImageLoaded(false); // Reset modal image loading state
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalPhoto(null);
    setModalImageLoaded(false);
    document.body.style.overflow = 'auto';
    setImageWidth(0);
  };

  const getTagDisplayName = (tag) => {
    switch (tag) {
      case 'b&w': return 'Black & White';
      case 'portrait': return 'Portrait';
      case 'nature': return 'Nature';
      case 'lighting': return 'Lighting';
      case 'p&r': return 'Patterns & Repetition';
      case 'architecture': return 'Architecture';
      case 'geom': return 'Geometry';
      case '-ve': return 'Negative Space';
      case 'all': return 'All';
      default: return tag;
    }
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageWidth(imageRef.current.offsetWidth);
    }
    setModalImageLoaded(true);
  };

  const handleGridImageLoad = (photoId) => {
    setLoadingStates(prev => ({
      ...prev,
      [photoId]: true
    }));
  };

  const handleGridImageStart = (photoId) => {
    setLoadingStates(prev => ({
      ...prev,
      [photoId]: false
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalPhoto) {
        closeModal();
      }
    };

    const handleResize = () => {
      if (imageRef.current) {
        setImageWidth(imageRef.current.offsetWidth);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [modalPhoto]);

  // Loading Spinner Component
  const LoadingSpinner = ({ size = 'default' }) => {
    const spinnerSize = size === 'large' ? 'w-12 h-12' : 'w-8 h-8';
    return (
      <div className={`${spinnerSize} border-3 border-indigo-200 border-t-indigo-500 rounded-full animate-spin`}></div>
    );
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="bg-slate-700 h-64 lg:h-72 rounded-t-2xl"></div>
      <div className="p-6 space-y-3">
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-3 bg-slate-700 rounded w-1/2"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-slate-700 rounded-full w-16"></div>
          <div className="h-6 bg-slate-700 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 lg:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center p-8 lg:p-12">
          <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Photo Showcase - Dzuizz
          </h1>
          <h2 className='lg:mt-3 font-mono text-slate-500'>🥀</h2>
        </div>

        {/* Controls */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              className="w-full px-6 py-4 bg-slate-800 border-2 border-indigo-500 rounded-full text-lg outline-none transition-all duration-300 focus:border-slate-800 focus:ring-4 focus:ring-indigo-200"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3 justify-center">
            {tags.map(tag => (
              <button
                key={tag}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${activeFilter === tag
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40'
                  : 'bg-slate-800 text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white'
                  }`}
                onClick={() => handleFilterChange(tag)}
              >
                {getTagDisplayName(tag)}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group bg-slate-800 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105"
              onClick={() => openModal(photo)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Photo Container */}
              <div className="relative h-64 lg:h-72 overflow-hidden bg-slate-700">
                {/* Loading State */}
                {!loadingStates[photo.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
                    <LoadingSpinner />
                  </div>
                )}

                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className={`object-cover transition-all duration-500 group-hover:scale-110 ${loadingStates[photo.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  onLoadingComplete={() => handleGridImageLoad(photo.id)}
                  onLoadStart={() => handleGridImageStart(photo.id)}
                />

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 ${!loadingStates[photo.id] ? 'pointer-events-none' : ''
                  }`}>
                  <h3 className="text-slate-100 font-bold text-xl">
                    {photo.title}
                  </h3>
                </div>
              </div>

              {/* Photo Info */}
              <div className="p-6">
                <p className="text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {photo.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-slate-100 text-xs font-medium rounded-full"
                    >
                      {getTagDisplayName(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-16 bg-slate-800 border-2 border-indigo-500 backdrop-blur-lg rounded-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-500 mb-2">
              No photos found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-7xl h-[85vh] bg-slate-800 rounded-2xl overflow-hidden animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-colors duration-200"
              onClick={closeModal}
            >
              ×
            </button>

            {/* Modal Content with Side Layout */}
            <div className="flex h-full">
              {/* Image Section - Dynamic */}
              <div className="flex-1 p-8 flex items-center justify-center relative">
                {/* Modal Loading State */}
                {!modalImageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 rounded-xl">
                    <LoadingSpinner size="large" />
                    <p className="text-slate-300 mt-4 text-lg">Loading image...</p>
                  </div>
                )}

                <div className={`border-4 border-slate-100 rounded-xl overflow-hidden shadow-2xl max-w-full max-h-full transition-opacity duration-500 ${modalImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <Image
                    ref={imageRef}
                    src={modalPhoto.src}
                    alt={modalPhoto.title}
                    width={800}
                    height={600}
                    className="w-auto h-auto max-w-full max-h-[75vh] object-contain"
                    sizes="70vw"
                    priority
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>

              {/* Info Section - Fixed Width */}
              <div className="w-80 p-8 flex flex-col justify-center bg-slate-700/50 border-l border-slate-600">
                <div className={`space-y-6 transition-opacity duration-500 ${modalImageLoaded ? 'opacity-100' : 'opacity-50'
                  }`}>
                  <h3 className="text-3xl font-bold text-slate-100 leading-tight">
                    {modalPhoto.title}
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed">
                    {modalPhoto.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {modalPhoto.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-full shadow-lg"
                      >
                        {getTagDisplayName(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PhotoShowcase;
