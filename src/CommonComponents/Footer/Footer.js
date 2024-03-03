import { Link } from "react-router-dom"
import { FaInstagram } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { EmailShareButton } from "react-share";
import { EmailIcon } from "react-share";
const Footer=()=>{
    return(
        <>
        <div className="w-[100%] bg-black py-2 min-h-[25vh] text-white">
            <div className="flex flex-col md:flex-row md:justify-evenly  ">
            <div className="designer md:pl-0 pl-4 md:w-[28%] w-[90%]">
                <h1 className="text-[24px] p-0">u<span className="text-[#2f9aad]">JEX</span></h1>
                <p className="text-slate-300">Designed by Ujjwal Gupta</p>
            </div>
            <div className="social md:pl-0 pl-4 flex w-[90%] md:w-[30%] pt-4">
                
                <Link target="_blank" to={"https://www.instagram.com/ujjwalgupta8074?igsh=MTYzMG9raXJwcmVtaQ=="} className="bg-white text-black  flex justify-center items-center p-2 rounded-md">
                    <span className="text-[30px]" ><FaInstagram/></span>
                    <span className="ml-1">Instagram</span>
                </Link>
                <Link to={"https://github.com/ujjwal0414"} target="_blank" className="bg-white ml-2 text-black  flex justify-center items-center p-2 rounded-md">
                    <span className="text-[30px]" ><FaSquareGithub/></span>
                    <span className="ml-1">Github</span>
                </Link>
                <EmailShareButton body="ujwalgupt@gmail.com"  className="bg-white ml-2 text-black  flex justify-center items-center p-2 rounded-md">
                    <span className="text-[30px]" ><MdMarkEmailRead/></span>
                    <span className="ml-1">Email</span>
                </EmailShareButton>
            </div>
            <div className="contact rounded-md flex items-center justify-evenly md:pl-0 md:ml-0 ml-4 mt-4 p-4 bg-white text-black md:w-[30%] w-[90%]">
              <div className="flex items-center">
                <span className="text-[30px] md:ml-4"><MdMarkEmailRead/></span>
                <span className="text-[16px] ml-3">Email</span>
              </div>
              <div className="font-semibold">ujwalgupt@gmail.com</div>
            </div>
            </div>
            <div className="Copyright"></div>
        </div>
        </>
    )
}
export {Footer}