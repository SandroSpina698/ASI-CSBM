import './App.css'
import Profile from './pages/profile/Profile.tsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Auth from "./pages/auth/Auth.tsx";
import {useSelector} from "react-redux";

function App() {

    const isAuth = useSelector(
        (state) => state.authenticationReducer.isAuth
    );

    return (
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<Dashboard isAuth={isAuth}/>}/>
                  <Route exact path="/profile" element={<Profile/>}/>
                  <Route exact path="/auth" element={<Auth/>}/>
              </Routes>
          </BrowserRouter>
  )
}

export default App
