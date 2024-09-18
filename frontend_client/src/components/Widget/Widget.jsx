// Widget.jsx
import "./Widget.css";
import { useNavigate } from "react-router-dom";  

const Widget = ({ title, createdAt, id, disableNavigation = false, className }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (!disableNavigation) {
            navigate(`/journal/note/${id}`);  
        }
    };

    return (
        <div
            // keeping it optional so that dashboard code works okay
            className={`widget ${className || ''}`}
            onClick={disableNavigation ? null : handleClick}
            style={{ cursor: disableNavigation ? 'default' : 'pointer' }}
        >
            <div className="left">
                <span className="title">{title}</span>
                <span className="link">
                    {createdAt !== 'Unknown' ? createdAt.toLocaleString() : 'Unknown'}
                </span>
            </div>
        </div>
    );
};

export default Widget;
