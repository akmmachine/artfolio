import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { motion } from 'motion/react';

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts, loading } = useData();
  const post = blogPosts.find(p => p.id === id);

  if (loading) return <div className="container mx-auto px-4 py-24 text-center">Loading Post...</div>;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Post Not Found</h2>
        <Button render={<Link to="/blog" />}>
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <Button variant="ghost" className="mb-8 gap-2" render={<Link to="/blog" />}>
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Button>

      <article className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge className="uppercase tracking-widest">{post.category}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" /> {post.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            {post.title}
          </h1>
        </div>

        {post.imageUrl && (
          <div className="aspect-video rounded-3xl overflow-hidden bg-muted">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="markdown-body text-lg leading-relaxed text-muted-foreground">
          <p className="font-bold text-foreground mb-6 text-xl">{post.excerpt}</p>
          <p>{post.content}</p>
          <p className="mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="mt-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="pt-12 border-t mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://picsum.photos/seed/artist/100/100" alt="Author" />
            </div>
            <div>
              <p className="font-bold">The Artist</p>
              <p className="text-sm text-muted-foreground">Visual Artist & Writer</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Share</Button>
            <Button variant="outline" size="sm">Bookmark</Button>
          </div>
        </div>
      </article>
    </motion.div>
  );
};
