import React, { useState, useMemo } from 'react';
import { Gallery } from '../components/Gallery';
import { Search } from '../components/Search';
import { useData } from '../context/DataContext';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'motion/react';

export const Portfolio: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { artPieces, loading } = useData();

  const filteredItems = useMemo(() => {
    return artPieces.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, artPieces]);

  if (loading) return <div className="container mx-auto px-4 py-24 text-center">Loading Gallery...</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Portfolio</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Explore my collection of paintings, drawings, and digital artworks. Click on any piece to view it in high resolution.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <Search 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search art pieces..." 
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
              <TabsList className="bg-muted/50 p-1 rounded-full h-12 inline-flex min-w-max">
                <TabsTrigger value="all" className="rounded-full px-6 md:px-8 h-10">All Works</TabsTrigger>
                <TabsTrigger value="painting" className="rounded-full px-6 md:px-8 h-10">Painting</TabsTrigger>
                <TabsTrigger value="drawing" className="rounded-full px-6 md:px-8 h-10">Drawing</TabsTrigger>
                <TabsTrigger value="digital" className="rounded-full px-6 md:px-8 h-10">Digital</TabsTrigger>
                <TabsTrigger value="photography" className="rounded-full px-6 md:px-8 h-10">Photography</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          {filteredItems.length > 0 ? (
            <Gallery items={filteredItems} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="text-xl text-muted-foreground">No art pieces found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
