// FrontPageWidget.jsx
import "./FrontPageWidget.css";

const FrontPageWidget = ({ title, text }) => {
    return (
        <div className="front-page-widget">
            <div className="front-page-widget-content">
                <span className="front-page-widget-title">{title}</span>
                <span className= "front-page-widget-text">{text}</span>
            </div>
        </div>
    );
};

export default FrontPageWidget;
