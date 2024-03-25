import { Link } from "react-router-dom"
import { LinkNavigate } from "./utils"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
const NavigationPanel = ({ show, setPanelShow, usrExs, setExs,showP,setP }) => {
  let navigate = useNavigate()
  let location = useLocation();
  return (
    <>{
      <div className={`absolute transition-all z-40 px-4 pt-6 duration-100 border-2 shadow-slate-900   shadow-md ${show ? "block bottom-0" : "hidden"} md:hidden w-[100%] rounded-t-3xl min-h-[5vh] pb-3 bg-white`}>
        <div className="grid grid-cols-2 justify-items-center items-start gap-1 min-h-[10vh] w-[100%] ">
          {/* <Link  className="bg-black p-3 text-center font-semibold rounded-xl text-[1rem]  w-[40vw]  text-white"  to={"/"}>Home</Link> */}
          {
            LinkNavigate.map((i, p) => {
              return (
                !((usrExs && i.name == "Sign Up") || (usrExs && i.name == "Login")) && <Link onClick={() => { setPanelShow(!show) }} className={` ${location.pathname == i.pathName ? "bg-black text-white" : "bg-slate-200 text-black"} p-3 text-center font-semibold rounded-xl text-[1rem]  w-[40vw]  `} to={i.pathName}>{i.name}</Link>

              )
            })
          }
          {usrExs && <button onClick={() => {setP(!showP) }} className="p-3 text-center font-semibold rounded-xl text-[1rem] border-2 border-slate-700  w-[40vw]" >Profile</button>
          }
          {usrExs && <button onClick={() => { localStorage.removeItem("id"); navigate("/signUp"); setExs(false); setPanelShow(!show) }} className="p-3 text-center font-semibold rounded-xl text-[1rem] border-2 border-slate-700  w-[40vw]" >Logout</button>
          }
        </div>


      </div>
     
    }
    </>
  )
}
export { NavigationPanel }