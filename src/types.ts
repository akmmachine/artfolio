export interface ArtPiece {
  id: string;
  title: string;
  category: 'drawing' | 'painting' | 'digital' | 'photography';
  imageUrl: string;
  highResUrl: string;
  description: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export type ThemeColor = 'zinc' | 'rose' | 'blue' | 'green' | 'orange';

export interface ThemeConfig {
  color: ThemeColor;
  mode: 'light' | 'dark';
}
