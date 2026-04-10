import React from 'react';
import { BlogPost } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden border-none bg-muted/30 hover:bg-muted/50 transition-colors group">
      {post.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-[10px] uppercase tracking-widest">
            {post.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" /> {post.date}
          </span>
        </div>
        <h3 className="text-2xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h3>
      </CardHeader>
      <CardContent className="p-6 pt-2">
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="link" className="p-0 h-auto gap-2 group/btn" render={<Link to={`/blog/${post.id}`} />}>
          Read More <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};
