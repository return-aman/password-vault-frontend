import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import VaultDashboard from './Components/VaultDashboard';

const App=()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<VaultDashboard/>} />
      </Routes>
    </Router>
  )
}

export default App;