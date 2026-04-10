import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { BlogCard } from '../components/BlogCard';
import { Search } from '../components/Search';
import { motion } from 'motion/react';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { blogPosts, loading } = useData();

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, blogPosts]);

  if (loading) return <div className="container mx-auto px-4 py-24 text-center">Loading Blog...</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Thoughts on creativity, technology, and the artistic journey.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <Search 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search blog posts..." 
            />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-xl text-muted-foreground">No blog posts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
