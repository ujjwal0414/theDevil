import { useState } from "react"
import { LuLoader2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { setToLocalStorage } from "../../CommonComponents/localStorageSet";
import { Footer } from "../../CommonComponents/Footer/Footer";
import { auth,googleAuthProvide,app } from "../../fireBase/fireBaseAuth";
import {signInWithPopup} from "firebase/auth"
let SignUp=()=>{
    let url=process.env.REACT_APP_BACKEND_URL
    let navigate=useNavigate();
    let [err,setError]=useState("");
    let [loader,setLoader]=useState(false);
    let [userData, setData] = useState({
        email: "",
        password: "",
        phone:null,
        userType:"user"
    });
    let userDataField=(e)=>{
        let {name,value}=e.target;
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
      
    }
    let setUser=(val)=>{
        setData((prev)=>({
            ...prev,
            ["userType"]:val
        }))
    }
    let setusr=async()=>{
        const abortController = new AbortController();
        const signal = abortController.signal;

       // console.log(userData);
       try {
       let cancelApi= setTimeout(()=>{
            abortController.abort()
            setError("Try again")
            return
            
          },20000)
        let response=await fetch(`${url}/user/createUser`,{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(userData),
            signal:signal
        })
        
        response=await response.json()
        if(response){
            clearTimeout(cancelApi)
            console.log("succ");
            setToLocalStorage(response.data.uid,false)
            navigate("/user")
        }
        else{
            console.log("api cancelled");
        }
      
       } catch (error) {
        console.log(error);
        setError("An error occured")
       }
    }
    const submitData=async()=>{
        
        const abortController = new AbortController();
        const signal = abortController.signal;
        if(userData.email==="" || userData.password==="" || userData.phone===null ){
            setError("Empty fields");
            return;
        }
        else{
            if(userData.phone.length!==10){
                setError("Incorrect phone length")
                return
            }
            else{
                if(userData.userType===null){
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
                        let response=await fetch(`${url}/user/createUser`,{
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
                                setError("Unable to create account")
                            }
                            else if(response.status===201){
                                setError("Account already exists")
                            }
                            else if(response.status===403){
                                setError("An unexpected error occured")
                            }
                            else{
                                setError("Account created")
                                setToLocalStorage(response.data.uid,false)
                                if(response.data.userType==="user"){
                                    navigate("/user")
                                }
                            }

                        }
                        else{
                            setError("Try again")
                        }
                        console.log(response);
                       } catch (error) {
                        console.log(error);
                        setError("An error occured")
                       }
                }
            }
        }
        
    }
    let SignInwithGoogle=async()=>{
       if(userData.phone==null){
        setError("Enter phone number")
        return
       }
       if(userData.phone.length!==10){
        setError("Incorrect phone length")
        return
       }
       if(userData.userType===null){
        setError("Choose profession")
        return
       }else{
        const abortController = new AbortController();
        const signal = abortController.signal;
        try {
            let cancelApi=setTimeout(()=>{
                abortController.abort();
                setError("Session timed out Try again")
                
            },15000)
            let resp=await signInWithPopup(auth,googleAuthProvide)
            let {_tokenResponse}=resp;
            let {refreshToken,photoUrl,email}=_tokenResponse;
            if(resp){
             let setUserInDb=await fetch(`${url}/user/createUserViaGoogle`,{
             method:"post",
             headers:{"Content-Type":"application/json"},
             body:JSON.stringify({
                 isGoogleSigned:true,
                 gid:refreshToken,
                 email:email,
                 userProfilePic:photoUrl,
                 phone:userData.phone,
                 userType:userData.userType
             })
            })
            if(setUserInDb){
                setUserInDb=await setUserInDb.json();
                clearTimeout(cancelApi)
                if(setUserInDb.status==200){
                    setToLocalStorage(setUserInDb.data._id,false)
                    navigate("/user")
                    
                }
                else if(setUserInDb.status===201){
                    setError("User already exists")
                }
            }
           
            }
            else{
             setError("Unable to signIn")
            }
            
         } catch (error) {
             setError("Can't sign up at the moment")
            console.log(error); 
         }
       }



    }
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
    return <>
    <div className="min-h-[90vh]  md:min-h-[90vh] flex  md:flex-row  justify-center md:items-center pb-6">
                <div className="md:w-[40vw] pt-20 md:pt-0 w-[90vw] min-h-[25vw] flex justify-center md:justify-start">
                    <div className="md:w-[60%]  w-[85vw] md:ml-4 relative">
                        <h2 className="text-[1.8rem] text-slate-700 font-[400] BlendText">Book your Ride</h2>
                        <h2 className="text-[1.5rem] font-[400] text-slate-500">Login</h2>
                        <p className="mt-2">
                            {
                                formData.map((i, p) => {
                                    return (
                                        <>
                                            <p className="font-semibold mb-1 mt-2 text-slate-700">{i.label}</p>
                                            <input value={userData[i.type]} onChange={userDataField} name={i.type} className="w-[100%] border-[1px] outline-none border-slate-500 px-2 py-2 rounded-md" type={i.type} placeholder={i.placeHolder} /></>
                                    )
                                })
                            }
                        </p>
                        <div className="flex justify-between mt-2">
                        <span className="w-[19%] flex justify-center items-center">
                            <span className="flex absolute justify-center items-center font-semibold text-slate-500">
                                <img className="w-[20px] mr-1 h-[15px]" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" alt="falg"/>
                                +91</span>

                            <input readOnly className="w-[100%] border-[1px] outline-none border-slate-500 px-2 py-2 rounded-md" type="text" placeholder="" />
</span>
                        <input  onChange={userDataField} value={userData.phone} name="phone" className="w-[79%] border-[1px] outline-none border-slate-500 px-2 py-2 rounded-md" type="number" placeholder="Enter phone number" />
                        </div>
                        {
                            err && <div className="text-sm text-red-500 font-semibold">{err}</div>
                        }
                        <div className="font-semibold text-sm text-slate-700">Choose your proffession</div>
                        <div className="flex justify-between mt-1">
                            <div onClick={()=>{setUser("user")}} className={`w-[49%] cursor-pointer py-1  ${userData.userType==="user"?"shadow-md shadow-slate-500":"hover:shadow-md  hover:shadow-slate-500"}  duration-150 border-2 rounded-md border-slate-300 flex justify-center items-center`}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rrNU8kpaxxYnMJZ8GxqSYzDhbZYfUsPdKA&usqp=CAU" alt="user" className="font-semibold aspect-square w-[45px]"/>
                                <span className="font-semibold text-slate-600 ml-2">User</span>
                            </div>
                            <div   className={`w-[49%] ${userData.userType==="jobseeker"?"shadow-md shadow-slate-500":"hover:shadow-md hover:shadow-slate-500 " } cursor-pointer py-1   duration-150 border-2 rounded-md border-slate-300 flex justify-center items-center`}>
                                <img src="https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Tata-Punch-EV-080120241636.jpg&w=350&h=251&q=90&c=1" alt="user" className="font-semibold h-[45px] w-[60px]"/>
                                <span className="font-semibold text-slate-600 ml-2">Owner</span>
                            </div>
                        </div>
                        <button onClick={submitData} className="text-center md:h-[2.8vw] h-[11vw] flex justify-center items-center  w-[100%] p-2 mt-4 bg-black text-white font-semibold rounded-md">
                            {
                                loader?<LuLoader2 className="transition-all animate-spin"/>:<>Sign Up</>
                            }
                        </button>
                        <button onClick={SignInwithGoogle} className="text-center w-[100%]  p-2 mt-2 font-semibold rounded-md border-2 border-black flex items-center justify-center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxxR_ZDiWVWyqaianGr_Y-jaaDfA9FGncZYayj0NaoLg&s" className="w-[20px] h-[20px] mr-2" />Continue using Google</button>

                    </div>
                </div>
                <div className="md:w-[40vw] hidden md:block  w-[100vw] sm:flex justify-center items-center h-[45vh] md:min-h-[25vw]">
                  <img src="https://assets-global.website-files.com/5e832e12eb7ca02ee9064d42/64d4e4f4803795aef34e644d_maps_img-5.png" className="md:w-[40vw] w-[80vw]  md:h-[25vw]"/> 
                
                </div>
            </div>
    <Footer/>
    </>
}
export {SignUp}