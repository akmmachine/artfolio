import React, { useState } from 'react';
import { ArtPiece } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Calendar, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';

interface GalleryProps {
  items: ArtPiece[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<ArtPiece | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <motion.div
          key={item.id}
          layoutId={`art-${item.id}`}
          className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-muted cursor-pointer"
          onClick={() => setSelectedItem(item)}
          whileHover={{ y: -5 }}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <Badge className="w-fit mb-2 uppercase tracking-wider text-[10px]">
              {item.category}
            </Badge>
            <h3 className="text-xl font-display font-bold text-white mb-1">{item.title}</h3>
            <p className="text-white/70 text-sm line-clamp-2">{item.description}</p>
          </div>
        </motion.div>
      ))}

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-none">
          {selectedItem && (
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-hidden">
              <div className="w-full lg:flex-1 bg-black flex items-center justify-center overflow-hidden relative group min-h-[300px] lg:min-h-0">
                <img
                  src={selectedItem.highResUrl}
                  alt={selectedItem.title}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge variant="secondary" className="gap-1">
                    <Maximize2 className="h-3 w-3" /> High Res
                  </Badge>
                </div>
              </div>
              <div className="w-full lg:w-80 p-8 flex flex-col gap-6 overflow-y-auto">
                <div>
                  <Badge className="mb-3 uppercase tracking-widest text-[10px]">
                    {selectedItem.category}
                  </Badge>
                  <h2 className="text-3xl font-display font-bold mb-2">{selectedItem.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {selectedItem.date}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    All rights reserved. Digital reproduction prohibited without permission.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
