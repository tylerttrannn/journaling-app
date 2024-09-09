import './Dashboard.css';
import Widget from '../../components/Widget/Widget.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

function Dashboard() { 
    return (
        <div className="dashboard">
            <h1> Good Afternoon, Insert Name</h1>
            <Navbar />

            <div className="widgets-container">
                <h3> Quick Actions</h3>
                <div className="widgets">
                    <Widget />
                    <Widget />
                    <Widget />
                    <Widget />
                </div>
            </div>

            <div className="widgets-container">
                <h3> Recently Viewed</h3>
                <div className="widgets">
                    <Widget />
                    <Widget />
                    <Widget />
                    <Widget />
                </div>
            </div>


            <div className = "todo-container">
                <h3> To-Do List</h3>


            </div>


        </div>
    );
}

export default Dashboard;
