import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Upload, Link as LinkIcon, Shuffle, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, label = "Image" }) => {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(base64String);
      };
      reader.readAsDataURL(file);
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
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors hover:bg-muted/50",
              preview ? "border-primary/50 bg-primary/5" : "border-muted"
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (max. 2MB recommended for local storage)</p>
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
