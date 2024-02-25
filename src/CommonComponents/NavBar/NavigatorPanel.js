import { Link } from "react-router-dom"
import { LinkNavigate } from "./utils"
import { useLocation } from "react-router-dom"
const NavigationPanel=({show,setPanelShow})=>{
    let location=useLocation();
    return(
        <>{
          <div className={`absolute transition-all z-40 px-4 pt-6 duration-100 border-2 border-slate-700  shadow-md ${show?"block bottom-0":"hidden"} md:hidden w-[100%] rounded-t-3xl min-h-[30vh] bg-white`}>
             <div className="grid grid-cols-2 justify-items-center items-start gap-1 min-h-[10vh] w-[100%] ">
                 {/* <Link  className="bg-black p-3 text-center font-semibold rounded-xl text-[1rem]  w-[40vw]  text-white"  to={"/"}>Home</Link> */}
                 {
                    LinkNavigate.map((i,p)=>{
                        return(
                            <Link onClick={()=>{setPanelShow(!show)}}  className={` ${location.pathname==i.pathName?"bg-black text-white":"bg-slate-200 text-black"} p-3 text-center font-semibold rounded-xl text-[1rem]  w-[40vw]  `}  to={i.pathName}>{i.name}</Link>

                        )
                    })
                 }

             </div>


          </div>

        }
        </>
    )
}
export {NavigationPanel}