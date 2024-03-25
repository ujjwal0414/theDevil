import { useEffect, useRef, useState } from "react"
import { LuLoader2 } from "react-icons/lu";

let Profile = ({showP,setP}) => {
    let [err,setErr]=useState("");
    let [resp,setResp]=useState(null);
    let [loader,setLoader]=useState(false);
    let [apiNos,setNos]=useState(25);
    let [imgRef,setimgRef]=useState("");
    let picRef=useRef(null)
    let getProfile=async()=>{
        const abortController = new AbortController();
        const signal = abortController.signal;
       
        
        try {
            let cancelApi= setTimeout(()=>{
                abortController.abort()
                setErr("Unable to get details")
               
                return
              },30000)
          if(localStorage.getItem("id")!==undefined||localStorage.getItem("id")!==null){
            let userProfile=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getUserDetails/${localStorage.getItem("id")}`,{signal:signal})
            userProfile=await userProfile.json();
            if(userProfile){
                clearTimeout(cancelApi)
              console.log(userProfile);
                setResp(userProfile)
                setNos(userProfile.data.userSubscription)
                setimgRef(userProfile.data.userProfilePic)
            }
            else{
                setErr("Can't fetch details")
            }
          } 
          else{
            setErr("No user found")
          }
        } catch (error) {
          setErr("Unable to fetch Profile at the moment")  
        }
    }
    useEffect(()=>{
    getProfile()
    },[])
    let updateSubs=async(apiNos)=>{
        setLoader(true)
        setNos(apiNos)
      try {
        let updResp=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/userSubscription/${localStorage.getItem("id")}`,{
            method:"put",
            body:JSON.stringify({
                apiNos:apiNos
            }),
            headers:{"Content-Type":"application/json"}
        })
        updResp=await updResp.json();
        console.log(updResp);
        setLoader(false)  
    } catch (error) {
        setErr("Unable to update subscription")
        setLoader(false)
      }
    }
    let UploadPic=async()=>{
        picRef.current.click();
    }
    return (
        <>
        <div onClick={()=>{setP(!showP)}} className="absolute w-[100%] h-[100%] bg-gray-400 opacity-40 z-50">
            </div>
            <div className="md:w-[20vw] flex flex-col rounded-lg items-center right-6 top-10 absolute md:h-[90%] w-[90vw] h-[90vh] pb-2 z-50 bg-[#e9ecef]">

            {
                resp!==null?<>
                
                <div className="w-[95%] flex justify-center bg-[#f8f9fa] py-3 mt-4 rounded-md relative">
                    <button onClick={UploadPic} className="absolute right-2 border border-slate-600 px-2 rounded-md bottom-2">Edit</button>
                    <input  ref={picRef} type="file" className="hidden"/>
                    <img  className="md:w-[5vw] rounded-full md:h-[5vw]" src={`${imgRef}`} alt="profilePic" />
                </div>
                <span className="w-[95%] font-[500] text-[#495057] text-[13px] mt-2">Email </span>
                <div className=" w-[95%] text-center rounded-md bg-[#f8f9fa] py-2">
                    <span> </span><span className="text-[#889696] font-semibold"> {resp?.data?.email}</span>
                </div>
                <span className="w-[95%] font-[500] text-[#495057] text-[13px] mt-2">Phone </span>
                <div className=" w-[95%] text-center rounded-md bg-[#f8f9fa] py-2">
                    <span> </span><span className="text-[#889696] font-semibold">{resp?.data?.phone}</span>
                </div>
                <span className="w-[95%] font-[500] text-[#495057] text-[13px] mt-2">API count </span>
                <div className=" w-[95%]  rounded-md bg-[#f8f9fa] py-2 pl-2">
                    <span className="text-[#889696] font-semibold">{resp?.srchCount}</span>
                </div>
                <span className="w-[95%] font-[500] text-[#495057] text-[13px] mt-2">Searched Routes</span>
                <div className=" w-[95%]  rounded-md bg-[#f8f9fa] max-h-[25%] overflow-y-auto py-2 pl-2">
                    {
                        resp?.routes.length!==0?<>
                        {
                        resp?.routes.map((item,pos)=>{
                            return(
                                <div key={pos} className="mt-2 mb-1"><span>{pos+1}</span><span className="p-1 rounded-lg bg-[#e9ecef] px-2 ml-3">{item.route[0]}</span><span className="ml-2">-</span><span className="p-1 px-2 bg-[#e9ecef] rounded-lg ml-2">{item?.route[1]}</span></div>

                            )
                        })
                    }
                        </>:<>
                        <div  className="mt-2 mb-1 text-center"><span className="p-1 rounded-lg bg-[#e9ecef] px-2 ml-3 font-semibold">No previous results found</span></div>

                        </>
                    }
                    
                  
                </div>
                <span className="w-[95%] font-[500] text-[#495057] text-[13px] mt-2">Subscription</span>
                <div className=" w-[95%] font-semibold text-left flex flex-wrap  rounded-md bg-[#f8f9fa] py-2 pl-2">
                   <button disabled={true} className={`w-[49%] md:h-[10vh]  ${apiNos==25?"border-[#adb5bd] border":""} px-2 py-2 items-center rounded-md  flex flex-col`}>
                    <span>Normal</span>
                    <span>25 api/user</span>
                   </button>
                   <button disabled={apiNos>=40?true:false} onClick={()=>{updateSubs(40)}} className={`w-[49%] md:h-[10vh] ${apiNos==40?"border-[#adb5bd] border":""} px-2 py-2 justify-center  items-center rounded-md  flex flex-col`}>
                   
                   {
                    loader && apiNos==40?<>
                     <LuLoader2 className="animate-spin"/>
                    </>:<>
                    <span>Pro</span>
                    <span>40 api/user</span>
                    </>
                   }
                   </button>
                   <button disabled={apiNos>=100?true:false} onClick={()=>{updateSubs(100)}} className={`w-[49%] ${apiNos==100?"border-[#adb5bd] border":""} md:h-[10vh] px-2 py-2 items-center rounded-md justify-center  flex flex-col`}>
                   {
                    loader && apiNos==100?<>
                     <LuLoader2 className="animate-spin"/>
                    </>:<>
                    <span>Exc</span>
                    <span>100 api/user</span>
                    </>
                   }
                   
                   </button>
                </div>
                {
                    err && <span className="w-[95%] mt-5 font-semibold rounded-md text-[14px] bg-[#f8f9fa] py-2 text-[#495057] pl-2">Unable to update subscription</span>
                }
            
                </>:<><span className="mt-5 w-[95%] text-center bg-[#f8f9fa] text-[#495057]  py-2 font-semibold rounded-md">
                {err?err:"Loading"}
                 </span></>
            }
            </div>
        </>
    )
}
export { Profile }