import './App.css'
import Profile from './pages/profile/Profile.tsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Auth from "./pages/auth/Auth.tsx";
import CMSBNavbar from "./components/navbar/Navbar.tsx";
import Stock from "./pages/stock/Stock.tsx";
import Market from "./pages/market/Market.tsx";
import {SocketContext} from "./stores/context/SocketContext.ts";
import WaitingRoom from "./pages/game/WaitingRoom.tsx";
import Arena from "./pages/game/Arena.tsx";
import {useState} from "react";

function App() {
    const [sharedSocket, setSharedSocket] = useState();

    return (
        <SocketContext.Provider value={{sharedSocket, setSharedSocket}}>
          <BrowserRouter>
              <CMSBNavbar/>
              <div className={"application-body"}>
                  <Routes>
                      <Route path="/" element={<Dashboard/>}/>
                      <Route path="/profile" element={<Profile/>}/>
                      <Route path="/auth" element={<Auth/>}/>
                      <Route path="/stock" element={<Stock/>}/>
                      <Route path="/market" element={<Market/>}/>
                      <Route path="/play" element={<WaitingRoom/>}/>
                      <Route path="/combat" element={<Arena/>}/>
                  </Routes>
              </div>
          </BrowserRouter>
        </SocketContext.Provider>
  )
}

export default App
