import React, { useRef, useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import 'react-multi-carousel/lib/styles.css';
import './FrontPage.css';

import FrontPageWidget from './FrontPageWidget.jsx';
import FrontPageVideo from '/Users/tylertran/Desktop/UCI/projects/website/my-react-app/frontend_client/src/assets/frontpage-video.mp4';

function FrontPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.4; // Set custom playback rate
    }
  }, []);

  return (
    <div className="frontpage-container">
      <Header />
      
      <div className="landing-page-content-container">
        <div className="content-section">
          <div className="content-intro"> 
            <h1 className="intro">A Simple Journaling App For Everyday Use</h1>
            <h3 className="text">
              Our journaling app helps you keep track of your thoughts, tasks, and memories all in one place. Write notes, upload images, and stay productive with built-in features like a to-do list and streak tracking.
            </h3>
            <button className="get-started">Get Started</button>

            <div className="video-container"> 
              <video
                width="100%"
                controls
                className="raw-video"
                autoPlay
                muted
                loop
                ref={videoRef}  // Assign ref to video element
              >
                <source src={FrontPageVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="widgets-section">
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

    </div>
  );
}

export default FrontPage;
