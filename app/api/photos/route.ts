import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const publicDir = path.join(process.cwd(), 'public', 'imgs');

    // If directory doesn't exist, return empty array
    if (!fs.existsSync(publicDir)) {
        return NextResponse.json({ images: [] });
    }

    try {
        const files = fs.readdirSync(publicDir);
        const images = files
            .filter(file => !file.startsWith('.')) // Exclude hidden files like .DS_Store
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/imgs/${file}`);

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Error reading images directory:', error);
        return NextResponse.json({ images: [] }, { status: 200 }); // Return 200 even on error
    }
} 