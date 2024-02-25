import { Link } from "react-router-dom"
import { LinkNavigate } from "./utils"
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { NavigationPanel } from "./NavigatorPanel";
import { useEffect, useState } from "react";
const NavBar=()=>{
    let location=useLocation();
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
        <div className={`py-4 flex justify-center  transition-opacity duration-200 z-50 ${location.pathname=="/"?"opacity-60 hover:opacity-80":"opacity-100"}`}>
            <div className="md:w-[90vw] w-[90vw] bg-slate-300 flex px-3 py-4 justify-between items-center rounded-lg">
                <span className="font-semibold text-[1.2rem]">u<span>Ride</span></span>
                <div className="md:min-w-[40%]  md:flex justify-evenly hidden md:visible">
                    {
                        LinkNavigate.map((item,pos)=>{
                            return(
                                <Link key={pos} className="font-semibold text-slate-700" to={item.pathName}>{item.name}</Link>
                            )
                        })
                    }
                </div>
                <div onClick={()=>{setPanel(!showNavigationPanel)}} className="md:hidden"><FaBars/></div>
            </div>
        </div>
{
    showNavigationPanel && <div onClick={()=>{setPanel(!showNavigationPanel)}} className="absolute w-[100%] h-[100%] z-30 opacity-55 bg-slate-400 top-0"></div>

}
        <NavigationPanel show={showNavigationPanel} setPanelShow={setPanel} />
        </>
    )
}
export {NavBar}