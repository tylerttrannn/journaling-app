import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Content from './Content.jsx';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './FrontPage.css';


import ScreenshotImage from '/Users/tylertran/Desktop/UCI/projects/website/my-react-app/frontend_client/src/assets/screenshots/photo1.png';



const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function FrontPage() {
  return (

    <div className="frontpage-container">
      <Header />
      <div className = "frontpage-content-container"> 
        <Content />

      <div className = "carousel-container"> 
        <Carousel responsive={responsive}>
            <div>
            <img 
                src={ScreenshotImage} 
                alt="Image 1" 
                style={{ width: '100%', height: 'auto' }} 
            />
            </div>
            <div>
            <img 
                src="https://via.placeholder.com/300x200?text=Image+2" 
                alt="Image 2" 
                style={{ width: '100%', height: 'auto' }} 
            />
            </div>
            <div>
            <img 
                src="https://via.placeholder.com/300x200?text=Image+3" 
                alt="Image 3" 
                style={{ width: '100%', height: 'auto' }} 
            />
            </div>
            <div>
            <img 
                src="https://via.placeholder.com/300x200?text=Image+4" 
                alt="Image 4" 
                style={{ width: '100%', height: 'auto' }} 
            />
            </div>
        </Carousel>
      </div>





      </div>

    </div>
  );
}

export default FrontPage;
