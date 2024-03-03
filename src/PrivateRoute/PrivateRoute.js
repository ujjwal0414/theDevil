import { useEffect, useState } from "react";
import { Navigate,Outlet } from "react-router-dom";
import {  createContext, useContext } from "react";
import { UserContext } from "../userContext/UseContext";
const PrivateRouter=()=>{
    
    let [userData,setData]=useState(null);
    let getUser=()=>{
        let data=localStorage.getItem("id") 
      
    }
    useEffect(()=>{
       getUser()
    },[])
    let auth=localStorage.getItem("id")!==null?true:false
    return(
        <>
        {
            auth?<Outlet/>:<Navigate to={"/login"}/>
        }
        </>
    )
}
export {PrivateRouter}