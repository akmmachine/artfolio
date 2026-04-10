import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Slider } from '../ui/slider';

interface CropModalProps {
  image: string;
  onCropComplete: (croppedImage: Blob) => void;
  onClose: () => void;
  aspect?: number;
}

export const CropModal: React.FC<CropModalProps> = ({ image, onCropComplete, onClose, aspect = 1 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (crop: any) => setCrop(crop);
  const onZoomChange = (zoom: any) => setZoom(zoom);

  const handleCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async () => {
    try {
      const img = await createImage(image);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      return new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/webp', 0.9);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onConfirm = async () => {
    const croppedBlob = await getCroppedImg();
    if (croppedBlob) {
      onCropComplete(croppedBlob);
      onClose();
    }
  };

  return (
    <Dialog open={!!image} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden bg-background">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Crop Your Profile Photo</DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full h-[400px] bg-muted">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={handleCropComplete}
            onZoomChange={onZoomChange}
          />
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>Zoom</span>
              <span>{Math.round(zoom * 100)}%</span>
            </div>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(val) => setZoom(val[0])}
            />
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={onClose}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-xl" onClick={onConfirm}>Set Profile Photo</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
