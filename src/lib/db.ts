import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ArtPiece, BlogPost } from '../types';

interface PortfolioDB extends DBSchema {
  artPieces: {
    key: string;
    value: ArtPiece;
  };
  blogPosts: {
    key: string;
    value: BlogPost;
  };
}

const DB_NAME = 'portfolio-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<PortfolioDB>>;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<PortfolioDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('artPieces')) {
          db.createObjectStore('artPieces', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('blogPosts')) {
          db.createObjectStore('blogPosts', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
};

export const dbService = {
  async getAllArt() {
    const db = await getDB();
    return db.getAll('artPieces');
  },
  async addArt(piece: ArtPiece) {
    const db = await getDB();
    await db.put('artPieces', piece);
  },
  async deleteArt(id: string) {
    const db = await getDB();
    await db.delete('artPieces', id);
  },
  async getAllPosts() {
    const db = await getDB();
    return db.getAll('blogPosts');
  },
  async addPost(post: BlogPost) {
    const db = await getDB();
    await db.put('blogPosts', post);
  },
  async deletePost(id: string) {
    const db = await getDB();
    await db.delete('blogPosts', id);
  },
  async clearAll() {
    const db = await getDB();
    await db.clear('artPieces');
    await db.clear('blogPosts');
  }
};
