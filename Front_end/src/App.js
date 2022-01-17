import Athentification from './Compoments/Authentification/Authentification';
import Home from './Compoments/Home/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const vrai={
    islogin:false,
    username:'',
    id:0
  }
  const [Vrai,setVrai]=useState(vrai);
  const logined=(v,idd,name)=>{
    setVrai({
      islogin:v,
      username:name,
      id:idd
    });
  }
  const logout=()=>{
    setVrai({
      islogin:false,
      username:'',
      id:0
    });
  }
  return (
    <>
      {
        (!Vrai.islogin || !Vrai.username || !Vrai.id) ?

        (
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Athentification logined={logined} />} />
              </Routes>
            </BrowserRouter>
          </div>
        ) : (
          <Home logout={logout} v={Vrai.username} id={Vrai.id} logined={logined} />
        )

      }
    </>
  );
}

export default App;