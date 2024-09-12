/* based on the action passed in it the handeClick fucntion preps for the appropiate content for the popup 
the handleClick function passes the data to the openPopup function back in the Settings.jsx file */

export const handleClick = (action, openPopup) => {
    console.log(`Action clicked: ${action}`);
    switch (action) {

        case 'changeName':
            openPopup({
                title: "Change Name",
                message: "Please enter your prefered name.",
                actions: [
                    { label: 'Confirm', onClick: () => console.log('Email changed') },
                    { label: 'Cancel', onClick: () => console.log('Cancelled') }
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
