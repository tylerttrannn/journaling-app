import { getAuth, createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection  } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();


const handleDisplayNameChange = async (newName) => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
        if (user) {
            await updateProfile(user, {
                displayName: newName
            });
            console.log("Display name updated successfully!");
        } else {
            console.log("No user is currently signed in.");
        }
    } catch (error) {
        console.log("Failed to change the display name", error);
    }
};


/* based on the action passed in it the handeClick fucntion preps for the appropiate content for the popup 
the handleClick function passes the data to the openPopup function back in the Settings.jsx file */

export const handleClick = (action, openPopup) => {
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
                        onClick: (inputValues) => handleDisplayNameChange(inputValues['0'])
                    },
                    { label: 'Cancel', onClick: () => console.log('Cancelled') }
                ],
                textFields: [
                    { label: "New Name" }
                ]
            });
            break;


        case 'changeEmail':
            openPopup({
                title: "Change Email",
                message: "Please enter your new email.",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Email changed') },
                    { label: 'Cancel', onClick: () => console.log('Cancelled') }
                ],
                textFields:[
                    {label: "New Email"}
                ]
                
            });
            break;

        case 'setPassword':
            openPopup({
                title: "Set Password",
                message: "Please enter your new password.",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Password set') },
                    { label: 'Cancel', onClick: () => console.log('Cancelled') }
                ],
                textFields: [
                    {label: "Enter current password" }, {label: "Enter new password"}, {label: "Confirm new password"}
                ]
            });
            break;

        case 'setVerification':
            openPopup({
                title: "2-Step Verification",
                message: "Please enter your new password.",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Password set') },
                    { label: 'Cancel', onClick: () => console.log('Cancelled') }
                ]
            });
            break;

        case 'deleteAccount':
            openPopup({
                title: "Delete Account",
                message: "Are you sure you want to delete your account?",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Password set') },
                    { label: 'Cancel', onClick: () => console.log('Cancelled') }
                ]
            });
            break;
        
        case 'logoutAll':
            openPopup({
                title: "Logout out of all devices?",
                message: "All devices will need to login again",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Password set') },
                    { label: 'Cancel', onClick: () => console.log('Cancelled') }
                ]
            });
            break;

        case 'setAppearance':
            openPopup({
                title: "Logout out of all devices?",
                message: "All devices will need to login again",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Password set') },
                    { label: 'Cancel', onClick: () => console.log('Cancelled') }
                ]
            });
            break;


        // Add other cases for different actions

        default:
            console.log(`No handler for action: ${action}`);
    }
};
