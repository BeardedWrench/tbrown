/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import Image from 'next/image';
import {
  getPublicImageUrl,
  listImagesFromBucket,
} from '@/lib/supabase/media-server';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaLibraryModal({ open, onClose, onSelect }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const fetchImages = async () => {
      try {
        const raw = await listImagesFromBucket();
        const publicUrls = await Promise.all(
          raw.map((item: any) => getPublicImageUrl(`site-assets/${item.name}`))
        );
        setImages(publicUrls);
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="p-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Select Image</h2>
        {loading ? (
          <p>Loading...</p>
        ) : images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((url) => (
              <div
                key={url}
                className="border rounded hover:shadow cursor-pointer"
                onClick={() => onSelect(url)}
              >
                <Image
                  src={url}
                  alt="Uploaded image"
                  width={300}
                  height={200}
                  className="object-cover w-full h-32"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}
