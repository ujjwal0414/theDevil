import { useEffect,useState,useMemo } from "react"
import { useLocation } from "react-router-dom"
import { IoBicycle } from "react-icons/io5";
import { MdDirectionsWalk } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { resp } from "../ModifiedMap/resp";
import { secondsToTime } from "./time";
const NavigationPage = () => {
    let location = useLocation()
    let {state}=location
    // let state={
    //     c1:[12,32],
    //     c2:[12,32]
    // }
    let [numberofRoutes,setRoutes]=useState(0)
    let [response,setResponse]=useState(resp);
    let [err,setErr]=useState("")
    let [routePointer,setPointer]=useState(0);
    let [mode,setMode]=useState({
        index:0,
        m:"Cycling",
        icon:<><IoBicycle/></>,
        api:`https://api.mapbox.com/directions/v5/mapbox/cycling/${state.c1[0]},${state.c1[1]};${state.c2[0]},${state.c2[1]}?alternatives=true&overview=full&voice_instructions=true&annotations=distance&steps=true&access_token=pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dWl0eXkwZGU4MmtvMjJiOTRtMXp3In0.4ZgtEMT7PWwpuBetZQyaXg`
    })
  let modesApi=[{
    index:0,
    m:"Cycling",
    icon:<><IoBicycle/></>,
    api:`https://api.mapbox.com/directions/v5/mapbox/cycling/${state.c1[0]},${state.c1[1]};${state.c2[0]},${state.c2[1]}?alternatives=true&overview=full&voice_instructions=true&annotations=distance&steps=true&access_token=pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dWl0eXkwZGU4MmtvMjJiOTRtMXp3In0.4ZgtEMT7PWwpuBetZQyaXg`
},
{
    index:1,
    m:"Walking",
    icon:<><MdDirectionsWalk/></>,
    api:`https://api.mapbox.com/directions/v5/mapbox/walking/${state.c1[0]},${state.c1[1]};${state.c2[0]},${state.c2[1]}?alternatives=true&overview=full&voice_instructions=true&annotations=distance&steps=true&access_token=pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dWl0eXkwZGU4MmtvMjJiOTRtMXp3In0.4ZgtEMT7PWwpuBetZQyaXg`
},
{
    index:2,
    m:"Driving",
    icon:<><FaCar/></>,
    api:`https://api.mapbox.com/directions/v5/mapbox/driving/${state.c1[0]},${state.c1[1]};${state.c2[0]},${state.c2[1]}?alternatives=true&overview=full&voice_instructions=true&annotations=distance&steps=true&access_token=pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dWl0eXkwZGU4MmtvMjJiOTRtMXp3In0.4ZgtEMT7PWwpuBetZQyaXg`
},
]
   
    let header=[
        {
            h:'head',
            icon:<></>
        },
        {
            h:'turn left',
            icon:<></>
        },
        {
            h:'turn right',
            icon:<></>
        },
        {
            h:'head',
            icon:<></>
        },

    ]
    let distApi = async (item) => {
        setResponse(null)
        const abortController = new AbortController();
        const signal = abortController.signal;
        try {
            let cancelapiRequest=setTimeout(()=>{
                abortController.abort()
                setErr("Oops ! an error occured")
            },30000)
            let updateUserSearch=await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/incrementSearch/${localStorage.getItem("id")}`,{
                method:"put",
                headers: { 'Content-Type': 'application/json' },
                signal:signal
            })
            updateUserSearch=await updateUserSearch.json()
            if(updateUserSearch){
                clearTimeout(cancelapiRequest)
                if(updateUserSearch.status===200){
                  let Direction = await fetch(item.api)

            Direction = await Direction.json();
            let {routes}=Direction;
            console.log(routes);
            setResponse(routes)
                }
                else if(updateUserSearch.status==201){
                    setErr("You have reached limiting value of search, try upgrading to premium")
                }
                else if(updateUserSearch.status===400){
                    setErr("An unexpected error occured")
                }

            }
            
        
           
            // return resp
            
          
           
        } catch (errr) {
            setErr("Unable to process request")
            return errr
        }
    }
    let srch=async()=>{
       let resp=await fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${state.c1[0]},${state.c1[1]};${state.c2[0]},${state.c2[1]}?alternatives=true&overview=full&voice_instructions=true&annotations=distance&steps=true&access_token=pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dWl0eXkwZGU4MmtvMjJiOTRtMXp3In0.4ZgtEMT7PWwpuBetZQyaXg`)
       resp=await resp.json();
       console.log(resp);
      // setResponse(resp)
    }
    let Response= useMemo(async()=>{
        
          let res=await distApi(mode);
       // let res=await srch();
        
    },[mode])


    return (
        <>

            {
                response!==null?
                <>
                {
                    response?.length!==0?<>
                    <div className="flex w-[100%] md:flex-row flex-col justify-center">
                <div className="md:w-[30%]  flex flex-col items-center min-h-[20vh] bg-slate-100">
                <div onClick={distApi} className="w-[100%] bg-white flex justify-center py-2">
                    <span className="bg-red-200 text-center border-2 w-[90%] rounded-lg text-red-700 border-red-600 px-3 py-3">Map preview currently unavailable</span>
                </div>
                <div className="w-[90%]">
                <div className="routes p-1 rounded-md font-semibold  w-[100%] flex justify-evenly">
                    {
                      response?.map((i,p)=>{
                        return(
                            <button onClick={()=>{setPointer(p)}} key={p} className={`p-2 ${routePointer===p?"bg-black text-white":"hover:bg-slate-400"} w-[80%] ml-1 mr-1 rounded-md text-center  duration-100`}>Route {p+1}</button>

                        )
                      })  
                    }
                   
                </div>
                <div className="routes mt-2 p-1 bg-slate-300 font-semibold w-[100%] flex justify-evenly">
                    {
                        modesApi.map((i,p)=>{
                            return(
                                <button key={p} onClick={()=>{setMode(modesApi[p])}} className={`p-2 ${i.index===mode.index?"bg-black text-white":"hover:bg-slate-400"}  w-[80%] ml-1 mr-1 rounded-md text-center duration-100`}>{i.m}</button>

                            )
                        })
                    }
                  
                </div>
                
                </div>                
                </div>
                <div className="md:w-[50%] w-[100%] flex justify-center max-h-[50vh]  md:max-h-[70vh] overflow-auto pb-3 pt-3  min-h-[20vh]">
                    <div className="w-[90%] ">
                    <div className="distanceandTime ml-5 border-2 border-slate-500 p-3 rounded-md flex items-center w-[50%] md:w-[30%] md:mt-10">
                   {
                    mode.icon
                   }
                    <div className="flex ml-3 flex-col">
                        <span className="font-semibold">{(response[routePointer]?.distance/1000).toFixed(3)} Km</span>
                        <span className="text-sm font-semibold text-slate-400">{secondsToTime(response[routePointer].duration)}</span>
                    </div>
                    </div> 
                    <div  className="steps ml-5 min-w-[70%] mr-5 mt-4">
                        {
                            response[routePointer].legs[0].steps.map((i,p)=>{
                                return(
                        <div key={p} className="w-[100%] mb-1 rounded-lg flex items-center px-4 py-6 border-slate-500 border-2">
                            <span className="font-semibold">{p+1} .</span>
                           
                            <p className="ml-3">{i.maneuver.instruction}</p>
                        </div>
                                )
                            })
                        }
                    </div>   
                    </div> 
                </div>
            </div>
                    </>:<>
                    
                    <div className="w-[100%] h-[80vh] flex text-center justify-center items-center">
                    <span className="font-semibold text-2xl">No result found</span>
                    </div>
                    </>
                }
                
                </>
                
                :<><div className="w-[100%] h-[80vh] flex text-center justify-center items-center">
                    {
                        !err?<>
                        <span className="font-semibold text-2xl">Loading</span>
                        </>:<><span className="font-semibold text-2xl w-[90%]">{err}</span></>
                    }
                    </div></>
            }
        </>
    )
}
export { NavigationPage }