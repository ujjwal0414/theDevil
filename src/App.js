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
import { HelpDesk } from "./Components/HelpDesk/helpDesk";
import { NavigationPage } from "./Components/NavigationPage/NavigationPage";
function App() {
  let [user,setUser]=useState("fsd")
  let navigate=useNavigate()
  // let CheckUser=async()=>{
  //    if(localStorage.getItem("id")!==null || localStorage.getItem("id")!==undefined){
  //     let User=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getUserDetails/${'6612d5189a1e84b52334fe77'}`);
  //     User=await User.json()
  //     console.log(User);
  //    }
  //    else{
  //     navigate("/login")
  //    }    
  // }
  useEffect(()=>{
   // CheckUser()
    // console.log(localStorage.getItem("id"));
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
      <Route path="/helpDesk" element={<HelpDesk/>}/>
      
    </Routes>
    </UserContext.Provider>
     </>
  );
}

export default App;
