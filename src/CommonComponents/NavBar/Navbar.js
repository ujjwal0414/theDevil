import { Link } from "react-router-dom"
import { LinkNavigate } from "./utils"
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";
const NavBar=()=>{
    let location=useLocation();
    return(
        <>
        <div className={`py-4 flex justify-center hover:opacity-80 transition-opacity duration-200 z-50 ${location.pathname=="/"?"opacity-60":""}`}>
            <div className="md:w-[90vw] w-[90vw] bg-slate-300 flex px-3 py-4 justify-between items-center rounded-lg">
                <span className="font-semibold text-[1.2rem]">u<span>Ride</span></span>
                <div className="md:min-w-[40%]  md:flex justify-evenly hidden md:visible">
                    {
                        LinkNavigate.map((item,pos)=>{
                            return(
                                <Link className="font-semibold text-slate-700" to={item.pathName}>{item.name}</Link>
                            )
                        })
                    }
                </div>
                <div className="md:hidden"><FaBars/></div>
            </div>
        </div>
        </>
    )
}
export {NavBar}