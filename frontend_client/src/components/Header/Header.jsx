import './Header.css';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Popup from '../Popup/Popup';
import MyEditor from '../PhotoEditor/MyEditor';

function Header() {
  const [userName, setUserName] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [editProfilePic, setEditProfilePic] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  const fetchProfilePic = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        // Fetch image reference from main 
        const docRef = doc(db, 'users', user.uid, 'profilePicture', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { profilePictureURL } = docSnap.data();
          setProfilePictureURL(profilePictureURL); // Set the state with the fetched URL
        } else {
          console.log("No such document for profile picture!");
        }
      } catch (error) {
        console.error("Error fetching profile picture: ", error);
      }
    }
  };

  // Open the popup to edit the profile picture
  const triggerProfileEditor = () => {
    setEditProfilePic(true); 
  };

  const closePopup = () => {
    setEditProfilePic(false); // Close the popup
  };

  // called when profile pic updates 
  const handleProfileUpdate = (newProfilePictureURL) => {
    setProfilePictureURL(newProfilePictureURL); // updates the profile url 
    closePopup(); // closes the popup 
  };

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUserName(user.displayName); // Set the username
      fetchProfilePic(); // Fetch profile picture
    } else {
      setUserName('Guest');
    }
  }, []); 

  return (
    <div className="journal-header">
      {/* Display profile picture if it exists */}
      <div onClick={triggerProfileEditor}>
        {profilePictureURL ? (
          <img src={profilePictureURL} alt="Profile" className="profile-picture" />
        ) : (
          <img src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg?w=360" alt="Default Profile" />
        )}
      </div>

      <p>Welcome {userName}!</p>

      {/* Render the Popup when editing profile picture */}
      {editProfilePic && (
        <Popup
          isOpen={editProfilePic}
          onClose={closePopup}
          title="Edit Profile Picture"
  
          message={<MyEditor onProfileUpdate={handleProfileUpdate} />} // Pass the callback to MyEditor
        />
      )}
    </div>
  );
}

export default Header;
