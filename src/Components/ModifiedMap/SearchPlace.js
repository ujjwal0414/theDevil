import { useEffect, useMemo, useState } from "react"
import { LuLoader2 } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { DebounceInput } from "react-debounce-input";
const SearchPlace = ({ setPlacesMap, places }) => {

    let [filterPlaces1, setFiter1] = useState([]);
    let [filterPlaces2, setFiter2] = useState([]);
    let [showf, setf] = useState(false);
    let [placeName, setName] = useState("");
    let [coord,setCoord]=useState({
        c1:[],
        c2:[]
    });
    let [p2, setp2] = useState("");

    let getLoc = async (loc, stt) => {
        
        if (stt) {

            console.log(placeName);
            if (loc !== "") {
                setf(true)
                setName(loc)
                console.log(loc);
                let resp = await fetch(`https://api.maptiler.com/geocoding/${loc}.json?key=tuCxAEXuYyaHuE1Vz2vq&limit=10`);
                resp = await resp.json();
                setFiter1(resp.features)
               
            }
        }
        else {


            if (loc !== "") {
                setf(true)
                setp2(loc)
                console.log(loc);
                let resp = await fetch(`https://api.maptiler.com/geocoding/${loc}.json?key=tuCxAEXuYyaHuE1Vz2vq&limit=10`);
                resp = await resp.json();
                setFiter2(resp.features)
               
            }

        }
    }
    let [load, setLoader] = useState(false);
    let [err, setErr] = useState("");
    let [err1, setErr1] = useState("");
    let [err2, setErr2] = useState("");


    let [search, setSearch] = useState(false);
    let fetchData = async () => {

        if (placeName === "" || p2 === "") {
            setErr("Complete the empty fields!!!")
            return
        }
        setLoader(true);
        try {
            let coordinateArr = await Promise.all([
                fetch(`https://api.api-ninjas.com/v1/city?name=${placeName}&limit=29`, {
                    headers: {
                        'X-Api-Key': '3Wlk1z/7EUfZob9p9l06Kg==014ARTIKUfZ9q2Jn'
                    }
                }),
                fetch(`https://api.api-ninjas.com/v1/city?name=${p2}&limit=29`, {
                    headers: {
                        'X-Api-Key': '3Wlk1z/7EUfZob9p9l06Kg==014ARTIKUfZ9q2Jn'
                    }
                })
            ]);
            coordinateArr = await Promise.all(coordinateArr.map(r => r.json()));
            console.log(coordinateArr);

            if (coordinateArr.length == 0) {
                setErr("No place found.Try again")
            }
            else if (coordinateArr[1].length == 0 && coordinateArr[0].length == 0) {
                setErr1(`Above place not found`)
                setErr2(`Above place not found`)
            }
            else if (coordinateArr[0].length == 0) {
                setErr1(`Above place not found`)
            }
            else if (coordinateArr[1].length == 0) {
                setErr2(`Above place not found`)
            }


            setPlacesMap(coordinateArr)
            setLoader(false)
            // setName("")
        } catch (error) {
            setErr("An error occured")
            console.log(error);
            setLoader(false)
        }
    }
    let searchCoordinates=()=>{
        if(placeName==="" && p2===""){
            setErr("Complete the empty fields!!!")
        }
        else{
            setPlacesMap(coord)
        }
    }
    // useEffect(() => {
    //     console.log(placeName);
    //     if (placeName == "") {
    //        setf(false)
    //     }
    //     else{
    //         setf(true)
    //     }
    //     if (p2 == "") {
    //        setf(false)
    //     }
    //     else{
    //         setf(true)
    //     }
    // }, [placeName, p2])
//     useEffect(()=>{
// console.log(coord,"point");
//     },[coord])
    let [searchPlace, setPlaces] = useState([]);
    return (
        <>
            {
                search ? <>
                    <div onClick={() => { setSearch(!search) }} className="absolute w-[100%] h-[100%] bg-slate-400 opacity-40 top-0"></div>
                    <div className={`absolute  ${window.innerWidth < 650 ? "top-0" : ""}  rounded-md md:bottom-12 md:left-2 md:w-[24vw] w-[100%] bg-white flex flex-col p-1 py-2 items-center`}>
                        <span className="w-[95%] relative">
                            {
                                placeName && showf&&  filterPlaces1.length !== 0 && <div className="absolute z-40 w-[100%] bg-white md:top-[-20vh] top-[7vh]   min-h-[10vh] max-h-[40vh] md:max-h-[20vh] overflow-auto">
                                    {
                                        filterPlaces1.map((i, p) => {
                                            return (
                                                <div onClick={() => {setName(prev => i.text);setCoord((prev)=>({
                                                    ...prev,
                                                    ['c1']:i.geometry.coordinates
                                                }));setf(false);setFiter1([])  }} key={p} className="hover:bg-slate-200 duration-150 px-4 py-1">
                                                    <div className="font-semibold ">{i.place_name_en}</div>
                                                    <div className="font-semibold text-[15px] text-slate-400">{i.text}</div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            }
                            <DebounceInput onChange={(e) => { getLoc(e.target.value,true)}} value={placeName} minLength={4} debounceTimeout={1000} placeholder="Enter first location" className="w-[100%] mt-1 border-2 px-1 py-2 border-slate-500 rounded-md" />

                        </span>
                        {
                            err1 && <span className="text-[12px] w-[95%] font-semibold text-red-500">{err1}</span>

                        }
                        <span className="w-[95%] relative">
                        {
                                p2 && showf&&  filterPlaces2.length !== 0 && <div className="absolute z-40 w-[100%] bg-white md:top-[-20vh] top-[7vh]   min-h-[10vh] max-h-[40vh] md:max-h-[20vh] overflow-auto">
                                    {
                                        filterPlaces2.map((i, p) => {
                                            return (
                                                <div onClick={() => {setp2(prev => i.text);setCoord((prev)=>({
                                                    ...prev,
                                                    ['c2']:i.geometry.coordinates
                                                }));setf(false) ;setFiter2([]) }} key={p} className="hover:bg-slate-200 duration-150 px-4 py-1">
                                                    <div className="font-semibold ">{i.place_name_en}</div>
                                                    <div className="font-semibold text-[15px] text-slate-400">{i.text}</div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            }
                            <DebounceInput onChange={(e) => { getLoc(e.target.value, false)}} value={p2} minLength={4} debounceTimeout={1000} placeholder="Enter second location" className="w-[100%] mt-1 border-2 px-1 py-2 border-slate-500 rounded-md" />

                        </span>
                        {/* <input value={p2} onChange={(e)=>{setp2(e.target.value);setErr2("")}} className="w-[95%] mt-1 border-2 px-1 py-2 border-slate-500 rounded-md" type="text" placeholder="Enter ending location"/> */}
                        {
                            err2 && <span className="text-[12px] w-[95%] font-semibold text-red-500">{err2}</span>

                        }
                        {
                            err && <span className="text-[0.8rem] mt-1 font-semibold text-left w-[95%]">{err}</span>

                        }
                        <button onClick={()=>{searchCoordinates();setSearch(!search)}} className={`w-[95%]  ${load ? "py-3" : "py-2"} mt-2 rounded-md text-white bg-slate-800 font-semibold text-center flex justify-center`}>{load ? <LuLoader2 className="transition-all  animate-spin font-semibold" /> : "Search"}</button>

                    </div></> : <><span onClick={() => { setSearch(!search) }} className="absolute cursor-pointer rounded-full p-3 border-2 border-slate-600 transition-all duration-150 bottom-8 left-2 bg-white"><IoSearchSharp /></span>
                </>
            }
        </>
    )
}
export { SearchPlace }