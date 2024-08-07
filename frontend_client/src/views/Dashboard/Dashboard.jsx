import './Dashboard.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Notes from './Notes.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
function Dashboard() {
  return (
    <div className="Dashboard">
      <Navbar />
      <Footer/>
    </div>
  );
}

export default Dashboard;
