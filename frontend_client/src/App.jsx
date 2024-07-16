import './App.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Notes from './Notes.jsx';
import User from './User.jsx';

function App() {
  return (
    <div className="App">
      <div className="User">
        <User/>
      </div>
      <Header />
      <Notes />
      <Footer />
    </div>
  );
}

export default App;
