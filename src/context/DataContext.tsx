import React, { createContext, useContext, useEffect, useState } from 'react';
import { ArtPiece, BlogPost } from '../types';
import { ART_PIECES, BLOG_POSTS } from '../constants';
import { dbService } from '../lib/db';

interface DataContextType {
  artPieces: ArtPiece[];
  blogPosts: BlogPost[];
  profile: any;
  addArtPiece: (piece: Omit<ArtPiece, 'id'>) => Promise<void>;
  updateArtPiece: (piece: ArtPiece) => Promise<void>;
  deleteArtPiece: (id: string) => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (post: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artPieces, setArtPieces] = useState<ArtPiece[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const [savedArt, savedBlog, savedProfile] = await Promise.all([
          dbService.getAllArt(),
          dbService.getAllPosts(),
          dbService.getProfile()
        ]);

        if (savedArt.length > 0) {
          setArtPieces(savedArt);
        } else {
          for (const piece of ART_PIECES) {
            await dbService.addArt(piece);
          }
          setArtPieces(ART_PIECES);
        }

        if (savedBlog.length > 0) {
          setBlogPosts(savedBlog);
        } else {
          for (const post of BLOG_POSTS) {
            await dbService.addPost(post);
          }
          setBlogPosts(BLOG_POSTS);
        }

        setProfile(savedProfile || { 
          name: "Artist Name", 
          bio: "Your bio here...",
          imageUrl: "" 
        });
      } catch (error) {
        console.error('Failed to load data from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  const addArtPiece = async (piece: Omit<ArtPiece, 'id'>) => {
    const newPiece = { ...piece, id: Date.now().toString() } as ArtPiece;
    await dbService.addArt(newPiece);
    setArtPieces(prev => [newPiece, ...prev]);
  };

  const updateArtPiece = async (piece: ArtPiece) => {
    await dbService.addArt(piece);
    setArtPieces(prev => prev.map(p => p.id === piece.id ? piece : p));
  };

  const deleteArtPiece = async (id: string) => {
    await dbService.deleteArt(id);
    setArtPieces(prev => prev.filter(p => p.id !== id));
  };

  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now().toString() } as BlogPost;
    await dbService.addPost(newPost);
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = async (post: BlogPost) => {
    await dbService.addPost(post);
    setBlogPosts(prev => prev.map(p => p.id === post.id ? post : p));
  };

  const deleteBlogPost = async (id: string) => {
    await dbService.deletePost(id);
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const updateProfile = async (data: any) => {
    await dbService.updateProfile(data);
    setProfile(prev => ({ ...prev, ...data }));
  };

  return (
    <DataContext.Provider value={{ 
      artPieces, 
      blogPosts, 
      profile,
      addArtPiece, 
      updateArtPiece,
      deleteArtPiece, 
      addBlogPost, 
      updateBlogPost,
      deleteBlogPost,
      updateProfile,
      loading 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
