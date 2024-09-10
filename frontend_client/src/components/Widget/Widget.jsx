import "./Widget.css";

const Widget = ({ title, createdAt }) => {
    return (
        <div className="widget">
            <div className="left">
                <span className="title">{title}</span>
                <span className="link">{createdAt !== 'Unknown' ? createdAt.toLocaleString() : 'Unknown'}</span>
            </div>
        </div>
    );
};

export default Widget;
