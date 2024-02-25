import { Link } from "react-router-dom"
import { FaInstagram } from "react-icons/fa";
const Footer=()=>{
    return(
        <>
        <div className="w-[100%] bg-black py-2 min-h-[30vh] text-white">
            <div className="flex justify-evenly">
            <div className="designer w-[30%] ">
                <h1 className="text-[2rem]">u<span className="text-[#2f9aad]">JEX</span></h1>
                <p className="text-slate-300">Designed by Ujjwal Gupta</p>
            </div>
            <div className="social w-[30%]">
                <h1>Follow us On :</h1>
                <span>
                    <Link to={"/"}></Link>
                </span>
            </div>
            <div className="contact w-[30%]"></div>
            </div>
            <div className="Copyright"></div>
        </div>
        </>
    )
}
export {Footer}