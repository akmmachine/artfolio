/**
 * Cloudinary Storage Utility
 * Used for high-quality art and image uploads.
 */

// REPLACE THESE with your actual Cloudinary credentials
const CLOUD_NAME = "dkihytoyz";
const UPLOAD_PRESET = "artfolio_data";

/**
 * Uploads an image to Cloudinary and returns the secure URL
 * @param file The file object from an input element
 * @param onProgress Callback function that receives the percentage (0-100)
 */
export const uploadImage = async (
  file: File,
  _path?: string, // Not used for Cloudinary unsigned
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, true);

    // Track progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(percentage);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        const error = JSON.parse(xhr.responseText);
        console.error('Cloudinary Error:', error);
        reject(new Error(error.error?.message || 'Upload to Cloudinary failed'));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during Cloudinary upload'));
    };

    xhr.send(formData);
  });
};
