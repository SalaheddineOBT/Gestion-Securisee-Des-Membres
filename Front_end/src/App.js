import Athentification from './Compoments/Authentification/Authentification';
import Home from './Compoments/Home/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Athentification />} />
          <Route path="/home" element={<Home  />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;