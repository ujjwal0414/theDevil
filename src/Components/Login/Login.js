import { useState } from "react"
import { Footer } from "../../CommonComponents/Footer/Footer";
import "../Login/login.css"
import { LuLoader2 } from "react-icons/lu";

import { MapRender } from "../Map/Map";
import {  createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setToLocalStorage } from "../../CommonComponents/localStorageSet";
const Login = () => {
    let navigate=useNavigate();
    let [err,setError]=useState("");
    let [loader,setLoader]=useState(false);
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
    let userDataField=(e)=>{
        let {name,value}=e.target;
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
      
    }
    const submitData=async()=>{
        
        const abortController = new AbortController();
        const signal = abortController.signal;
        if(userData.email==="" || userData.password===""){
            setError("Empty fields");
            return;
        }
        else{
            if(false){
                setError("Incorrect phone length")
                return
            }
            else{
                if(false){
                    setError("Select your profession")
                    return
                }
                else{
                    setLoader(true)
                    try {
                       let cancelApi= setTimeout(()=>{
                            abortController.abort()
                            setError("Try again")
                            setLoader(false)
                            return
                          },10000)
                        let response=await fetch(`http://localhost:2183/user/userLogin`,{
                            method:"post",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(userData),
                            signal:signal
                        })
                        
                        response=await response.json()
                        if(response){
                            setLoader(false)
                            clearTimeout(cancelApi)
                            if(response.status===400){
                                setError("Incorrect email or password")
                            }
                            else if(false){
                                setError("Account already exists")
                            }
                            else if(response.status===403){
                                setError("An unexpected error occured")
                            }
                            else{
                                setError("Logged")
                                if(response.userType==="user"){
                                    setToLocalStorage(response.uid,false)
                                    navigate("/user")
                                }
                                else if(response.userType==="jobseeker"){
                                    navigate("/jobseeker")
                                }
                                else{
                                    setError("Null user")
                                }
                                // if(response.data.userType==="user"){
                                //     navigate("/user")
                                // }
                            }

                        }
                        else{
                            setError("Try again")
                        }
                        
                       } catch (error) {
                        console.log(error);
                        setError("An error occured")
                       }
                }
            }
        }
        
    }
    return (
        <>
            <div className="min-h-[80vh]   md:min-h-[90vh] flex  md:flex-row  justify-center md:items-center pb-6">
                <div className="md:w-[40vw] pt-40 md:pt-0 w-[90vw] min-h-[25vw] flex justify-center md:justify-start">
                    <div className="md:w-[60%]  w-[85vw] md:ml-4 relative">
                        <h2 className="text-[1.8rem] text-slate-700 font-[400] BlendText">Book your Ride</h2>
                        <h2 className="text-[1.5rem] font-[400] text-slate-500">Login</h2>
                        <p className="mt-2">
                            {
                                formData.map((i, p) => {
                                    return (
                                        <>
                                            <p className="font-semibold mb-1 mt-2 text-slate-700">{i.label}</p>
                                            <input onChange={userDataField} name={i.type} className="w-[100%] border-[1px] outline-none border-slate-500 px-2 py-2 rounded-md" type={i.type} placeholder={i.placeHolder} /></>
                                    )
                                })
                            }
                        </p>
                        {
                            err && <div className="text-sm text-red-500 font-semibold">{err}</div>
                        }
                        <button onClick={submitData} className="text-center flex justify-center items-center md:h-[2.8vw] h-[11vw] w-[100%] p-2 mt-4 bg-black text-white font-semibold rounded-md">
                        {
                                loader?<LuLoader2 className="transition-all animate-spin"/>:<>Login</>
                            }
                        </button>
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
