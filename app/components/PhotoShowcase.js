'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '../components/Navbar';
import RoundedBox from '../components/RoundedBox';

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
  const [loadingStates, setLoadingStates] = useState({});
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  const tags = ['all', 'portrait', 'b&w', 'nature', 'architecture', 'lighting', 'p&r', 'geom', '-ve'];

  useEffect(() => {
    let filtered = photos;

    if (activeFilter !== 'all') {
      filtered = photos.filter(photo =>
        photo.tags.includes(activeFilter)
      );
    }

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
    setModalImageLoaded(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalPhoto(null);
    setModalImageLoaded(false);
    document.body.style.overflow = 'auto';
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

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalPhoto]);

  return (
    <>
      <Navbar />

      <main className="flex flex-col gap-4 p-4 pt-2">
        {/* Photo Showcase Content */}
        <RoundedBox>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="space-y-4 mb-12">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">
                  Photo Showcase
                </h1>
                <h2 className="text-lg text-gray-600">
                  A collection of moments captured through the lens
                </h2>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6 mb-8">
              {/* Search Bar */}
              <div>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-color)'
                  }}
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${activeFilter === tag
                      ? 'text-white border-transparent'
                      : 'border-gray-300 hover:border-purple-300'
                      }`}
                    style={{
                      backgroundColor: activeFilter === tag ? 'var(--accent-color)' : 'transparent',
                      borderColor: activeFilter === tag ? 'var(--accent-color)' : 'var(--border-color)',
                      color: activeFilter === tag ? 'white' : 'var(--text-color)'
                    }}
                    onMouseEnter={(e) => {
                      if (activeFilter !== tag) {
                        e.target.style.backgroundColor = 'var(--accent-color)';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== tag) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--text-color)';
                      }
                    }}
                    onClick={() => handleFilterChange(tag)}
                  >
                    {getTagDisplayName(tag)}
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                  style={{ borderColor: 'var(--border-color)' }}
                  onClick={() => openModal(photo)}
                >
                  {/* Photo Container */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    {!loadingStates[photo.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
                      </div>
                    )}

                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className={`object-cover transition-all duration-300 group-hover:scale-105 ${loadingStates[photo.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onLoadingComplete={() => handleGridImageLoad(photo.id)}
                      onLoadStart={() => handleGridImageStart(photo.id)}
                    />
                  </div>

                  {/* Photo Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {photo.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {photo.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: 'var(--accent-color)',
                            color: 'white'
                          }}
                        >
                          {getTagDisplayName(tag)}
                        </span>
                      ))}
                      {photo.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{photo.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredPhotos.length === 0 && (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">
                  No photos found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </RoundedBox>
      </main>

      {/* Modal */}
      {modalPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            style={{ backgroundColor: 'var(--bg-color)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-200"
              onClick={closeModal}
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Image Section */}
              <div className="flex-1 p-6 flex items-center justify-center relative">
                {!modalImageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
                    <p className="text-gray-500 mt-4">Loading image...</p>
                  </div>
                )}

                <div className={`border border-gray-200 rounded-lg overflow-hidden shadow-lg max-w-full max-h-full transition-opacity duration-500 ${modalImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <Image
                    src={modalPhoto.src}
                    alt={modalPhoto.title}
                    width={800}
                    height={600}
                    className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
                    sizes="70vw"
                    priority
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-gray-200 overflow-y-auto">
                <div className={`space-y-4 transition-opacity duration-500 ${modalImageLoaded ? 'opacity-100' : 'opacity-50'
                  }`}>
                  <h3 className="text-2xl font-bold leading-tight">
                    {modalPhoto.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {modalPhoto.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {modalPhoto.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full text-white"
                        style={{ backgroundColor: 'var(--accent-color)' }}
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
    </>
  );
};

export default PhotoShowcase;
