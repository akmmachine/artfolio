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
        <DialogContent className="max-w-6xl w-[95vw] p-0 overflow-hidden bg-background/80 backdrop-blur-2xl border-none shadow-2xl">
          {selectedItem && (
            <div className="flex flex-col lg:flex-row h-full max-h-[92vh]">
              {/* Image Section */}
              <div className="flex-[3] bg-black/40 flex items-center justify-center overflow-hidden relative group min-h-[400px] lg:min-h-0">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={selectedItem.highResUrl}
                  alt={selectedItem.title}
                  className="max-h-full max-w-full object-contain shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <Badge variant="secondary" className="bg-background/20 backdrop-blur-md border-white/10 text-white gap-2 px-3 py-1 animate-pulse">
                    <Maximize2 className="h-3 w-3" /> High Resolution
                  </Badge>
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 lg:max-w-md p-10 lg:p-14 flex flex-col gap-10 bg-background/40 overflow-y-auto">
                <div className="space-y-6">
                  <Badge className="uppercase tracking-[0.2em] text-[10px] px-4 py-1.5 font-bold">
                    {selectedItem.category}
                  </Badge>
                  
                  <div className="space-y-3">
                    <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight capitalize tracking-tight">
                      {selectedItem.title}
                    </h2>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" /> {selectedItem.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" /> Original Work
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Description</h4>
                  <p className="text-lg text-foreground/80 leading-relaxed font-light">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="pt-10 border-t border-primary/10">
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground italic leading-relaxed text-center">
                      "Art is not what you see, but what you make others see." — All rights reserved. 
                      Digital reproduction prohibited without permission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
