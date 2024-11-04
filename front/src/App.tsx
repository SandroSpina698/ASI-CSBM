import './App.css'
import Profile from './pages/profile/Profile.tsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Auth from "./pages/auth/Auth.tsx";
import CMSBNavbar from "./components/navbar/Navbar.tsx";
import Stock from "./pages/stock/Stock.tsx";
import Market from "./pages/market/Market.tsx";

function App() {

    return (
          <BrowserRouter>
              <CMSBNavbar/>
              <div className={"application-body"}>
                  <Routes>
                      <Route exact path="/" element={<Dashboard/>}/>
                      <Route exact path="/profile" element={<Profile/>}/>
                      <Route exact path="/auth" element={<Auth/>}/>
                      <Route exact path="/stock" element={<Stock/>}/>
                      <Route exact path="/market" element={<Market/>}/>
                  </Routes>
              </div>
          </BrowserRouter>
  )
}

export default App
