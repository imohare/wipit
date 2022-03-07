import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './wipit-logo.png';
import Login from './routes/login-page'


function App() {

  return (
    <Router>
      <div className="App">
        <img src={logo} alt="Logo"/>
        {/* login button that links to login-page */}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;