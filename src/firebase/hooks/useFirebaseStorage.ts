import { useState, useCallback } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

/**
 * A custom hook for uploading and deleting files in Firebase Storage.
 *
 * This hook provides functions to upload a file and delete a file from Firebase Storage.
 * It also returns the state of the upload process, such as the progress percentage and the download URL of the uploaded file.
 *
 * @returns {{
 *   uploadFile: (file: File, path: string) => Promise<string>,
 *   deleteFile: (filePath: string) => Promise<void>,
 *   progress: number,
 *   error: string | null
 * }}
 */
export const useFirebaseStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Uploads a file to Firebase Storage and returns the download URL.
   *
   * @param {File} file - The file to upload.
   * @param {string} path - The storage path where the file should be uploaded.
   * @returns {Promise<string>} - A promise that resolves with the download URL of the uploaded file.
   */
  const uploadFile = useCallback(async (file: File, path: string): Promise<string> => {
    setError(null);
    setProgress(0);

    const storage = getStorage();
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          setError(error.message);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            setError((error as Error).message);
            reject(error);
          }
        },
      );
    });
  }, []);

  /**
   * Deletes a file from Firebase Storage.
   *
   * @param {string} filePath - The storage path of the file to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the file is deleted.
   */
  const deleteFile = useCallback(async (filePath: string): Promise<void> => {
    setError(null);

    const storage = getStorage();
    const fileRef = ref(storage, filePath);

    try {
      await deleteObject(fileRef);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  }, []);

  return {
    uploadFile,
    deleteFile,
    progress,
    error,
  };
};
