'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

export default function PhotosPage() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [visibleImages, setVisibleImages] = useState<number>(12); // Initial load count

    const breakpointColumns = {
        default: 4,
        1024: 3,
        768: 2,
        640: 1
    };

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch('/api/photos');
                const data = await response.json();
                setImages(data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, []);

    // Load more images when scrolling near bottom
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
                setVisibleImages(prev => Math.min(prev + 8, images.length));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [images.length]);

    if (loading) {
        return (
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
                    ))}
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Photo Gallery</h1>

            <Masonry
                breakpointCols={breakpointColumns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {images.slice(0, visibleImages).map((image, index) => (
                    <div
                        key={index}
                        className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer mb-4"
                        onClick={() => setSelectedImage(image)}
                    >
                        <Image
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            width={800}
                            height={600}
                            className="rounded-lg w-full h-auto shadow-md hover:shadow-xl transition-shadow"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODc6PTo4MS45RUlIRk45Oz0/REdHR0dHR0dHR0f/2wBDAR4eHh4eHiQeHiRHMkc4R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            loading="lazy"
                            quality={60}
                        />
                    </div>
                ))}
            </Masonry>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
                        <Image
                            src={selectedImage}
                            alt="Expanded view"
                            width={1920}
                            height={1080}
                            className="object-contain max-h-[90vh] rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                            quality={90}
                            priority
                        />
                        <button
                            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {images.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No images found in the gallery.</p>
            )}
        </main>
    );
}
