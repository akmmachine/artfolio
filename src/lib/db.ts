import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  setDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ArtPiece, BlogPost } from '../types';

export const dbService = {
  // --- Art Section ---
  async getAllArt() {
    const artCollection = collection(db, 'artPieces');
    const q = query(artCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ArtPiece));
  },

  async addArt(piece: ArtPiece) {
    // If id is provided, we use it as the document ID, otherwise Firestore generates one
    const artDocRef = piece.id ? doc(db, 'artPieces', piece.id) : doc(collection(db, 'artPieces'));
    const finalPiece = { ...piece, id: artDocRef.id };
    await setDoc(artDocRef, finalPiece);
    return finalPiece;
  },

  async deleteArt(id: string) {
    await deleteDoc(doc(db, 'artPieces', id));
  },

  // --- Profile Section ---
  async getProfile() {
    const docRef = doc(db, 'settings', 'profile');
    const docSnap = await getDocs(query(collection(db, 'settings')));
    const profileDoc = docSnap.docs.find(d => d.id === 'profile');
    return profileDoc ? profileDoc.data() : null;
  },

  async updateProfile(data: any) {
    const docRef = doc(db, 'settings', 'profile');
    await setDoc(docRef, data, { merge: true });
  },

  // --- Blog Section ---
  async getAllPosts() {
    const blogCollection = collection(db, 'blogPosts');
    const q = query(blogCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  },

  async addPost(post: BlogPost) {
    const blogDocRef = post.id ? doc(db, 'blogPosts', post.id) : doc(collection(db, 'blogPosts'));
    const finalPost = { ...post, id: blogDocRef.id };
    await setDoc(blogDocRef, finalPost);
    return finalPost;
  },

  async deletePost(id: string) {
    await deleteDoc(doc(db, 'blogPosts', id));
  }
};
