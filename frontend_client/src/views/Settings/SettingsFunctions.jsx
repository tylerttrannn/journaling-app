import { getAuth, reauthenticateWithCredential, EmailAuthProvider, verifyBeforeUpdateEmail, updatePassword,updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection  } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();
const user = auth.currentUser;


const handleDisplayNameChange = async (newName, closePopup) => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
        if (user) {
            await updateProfile(user, {
                displayName: newName
            });
            console.log("Display name updated successfully!");
            closePopup();
            
        } else {
            console.log("No user is currently signed in.");
        }
    } catch (error) {
        console.log("Failed to change the display name", error);
    }
};


const handleEmailChange = async (newEmail, currentPassword, closePopup) => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
        if (user) {
            // Re-authenticate the user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Send a verification email to the new address
            await verifyBeforeUpdateEmail(user, newEmail);
            console.log("A verification email has been sent to your new email address. Please verify to complete the email change.");
            closePopup();
        } else {
            console.log("No user is currently signed in.");
        }
    } catch (error) {
        console.log("Failed to change the email", error);

        // Handle specific errors
        if (error.code === 'auth/wrong-password') {
            console.log('The password is incorrect.');
        } else if (error.code === 'auth/invalid-email') {
            console.log('The email address is badly formatted.');
        } else if (error.code === 'auth/email-already-in-use') {
            console.log('The email address is already in use by another account.');
        } else if (error.code === 'auth/requires-recent-login') {
            console.log('Please sign in again to update your email.');
        } else if (error.code === 'auth/operation-not-allowed') {
            console.log('Email/password accounts are not enabled. Please enable them in your Firebase console.');
        } else {
            console.log('An unknown error occurred:', error.message);
        }
    }
};


const handlePasswordChange = async (currentPassword, newPassword, closePopup) => {

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    try{
        updatePassword(user, newPassword);
        closePopup();
    }

    catch(error){
        console.log("Failed to change the password")
    }

}

const handleDelete = async (currentPassword) => {

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    try { 
        user.delete()
        console.log("User sucessfully deleted!")
    }
    catch (error){
        console.log("Failed to delete the user", error);
    }

}

const handleTheme = async (theme) => {
    switch (theme) {
        case 'Light':
            document.body.classList.remove('darkmode');  // Remove the dark mode class
            console.log("Light mode activated");
            break;

        case 'Dark':
            document.body.classList.add('darkmode');  // Add the dark mode class
            console.log("Dark mode activated");
            break;

        default:
            console.log("Unknown theme");
            break;
    }
};



/* based on the action passed in it the handeClick fucntion preps for the appropiate content for the popup 
the handleClick function passes the data to the openPopup function back in the Settings.jsx file */

export const handleClick = (action, openPopup, closePopup) => {
    console.log(`Action clicked: ${action}`);
    switch (action) {
        case 'changeName':
            openPopup({
                title: "Change Name",
                message: "Please enter your preferred name.",
                actions: [
                    { 
                        label: 'Confirm', 
                        // this works as in the popup function we call the onClick function and pass in the input values
                        // which is what we're accessing now 
                        onClick: (inputValues) => handleDisplayNameChange(inputValues['0'], closePopup)
                    },
                    { label: 'Cancel', onClick: () => closePopup() }
                ],
                textFields: [
                    { label: "New Name" }
                ]
            });
            break;


        case 'changeEmail':
            openPopup({
                title: "Change Email",
                message: "Please enter your new email and current password.",
                actions: [
                    { 
                        label: 'Confirm', 
                        onClick: (inputValues) => handleEmailChange(inputValues['0'], inputValues['1'], closePopup) // Pass new email and current password
                    },
                    { label: 'Cancel', onClick: () => closePopup() }
                ],
                textFields:[
                    { label: "New Email" },
                    { label: "Current Password", type: "password" } // Add type to render password input
                ]
            });
            break;
        

        case 'setPassword':
            openPopup({
                title: "Set Password",
                message: "Please enter your new password.",
                actions: [
                    { label: 'Confirm',
                         onClick: (inputValues) => handlePasswordChange(inputValues['0'], inputValues['1'], closePopup)},
                    { label: 'Cancel', onClick: () => closePopup() }
                ],
                textFields: [
                    {label: "Enter current password", type: "password" }, {label: "Enter new password", type: "password"}, {label: "Confirm new password", type: "password"}
                ]
            });
            break;


        case 'setVerification':
            openPopup({
                title: "2-Step Verification",
                message: "Please enter your new password.",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Password set') },
                    { label: 'Cancel', onClick: () => closePopup() }
                ]
            });
            break;

        case 'deleteAccount':
            openPopup({
                title: "Delete Account",
                message: "Are you sure you want to delete your account?",
                actions: [
                    // TODO under certain conditions it wont delete, maybe needs to clear
                    { label: 'Confirm', onClick: (inputValues) => handleDelete(inputValues['1']) },
                    { label: 'Cancel', onClick: () => closePopup() }
                ],
                textFields: [
                    {label: "Type in your password to confirm", type: "password" }
                ]
            });
            break;
        
        case 'logoutAll':
            openPopup({
                title: "Logout out of all devices?",
                message: "All devices will need to login again",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Password set') },
                    { label: 'Cancel', onClick: () => closePopup() }
                ]
            });
            break;

        case 'setAppearance':
            openPopup({
                title: "Select which theme you would like",
                actions: [
                    { label: 'Light', onClick: () => handleTheme('Light') },
                    { label: 'Dark', onClick: () => handleTheme('Dark') }
                ]
            });
            break;
            


        // Add other cases for different actions

        default:
            console.log(`No handler for action: ${action}`);
    }
};
