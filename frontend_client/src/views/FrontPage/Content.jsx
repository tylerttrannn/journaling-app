// Content.jsx
import './Content.css';
import Widget from '../../components/Widget/Widget.jsx';

function Content(){
    return(
        <div className="landing-page-content-container">
            <div className="idk">
                <div className="content-intro"> 
                    <h1 className="intro">A Simple Journaling App For Everyday Use</h1>
                    <h3 className="text">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis, iste minima cum qui architecto accusantium distinctio necessitatibus nostrum consectetur quibusdam eos inventore id deleniti numquam aperiam maxime at, debitis fugit soluta ut! Obcaecati porro quibusdam nulla repellendus tenetur quia consectetur.
                    </h3>
                    <button className="get-started">Get Started</button>
                </div>

                <div className="landing-page-widgets-container">
                    <div className="small-widgets"> 
                        <Widget
                            key={1}
                            title="178K"
                            createdAt="asdasda"
                            id={1}
                            disableNavigation={true}
                            className="landing-page-widget"
                        />
                        <Widget
                            key={2}
                            title="werwer"
                            createdAt="asdasd"
                            id={2}
                            disableNavigation={true}
                            className="landing-page-widget"
                        />
                    </div>

                    <div className="large-widget"> 
                        <Widget
                            key={3}
                            title="werwer"
                            createdAt="asdasd"
                            id={3}
                            disableNavigation={true}
                            className="landing-page-widget large"
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
