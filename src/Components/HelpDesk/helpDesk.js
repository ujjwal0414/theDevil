import { useState } from "react"
import { Footer } from "../../CommonComponents/Footer/Footer"
import { problmList } from "./prblmsList"
import { LuLoader2 } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
const HelpDesk=()=>{
    let navigate=useNavigate();
    let url=process.env.REACT_APP_BACKEND_URL
    let [issueList,setList]=useState([]);
    let [prblmDesc,setDesc]=useState("");
    let [err,setErr]=useState("");
    let [email,setEmail]=useState("");
    let [loader,setLoader]=useState(false)
    let handleSubmitIssues=async()=>{
        const abortController = new AbortController();
        const signal = abortController.signal;
        if(issueList.length==0 && prblmDesc==="" ){
          setErr("No issues provided")
          return
        }
        if(email===""){
            setErr("Enter your email")
            return
        }
        try {
         
        let cancelApi= setTimeout(()=>{
            abortController.abort()
            setErr("Session timed out")
            setLoader(false)
            return
          },30000)
            setLoader(true)
            let postProblem=await fetch(`${url}/userProblem`,{
                method:"post",
                body:JSON.stringify({
                    email:email,
                    ProblemList:{
                        problemList:issueList,
                        problemDesc:prblmDesc
                    }
                }),
                headers:{"Content-Type":"application/json"},
                signal:signal
            })
            postProblem=await postProblem.json();
           
            if(postProblem.status==200 || postProblem.status==201){
                clearTimeout(cancelApi)
                setLoader(false)
                setErr("Your problem has been recorded")
                setTimeout(()=>{
                   navigate("/signUp")
                },2000)
            }
            else{
                clearTimeout(cancelApi)
                setLoader(false)
                setErr("Oops,something went wrong")
            }
        } catch (error) {
           setErr("Unable to post problem, try again") 
           setLoader(false)
        }
    }
    return(
        <>
        <div className="h-[90vh] w-[100%] flex mt-20 md:mt-0 md:justify-center md:flex-row items-center flex-col">
           <div className=" md:w-[40%] flex justify-center md:h-[60%] w-[90%]  ">
           <div className="md:w-[80%] ">
            <h2 className="text-2xl font-semibold text-slate-700 mb-10">Some common Problems</h2>
           <div className="flex flex-wrap">
            {
                problmList.map((item)=>
                <span key={item} onClick={()=>{setList((prev)=>([...prev,item]))}} className={`border m-1 ${issueList.includes(item)?"shadow-slate-500":"hover:border-slate-800 hover:shadow-slate-400"} border-slate-500 text-slate-800 font-semibold shadow-md  px-3 py-1 rounded-xl cursor-pointer  duration-200`}>{item}</span>
                
                )
            }
           </div>
          
           </div>
           
           </div>
           <div className=" md:w-[40%]  flex flex-col items-center md:h-[60%] w-[90%] ">
            <div className="md:w-[80%] w-[100%] mt-10 md:mt-0  ">
                <textarea onChange={(e)=>{setDesc(e.target.value)}} value={prblmDesc} name="" id="" className="w-[100%] outline-none rounded-lg px-1 py-1 md:h-[30vh] h-[20vh] border border-slate-600" placeholder="Enter your further problems"></textarea>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="w-[100%] outline-none rounded-md p-1 py-2 border border-slate-600"  type="email" placeholder="Enter email"/>
                {
                    err && <div className="text-sm font-semibold text-slate-600">{err}</div>
                }
                <button onClick={handleSubmitIssues} className="w-[100%] md:h-[2.8vw] h-[10vw]  p-2 rounded-lg mt-2 flex justify-center items-center bg-black text-white font-semibold ">{
                    loader?<LuLoader2 className="animate-spin"/>:"Submit"
                }</button>
            </div>
            </div> 
        </div>
        <Footer/>
        </>
    )
}
export {HelpDesk}