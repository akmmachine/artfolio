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
        <DialogContent className="max-w-[90vw] lg:max-w-7xl w-full p-0 overflow-hidden bg-background/80 backdrop-blur-2xl border-none shadow-2xl rounded-[2.5rem]">
          {selectedItem && (
            <div className="flex flex-col lg:flex-row h-full max-h-[85vh]">
              {/* Image Section (80%) */}
              <div className="flex-[4] bg-black/20 flex items-center justify-center overflow-hidden relative group min-h-[300px] lg:min-h-0 border-r border-white/5">
                <motion.img
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={selectedItem.highResUrl}
                  alt={selectedItem.title}
                  className="max-h-full max-w-full object-contain p-4 transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8">
                  <Badge variant="secondary" className="bg-black/40 backdrop-blur-md border border-white/10 text-white gap-2 px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase">
                    <Maximize2 className="h-3 w-3" /> High Resolution
                  </Badge>
                </div>
              </div>

              {/* Details Section (20%) */}
              <div className="flex-1 lg:max-w-[320px] p-8 lg:p-10 flex flex-col gap-8 bg-background/20 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  <Badge className="uppercase tracking-[0.2em] text-[9px] px-3 py-1 font-bold rounded-full">
                    {selectedItem.category}
                  </Badge>
                  
                  <div className="space-y-4">
                    <h2 className="text-3xl font-display font-bold leading-tight capitalize">
                      {selectedItem.title}
                    </h2>
                    <div className="flex flex-col gap-3 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-primary" /> {selectedItem.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Tag className="h-3.5 w-3.5 text-primary" /> Original work
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">Description</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed font-light">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <p className="text-[10px] text-muted-foreground/60 italic text-center leading-relaxed">
                    Digital reproduction prohibited without permission.
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
