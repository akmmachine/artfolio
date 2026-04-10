import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Upload, Link as LinkIcon, Shuffle, X, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { uploadImage } from '../../lib/storage';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  value, 
  onChange, 
  label = "Image",
  folder = "general"
}) => {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadImage(file, folder);
        setPreview(url);
        onChange(url);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const url = `https://picsum.photos/seed/${randomId}/1200/800`;
    setPreview(url);
    onChange(url);
  };

  const clearImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex bg-muted rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all",
              mode === 'url' ? "bg-background shadow-sm font-medium" : "text-muted-foreground"
            )}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all",
              mode === 'upload' ? "bg-background shadow-sm font-medium" : "text-muted-foreground"
            )}
          >
            Upload
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {mode === 'url' ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="https://images.unsplash.com/..."
                className="pl-9"
                value={value.startsWith('data:') ? '' : value}
                onChange={(e) => {
                  onChange(e.target.value);
                  setPreview(e.target.value);
                }}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleRandom}
              title="Random Placeholder"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors hover:bg-muted/50",
              preview ? "border-primary/50 bg-primary/5" : "border-muted",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {isUploading ? (
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              ) : (
                <Upload className="h-6 w-6 text-primary" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                {isUploading ? "Uploading to Firebase..." : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (Direct to Cloud Storage)</p>
            </div>
          </div>
        )}

        {preview && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={clearImage}
                className="gap-2"
              >
                <X className="h-4 w-4" /> Remove Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

