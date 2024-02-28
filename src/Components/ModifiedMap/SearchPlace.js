import { useEffect, useMemo, useState } from "react"
import { LuLoader2 } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
const SearchPlace=({setPlacesMap,places})=>{
  

    let [placeName,setName]=useState("");
    let [p2,setp2]=useState("");
    let [load,setLoader]=useState(false);
    let [err,setErr]=useState("");
    let [search,setSearch]=useState(false);
    let fetchData=async()=>{
        
        if(placeName==="" || p2==="") {setErr("Complete the empty fields!!!") 
        return}
        setLoader(true);
        try {
            let coordinateArr= await Promise.all([
                fetch(`https://api.api-ninjas.com/v1/city?name=${placeName}&limit=29`,{
                    headers:{
                        'X-Api-Key': '3Wlk1z/7EUfZob9p9l06Kg==014ARTIKUfZ9q2Jn'
                    }
                  }),
                fetch(`https://api.api-ninjas.com/v1/city?name=${p2}&limit=29`,{
                    headers:{
                        'X-Api-Key': '3Wlk1z/7EUfZob9p9l06Kg==014ARTIKUfZ9q2Jn'
                    }
                  })
            ]);
            coordinateArr=await Promise.all(coordinateArr.map(r=> r.json()));
            console.log(coordinateArr);
            setLoader(false)
            setErr("")
        setPlacesMap(coordinateArr)
        // setName("")
        } catch (error) {
            setErr("An error occured")
         console.log(error);
         setLoader(false)
        }
     }
    let [searchPlace,setPlaces]=useState([]);
    return(
        <>
        {
            search ?<><div className="absolute rounded-md bottom-12 left-2 md:w-[24vw] w-[90vw] bg-white flex flex-col p-1 py-2 items-center">
           <span className="absolute right-[-25px] cursor-pointer"> <ImCross onClick={()=>{setSearch(!search)}} /></span>
            <input value={placeName} onChange={(e)=>{setName(e.target.value)}} className="w-[95%] border-2 px-1 py-2 border-slate-500 rounded-md" type="text" placeholder="Enter Starting location"/>
            <input value={p2} onChange={(e)=>{setp2(e.target.value)}} className="w-[95%] mt-1 border-2 px-1 py-2 border-slate-500 rounded-md" type="text" placeholder="Enter ending location"/>
            {
                err &&         <span className="text-[0.8rem] mt-1 font-semibold text-left w-[95%]">{err}</span>
    
            }
            <button onClick={fetchData} className={`w-[95%]  ${load?"py-3":"py-2"} mt-2 rounded-md text-white bg-slate-800 font-semibold text-center flex justify-center`}>{load?<LuLoader2 className="transition-all  animate-spin font-semibold" />:"Search"}</button>
    
            </div></>:<><span onClick={()=>{setSearch(!search)}} className="absolute cursor-pointer rounded-full p-3 border-2 border-slate-600 transition-all duration-150 bottom-8 left-2 bg-white"><IoSearchSharp/></span>
            </>
        }
        </>
    )
}
export {SearchPlace}