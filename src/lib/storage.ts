import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads an image to Firebase Storage and returns the download URL
 * @param file The file object from an input element
 * @param path The subdirectory in storage (e.g., 'portfolio' or 'blog')
 */
export const uploadImage = async (file: File, path: string = 'general'): Promise<string> => {
  if (!file) throw new Error('No file provided');

  // Create a unique filename
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();
  const filename = `${timestamp}-${Math.random().toString(36).substring(2, 9)}.${extension}`;
  
  // Create a storage reference
  const storageRef = ref(storage, `${path}/${filename}`);

  // Upload the file
  await uploadBytes(storageRef, file);

  // Get and return the download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
