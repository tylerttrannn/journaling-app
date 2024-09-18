import './Content.css';
import FrontPageWidget from './FrontPageWidget.jsx';

function Content() {
    return (
        <div className="landing-page-content-container">
            <div className="idk">
                <div className="content-intro"> 
                    <h1 className="intro">A Simple Journaling App For Everyday Use</h1>
                    <h3 className="text">
                        Our journaling app helps you keep track of your thoughts, tasks, and memories all in one place. Write notes, upload images, and stay productive with built-in features like a to-do list and streak tracking.
                    </h3>
                    <button className="get-started">Get Started</button>
                </div>

                <div className="landing-page-widgets-container">
                    <div className="small-widgets"> 
                        <FrontPageWidget 
                            title="Write Notes" 
                            text="Easily create and organize your notes. Capture your thoughts and ideas, and attach images to your entries." 
                        />
                        <FrontPageWidget 
                            title="Track Your Streak" 
                            text="Stay motivated with a streak feature that keeps track of your daily journaling habits." 
                        />
                    </div>

                    <div className="large-widget"> 
                        <FrontPageWidget 
                            title="Manage Tasks" 
                            text="Stay productive with a built-in to-do list. Add, organize, and track your tasks alongside your notes for a seamless experience." 
                        />
                    </div>
                </div>
            </div>

            <div className="landing-page-image">
                {/* INSERT IMAGE HERE LATER */}
            </div>
        </div>
    );
}

export default Content;
