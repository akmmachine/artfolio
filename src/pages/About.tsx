import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../components/ui/badge';
import profileImage from '../assets/Pablo_picasso_1.jpg.webp';

export const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="aspect-square rounded-full overflow-hidden border-8 border-muted/50 max-w-md mx-auto relative z-10 shadow-2xl">
            <img
              src={profileImage}
              alt="The Artist"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <Badge className="mb-4 uppercase tracking-widest">About Me</Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
              I believe art is a <span className="text-primary">universal language</span>.
            </h1>
          </div>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Hello! I'm a visual artist and storyteller based in the digital realm. My journey began with a simple pencil and a sketchbook, and it has evolved into a lifelong pursuit of capturing the essence of the world around me.
            </p>
            <p>
              Whether I'm working with traditional oils on canvas or digital brushes on a tablet, my goal remains the same: to evoke emotion and spark curiosity. My work often explores themes of nature, technology, and the human condition.
            </p>
            <p>
              When I'm not in my studio, you can find me writing about my creative process on my blog or exploring new techniques to push the boundaries of my craft.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t">
            <div>
              <h4 className="text-3xl font-display font-bold text-primary">2+</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Years Exp.</p>
            </div>
            <div>
              <h4 className="text-3xl font-display font-bold text-primary">2+</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Artworks</p>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};
