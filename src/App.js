import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./CommonComponents/NavBar/Navbar";
import { NotFound } from "./NotFound";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { PrivateRouter } from "./PrivateRoute/PrivateRoute";
import { useEffect, useState } from "react";
import { SignUp } from "./Components/SignUp/signUp";
import { UserComp } from "./RoutingCompoents/user/user";
import { useNavigate } from "react-router-dom"
import { UserContext } from "./userContext/UseContext";
function App() {
  let [user,setUser]=useState("fsd")
  let navigate=useNavigate()
  useEffect(()=>{
  navigate("/user")
},[])
  return (
    <>
   
    <UserContext.Provider value={user} >
    <Routes   >
    
      <Route element={<PrivateRouter/>}>
      <Route path="/user/*" element={<UserComp/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </UserContext.Provider>
     </>
  );
}

export default App;
