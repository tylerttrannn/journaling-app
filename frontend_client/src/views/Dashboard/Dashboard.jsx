import './Dashboard.css';
import Widget from '../../components/Widget/Widget.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Todolist from '../../components/Todolist/Todolist.jsx';
import Header from '../../components/Header/Header.jsx';
import { useState, useEffect } from 'react';

// firebase imports
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function Dashboard() {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [recentNotesData, setRecentNotesData] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;
    const database = getFirestore();

    // Fetch the list of recently viewed note IDs
    const fetchRecentNotes = async () => {
        if (user) {
            try {
                const docRef = doc(database, 'users', user.uid, 'viewed', 'viewedDocs');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecentlyViewed(docSnap.data().recentlyViewed || []);
                }
            } catch (error) {
                console.error("An error has occurred:", error);
            }
        }
    };

    // Fetch the actual note details for each recently viewed note
    const fetchNotesDetails = async () => {
        if (user && recentlyViewed.length > 0) {
            const notesData = [];
            for (let i = 0; i < recentlyViewed.length; i++) {
                const noteId = recentlyViewed[i];
                const noteRef = doc(database, 'users', user.uid, 'journal', noteId);
                try {
                    const noteSnapshot = await getDoc(noteRef);

                    if (noteSnapshot.exists()) {
                        const noteData = noteSnapshot.data();
                        notesData.push({
                            id: noteSnapshot.id,
                            title: noteData.title || 'Untitled',   // Fallback to 'Untitled' if no title
                            createdAt: noteData.createdAt ? noteData.createdAt.toDate() : 'Unknown', // Ensure correct date handling
                        });
                    } else {
                        console.error("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching note:", error);
                }
            }
            setRecentNotesData(notesData);
        }
    };

    useEffect(() => {
        fetchRecentNotes();
    }, [user]);

    useEffect(() => {
        if (recentlyViewed.length > 0) {
            fetchNotesDetails();
        }
    }, [recentlyViewed]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <Header />
            <Navbar />

            <div className="widgets-container">
                <h3> Recently Viewed</h3>
                <div className="widgets">
                    {recentNotesData.map((note, index) => (
                        <Widget key={index} title={note.title} createdAt={note.createdAt} />
                    ))}
                </div>
            </div>

            <div className="todo-container">
                <Todolist />
            </div>
        </div>
    );
}

export default Dashboard;
