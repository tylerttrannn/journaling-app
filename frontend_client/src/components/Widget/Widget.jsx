import "./Widget.css";
import { useNavigate } from "react-router-dom";  


const Widget = ({ title, createdAt, id }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/journal/note/${id}`);  
    };

    return (
        <div className="widget" onClick = {handleClick}>
            <div className="left">
                <span className="title">{title}</span>
                <span className="link">{createdAt !== 'Unknown' ? createdAt.toLocaleString() : 'Unknown'}</span>
            </div>
        </div>
    );
};

export default Widget;
