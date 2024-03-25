import { storAge } from "./fireBaseAuth";
import {ref,uploadBytes,uploadBytesResumable, getDownloadURL} from "firebase/storage"
const uploadImage = (imageBlob) => {
    return new Promise((resolve, reject) => {
        let ImageReference = ref(storAge, `userPics/${localStorage.getItem("id")}`);
        const uploadTask = uploadBytesResumable(ImageReference, imageBlob);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Handle upload state changes if needed
            },
            (error) => {
                reject(error); // Reject the promise with the error
            },
            () => {
                // Handle successful upload
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        
                        resolve(downloadURL); // Resolve the promise with the download URL
                    })
                    .catch((error) => {
                        reject(error); // Reject the promise if getting download URL fails
                    });
            }
        );
    });
};
export {uploadImage}