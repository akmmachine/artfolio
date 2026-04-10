import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

/**
 * Uploads an image to Firebase Storage with progress tracking
 * @param file The file object from an input element
 * @param path The subdirectory in storage (e.g., 'portfolio' or 'blog')
 * @param onProgress Callback function that receives the percentage (0-100)
 */
export const uploadImage = (
  file: File, 
  path: string = 'general',
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Create a unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${Math.random().toString(36).substring(2, 9)}.${extension}`;
    
    // Create a storage reference
    const storageRef = ref(storage, `${path}/${filename}`);

    // Create a resumable upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      }, 
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
