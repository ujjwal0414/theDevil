import { useState } from "react"
import { Footer } from "../../CommonComponents/Footer/Footer";
import "../Login/login.css"
import { MapRender } from "../Map/Map";
const Login = () => {
    let [userData, setData] = useState({
        email: "",
        password: ""
    });
    let formData = [
        {
            type: "email",
            label: "Email",
            placeHolder: "abc@gmail.com"
        },
        {
            type: "password",
            label: "Password",
            placeHolder: "*****"
        }
    ]
    return (
        <>
            <div className="  min-h-[90vh] flex flex-col-reverse md:flex-row  justify-center items-center pb-6">
                <div className="md:w-[40vw] pt-4 md:pt-0 w-[90vw] min-h-[25vw] flex justify-center md:justify-start">
                    <div className="md:w-[60%]  w-[80vw] md:ml-4 relative">
                        <h2 className="text-[1.8rem] text-slate-700 font-[400] BlendText">Book your Ride</h2>
                        <h2 className="text-[1.5rem] font-[400] text-slate-500">Login</h2>
                        <p className="mt-2">
                            {
                                formData.map((i, p) => {
                                    return (
                                        <>
                                            <p className="font-semibold mb-1 mt-2 text-slate-700">{i.label}</p>
                                            <input className="w-[100%] border-[1px] outline-none border-slate-500 px-2 py-2 rounded-md" type={i.type} placeholder={i.placeHolder} /></>
                                    )
                                })
                            }
                        </p>
                        <button className="text-center w-[100%] p-2 mt-4 bg-black text-white font-semibold rounded-md">Login</button>
                        <button className="text-center w-[100%] p-2 mt-2 font-semibold rounded-md border-2 border-black flex items-center justify-center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxxR_ZDiWVWyqaianGr_Y-jaaDfA9FGncZYayj0NaoLg&s" className="w-[20px] h-[20px] mr-2" />Continue using Google</button>

                    </div>
                </div>
                <div className="md:w-[40vw] hidden md:block  w-[100vw] sm:flex justify-center h-[45vh] md:min-h-[25vw]">
                  <img src="https://assets-global.website-files.com/5e832e12eb7ca02ee9064d42/64d4e4f4803795aef34e644d_maps_img-5.png" className="md:w-[40vw] w-[80vw]  md:h-[25vw]"/> 
                
                </div>
            </div>
          
        </>
    )
}
export { Login }
