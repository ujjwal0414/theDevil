import { Link } from "react-router-dom"
import { LinkNavigate } from "./utils"
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { NavigationPanel } from "./NavigatorPanel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const NavBar=()=>{
    let navigate=useNavigate()
    let location=useLocation();
    let [userExs,setExs]=useState(false)
    let userData=async(id)=>{
        let userResponse=await fetch(`http://localhost:2183/user/getUserDetails/${id}`);
        userResponse=await userResponse.json();
        console.log(userResponse);
    }
    useEffect(()=>{
      if(localStorage.getItem("id")!==null){
        setExs(true)
        
        //userData(localStorage.getItem("id"))
      }
     else{
      // navigate("/signUp")

     }
    },[location.pathname])
    
    let [showNavigationPanel,setPanel]=useState(false);
    useEffect(()=>{
        const handleScroll = (e) => {
            // Prevent scroll in Y direction
            e.preventDefault();
          };
       if(showNavigationPanel){
        
      
          // Add event listener when the component mounts
          document.body.style.overflow = "hidden"      
          // Remove event listener when the component unmounts
        
       }
       return () => {
        document.body.style.overflow = "scroll"      };
    },[showNavigationPanel])
    return(
        <>
        <div className={`py-4 flex justify-center  transition-opacity duration-200 z-50 ${location.pathname=="/user"?"opacity-60 hover:opacity-80":"opacity-100"}`}>
            <div className="md:w-[90vw] w-[90vw] bg-slate-300 flex px-3 py-4 justify-between items-center rounded-lg">
                <span className="font-semibold text-[1.2rem]">u<span className="text-[#2b757e]">JEX</span></span>
                <div className="md:min-w-[40%]  md:flex justify-end items-center hidden md:visible">
                    {
                        LinkNavigate.map((item,pos)=>{
                            return(
                                !((userExs && item.name=="Sign Up") ||(userExs && item.name=="Login")) &&   <Link key={pos} className="font-semibold ml-5 mr-5 text-slate-700" to={item.pathName}>{item.name}</Link>
                            )
                        })
                    }
{
    userExs && <button onClick={()=>{localStorage.removeItem("id");navigate("/signUp");setExs(false)}} className="font-semibold ml-5 mr-5 text-slate-700" >Logout</button>

}
                </div>
                <div onClick={()=>{setPanel(!showNavigationPanel)}} className="md:hidden"><FaBars/></div>
            </div>
        </div>
{
    showNavigationPanel && <div onClick={()=>{setPanel(!showNavigationPanel)}} className="absolute w-[100%] h-[100%] z-30 opacity-55 bg-slate-400 top-0"></div>

}
        <NavigationPanel setExs={setExs} usrExs={userExs} show={showNavigationPanel} setPanelShow={setPanel} />
        </>
    )
}
export {NavBar}