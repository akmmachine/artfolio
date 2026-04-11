import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, PenTool, Monitor } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Home: React.FC = () => {
  const { artPieces, profile } = useData();
  const featuredArt = artPieces.slice(0, 4);
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-8">
              {profile?.homeHeading || (
                <>Capturing <span className="text-primary italic">Emotion</span> Through Every Stroke.</>
              )}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              {profile?.homeSubtext || "A multidisciplinary artist specializing in traditional painting, digital illustration, and expressive sketches."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full gap-2 w-full sm:w-auto" render={<Link to="/portfolio" />}>
                View Portfolio <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto" render={<Link to="/contact" />}>
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/2 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Palette, title: 'Painting', desc: 'Oil and watercolor explorations of light and shadow.' },
            { icon: PenTool, title: 'Drawing', desc: 'Intricate charcoal and ink sketches capturing raw moments.' },
            { icon: Monitor, title: 'Digital Art', desc: 'Modern illustrations blending technology with classic techniques.' },
          ].map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <cat.icon className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-2xl font-display font-bold mb-3">{cat.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Art Preview */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Works</h2>
            <p className="text-muted-foreground">A selection of my most recent and impactful pieces.</p>
          </div>
          <Button variant="ghost" className="w-fit gap-2" render={<Link to="/portfolio" />}>
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredArt.map((art, i) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden bg-muted group"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
