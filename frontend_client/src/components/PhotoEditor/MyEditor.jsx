import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import './MyEditor.css';
import { getAuth } from "firebase/auth";

function MyEditor({ onProfileUpdate }) {  
  const [image, setImage] = useState(null);
  const editorRef = useRef(null);
  const storage = getStorage();
  const db = getFirestore();
  const auth = getAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const imageData = canvas.toDataURL(); 
  
      const user = auth.currentUser;
      const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
  
      await uploadString(storageRef, imageData, 'data_url');
  
      const downloadURL = await getDownloadURL(storageRef);
  
      await setDoc(doc(db, 'users', user.uid, 'profilePicture', 'main'), {
        profilePictureURL: downloadURL,
      });

      // Trigger the callback to notify the parent component to let it rerender
      if (onProfileUpdate) {
        onProfileUpdate(downloadURL);
      }

      console.log('Image uploaded and URL saved!');
    }
  };

  return (
    <div className="editor-container">
      <div className="file-input-container">
        <label className="file-input-label">
          Choose File
          <input 
            type="file" 
            onChange={handleImageChange} 
            className="file-input" 
          />
        </label>
      </div>
      {image && (
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={250}
          height={250}
          border={50}
          borderRadius={125}
          color={[255, 255, 255, 0.6]}
          scale={1.2}
        />
      )}
      <button onClick={handleSave}>Upload and Save</button>
    </div>
  );
}

export default MyEditor;
