import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Navigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { ArtPiece, BlogPost } from '../../types';
import { 
  Plus, 
  Trash2, 
  LogOut, 
  Image as ImageIcon, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  ExternalLink,
  ChevronRight,
  Search,
  PlusCircle,
  Pencil
} from 'lucide-react';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

type DashboardView = 'overview' | 'art' | 'blog';

export const AdminDashboard: React.FC = () => {
  const { isAdmin, loading, logout } = useAuth();
  const { 
    artPieces, 
    blogPosts, 
    addArtPiece, 
    updateArtPiece,
    deleteArtPiece, 
    addBlogPost, 
    updateBlogPost,
    deleteBlogPost 
  } = useData();
  const [activeView, setActiveView] = useState<DashboardView>('overview');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [artForm, setArtForm] = useState<Partial<ArtPiece>>({ category: 'painting' });
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({ category: 'General' });
  const [error, setError] = useState<string | null>(null);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-medium">Initializing Dashboard...</p>
      </div>
    </div>
  );
  
  if (!isAdmin) return <Navigate to="/login" />;

  const handleAddArt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artForm.imageUrl) {
      setError('Please upload or provide a URL for the artwork image.');
      return;
    }
    setError(null);
    
    if (editingId) {
      await updateArtPiece({ ...artForm, id: editingId } as ArtPiece);
    } else {
      await addArtPiece(artForm as Omit<ArtPiece, 'id'>);
    }
    
    setArtForm({ category: 'painting' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.imageUrl) {
      setError('Please upload or provide a URL for the blog cover image.');
      return;
    }
    setError(null);

    if (editingId) {
      await updateBlogPost({ ...blogForm, id: editingId } as BlogPost);
    } else {
      await addBlogPost(blogForm as Omit<BlogPost, 'id'>);
    }

    setBlogForm({ category: 'General' });
    setIsAdding(false);
    setEditingId(null);
  };

  const startEditingArt = (art: ArtPiece) => {
    setArtForm(art);
    setEditingId(art.id);
    setIsAdding(true);
  };

  const startEditingBlog = (post: BlogPost) => {
    setBlogForm(post);
    setEditingId(post.id);
    setIsAdding(true);
  };

  const cancelEditing = () => {
    setIsAdding(false);
    setEditingId(null);
    setArtForm({ category: 'painting' });
    setBlogForm({ category: 'General' });
    setError(null);
  };

  const SidebarItem = ({ view, icon: Icon, label }: { view: DashboardView, icon: any, label: string }) => (
    <button
      onClick={() => {
        setActiveView(view);
        cancelEditing();
      }}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        activeView === view 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className={cn("h-5 w-5", activeView === view ? "" : "group-hover:scale-110 transition-transform")} />
      <span className="font-medium">{label}</span>
      {activeView === view && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0A0A0A] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-background border-r p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            A
          </div>
          <div>
            <h2 className="font-display font-bold text-lg leading-none">Admin Panel</h2>
            <p className="text-xs text-muted-foreground mt-1">v1.0.5 • IndexedDB Storage</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem view="overview" icon={LayoutDashboard} label="Overview" />
          <SidebarItem view="art" icon={ImageIcon} label="Art Portfolio" />
          <SidebarItem view="blog" icon={FileText} label="Blog Posts" />
          
          <div className="mt-8 pt-8 border-t space-y-2">
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Quick Actions</p>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              onClick={() => window.open('/', '_blank')}
            >
              <ExternalLink className="h-4 w-4" /> View Site
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </nav>

        <div className="p-4 bg-muted/30 rounded-2xl">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your data is stored in your browser's IndexedDB. This allows for larger image storage than standard local storage.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-display font-bold capitalize">{activeView}</h1>
              <p className="text-muted-foreground">
                {activeView === 'overview' && "Welcome back! Here's what's happening with your portfolio."}
                {activeView === 'art' && "Manage your gallery and upload new masterpieces."}
                {activeView === 'blog' && "Write and organize your thoughts and stories."}
              </p>
            </div>
            {activeView !== 'overview' && !isAdding && (
              <Button onClick={() => setIsAdding(true)} className="rounded-full h-12 px-6 gap-2 shadow-lg shadow-primary/20">
                <PlusCircle className="h-5 w-5" /> Add New {activeView === 'art' ? 'Art' : 'Post'}
              </Button>
            )}
            {isAdding && (
              <Button variant="outline" onClick={cancelEditing} className="rounded-full h-12 px-6">
                Cancel {editingId ? 'Editing' : 'Adding'}
              </Button>
            )}
          </header>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl text-sm font-medium flex items-center justify-between"
            >
              {error}
              <button onClick={() => setError(null)} className="hover:bg-destructive/10 p-1 rounded-md">
                <Plus className="h-4 w-4 rotate-45" />
              </button>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {/* Overview View */}
            {activeView === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-background p-8 rounded-3xl border shadow-sm space-y-2">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Artworks</p>
                    <h3 className="text-5xl font-display font-bold text-primary">{artPieces.length}</h3>
                    <div className="flex items-center gap-2 text-xs text-green-500 font-medium">
                      <ChevronRight className="h-3 w-3" /> Active in Gallery
                    </div>
                  </div>
                  <div className="bg-background p-8 rounded-3xl border shadow-sm space-y-2">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Blog Posts</p>
                    <h3 className="text-5xl font-display font-bold text-primary">{blogPosts.length}</h3>
                    <div className="flex items-center gap-2 text-xs text-blue-500 font-medium">
                      <ChevronRight className="h-3 w-3" /> Published Online
                    </div>
                  </div>
                  <div className="bg-background p-8 rounded-3xl border shadow-sm space-y-2">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Storage Usage</p>
                    <h3 className="text-5xl font-display font-bold text-primary">~{Math.round(JSON.stringify(artPieces).length / 1024)}KB</h3>
                    <div className="flex items-center gap-2 text-xs text-orange-500 font-medium">
                      <ChevronRight className="h-3 w-3" /> Browser IndexedDB
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-background p-8 rounded-3xl border shadow-sm space-y-6">
                    <h4 className="font-bold text-xl">Recent Artworks</h4>
                    <div className="space-y-4">
                      {artPieces.slice(0, 3).map(art => (
                        <div key={art.id} className="flex items-center gap-4 p-3 hover:bg-muted/30 rounded-2xl transition-colors group">
                          <img src={art.imageUrl} className="w-12 h-12 rounded-xl object-cover" />
                          <div className="flex-1 cursor-pointer" onClick={() => startEditingArt(art)}>
                            <p className="font-bold text-sm">{art.title}</p>
                            <p className="text-xs text-muted-foreground">{art.category}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => startEditingArt(art)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive" onClick={() => deleteArtPiece(art.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {artPieces.length === 0 && <p className="text-sm text-muted-foreground italic">No artworks yet.</p>}
                    </div>
                    <Button variant="link" onClick={() => setActiveView('art')} className="p-0 h-auto text-primary">View all portfolio</Button>
                  </div>

                  <div className="bg-background p-8 rounded-3xl border shadow-sm space-y-6">
                    <h4 className="font-bold text-xl">Latest Posts</h4>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map(post => (
                        <div key={post.id} className="flex items-center gap-4 p-3 hover:bg-muted/30 rounded-2xl transition-colors group">
                          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 cursor-pointer" onClick={() => startEditingBlog(post)}>
                            <p className="font-bold text-sm truncate">{post.title}</p>
                            <p className="text-xs text-muted-foreground">{post.date}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => startEditingBlog(post)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive" onClick={() => deleteBlogPost(post.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {blogPosts.length === 0 && <p className="text-sm text-muted-foreground italic">No posts yet.</p>}
                    </div>
                    <Button variant="link" onClick={() => setActiveView('blog')} className="p-0 h-auto text-primary">View all blog posts</Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Art View */}
            {activeView === 'art' && (
              <motion.div
                key="art"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {isAdding ? (
                  <div className="bg-background p-8 lg:p-12 rounded-[2.5rem] border shadow-xl max-w-2xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-display font-bold">{editingId ? 'Edit Artwork' : 'New Artwork'}</h3>
                      <Button variant="ghost" size="icon" onClick={cancelEditing} className="rounded-full">
                        <Plus className="h-5 w-5 rotate-45" />
                      </Button>
                    </div>
                    <form onSubmit={handleAddArt} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input 
                            required 
                            placeholder="Starry Night..."
                            value={artForm.title || ''} 
                            onChange={e => setArtForm({...artForm, title: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <select 
                            className="w-full h-10 px-3 rounded-md bg-background border outline-none focus:ring-2 ring-primary/20"
                            value={artForm.category}
                            onChange={e => setArtForm({...artForm, category: e.target.value as any})}
                          >
                            <option value="painting">Painting</option>
                            <option value="drawing">Drawing</option>
                            <option value="digital">Digital</option>
                            <option value="photography">Photography</option>
                          </select>
                        </div>
                      </div>
                      <ImageUploader 
                        label="Artwork Image"
                        value={artForm.imageUrl || ''} 
                        onChange={url => setArtForm({...artForm, imageUrl: url, highResUrl: url})} 
                      />
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input 
                          type="date" 
                          required 
                          value={artForm.date || ''} 
                          onChange={e => setArtForm({...artForm, date: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea 
                          required 
                          placeholder="Tell the story behind this piece..."
                          className="min-h-[120px]"
                          value={artForm.description || ''} 
                          onChange={e => setArtForm({...artForm, description: e.target.value})} 
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={cancelEditing} className="flex-1 h-12 rounded-xl">Cancel</Button>
                        <Button type="submit" className="flex-1 h-12 rounded-xl">{editingId ? 'Update Artwork' : 'Upload Artwork'}</Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artPieces.map(item => (
                      <div key={item.id} className="bg-background group rounded-3xl border overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="aspect-[4/3] relative overflow-hidden cursor-pointer" onClick={() => startEditingArt(item)}>
                          <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <Button 
                              variant="secondary" 
                              size="icon" 
                              className="rounded-full shadow-lg"
                              onClick={() => startEditingArt(item)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="rounded-full shadow-lg"
                              onClick={() => deleteArtPiece(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-6 space-y-2 cursor-pointer" onClick={() => startEditingArt(item)}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">{item.category}</span>
                            <span className="text-xs text-muted-foreground">{item.date}</span>
                          </div>
                          <h4 className="font-bold text-lg truncate">{item.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                    {artPieces.length === 0 && (
                      <div className="col-span-full py-24 text-center space-y-4">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                          <ImageIcon className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">No artworks in your portfolio yet.</p>
                        <Button onClick={() => setIsAdding(true)} variant="outline">Add your first piece</Button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Blog View */}
            {activeView === 'blog' && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {isAdding ? (
                  <div className="bg-background p-8 lg:p-12 rounded-[2.5rem] border shadow-xl max-w-3xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-display font-bold">{editingId ? 'Edit Blog Post' : 'New Blog Post'}</h3>
                      <Button variant="ghost" size="icon" onClick={cancelEditing} className="rounded-full">
                        <Plus className="h-5 w-5 rotate-45" />
                      </Button>
                    </div>
                    <form onSubmit={handleAddBlog} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input 
                            required 
                            placeholder="The creative process..."
                            value={blogForm.title || ''} 
                            onChange={e => setBlogForm({...blogForm, title: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Input 
                            required 
                            placeholder="Art, Process, Tech..."
                            value={blogForm.category || ''} 
                            onChange={e => setBlogForm({...blogForm, category: e.target.value})} 
                          />
                        </div>
                      </div>
                      <ImageUploader 
                        label="Post Cover Image"
                        value={blogForm.imageUrl || ''} 
                        onChange={url => setBlogForm({...blogForm, imageUrl: url})} 
                      />
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input 
                          type="date" 
                          required 
                          value={blogForm.date || ''} 
                          onChange={e => setBlogForm({...blogForm, date: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Excerpt</Label>
                        <Textarea 
                          required 
                          placeholder="A short summary for the card..."
                          value={blogForm.excerpt || ''} 
                          onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Content (Markdown)</Label>
                        <Textarea 
                          required 
                          className="min-h-[300px] font-mono text-sm"
                          placeholder="# Write your story here..."
                          value={blogForm.content || ''} 
                          onChange={e => setBlogForm({...blogForm, content: e.target.value})} 
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={cancelEditing} className="flex-1 h-12 rounded-xl">Cancel</Button>
                        <Button type="submit" className="flex-1 h-12 rounded-xl">{editingId ? 'Update Post' : 'Publish Post'}</Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.map(post => (
                      <div key={post.id} className="bg-background p-6 rounded-3xl border flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => startEditingBlog(post)}>
                        {post.imageUrl && (
                          <img src={post.imageUrl} className="w-full md:w-32 h-32 rounded-2xl object-cover" />
                        )}
                        <div className="flex-1 min-w-0 text-center md:text-left">
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">{post.category}</span>
                            <span className="text-xs text-muted-foreground">{post.date}</span>
                          </div>
                          <h4 className="font-bold text-xl truncate">{post.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full hover:bg-muted"
                            onClick={() => startEditingBlog(post)}
                          >
                            <Pencil className="h-5 w-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full text-destructive hover:bg-destructive/10"
                            onClick={() => deleteBlogPost(post.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {blogPosts.length === 0 && (
                      <div className="py-24 text-center space-y-4">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                          <FileText className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">No blog posts published yet.</p>
                        <Button onClick={() => setIsAdding(true)} variant="outline">Write your first post</Button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
