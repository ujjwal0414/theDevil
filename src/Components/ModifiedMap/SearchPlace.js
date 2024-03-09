import { useEffect, useMemo, useState } from "react"
import { LuLoader2 } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
const SearchPlace = ({ setPlacesMap, places }) => {

    let [filterPlaces1, setFiter1] = useState([]);
    let [filterPlaces2, setFiter2] = useState([]);
    let [showf, setf] = useState(false);
    let [placeName, setName] = useState("");
    let [coord, setCoord] = useState({
        c1: [],
        c2: []
    });
    let [p2, setp2] = useState("");
    let [srchLoad,setsrchLoad]=useState(false);
    let getLoc = async (loc, stt) => {

        if (stt) {
            setLoader(true)
            const abortController = new AbortController();
            const signal = abortController.signal;


            console.log(placeName);
            if (loc !== "") {
                setf(true)
                setName(loc)
                console.log(loc);
                try {
                    let cancelapiRequest = setTimeout(() => {
                        abortController.abort()
                        setErr("Oops ! an error occured")
                    }, 30000)
                    let updateUserSearch = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/incrementSearch/${localStorage.getItem("id")}`, {
                        method: "put",
                        headers: { 'Content-Type': 'application/json' },
                        signal: signal
                    })
                    updateUserSearch = await updateUserSearch.json()
                    if (updateUserSearch) {
                        clearTimeout(cancelapiRequest)
                        if (updateUserSearch.status === 200) {
                            let resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?limit=10&access_token=pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dWl0eXkwZGU4MmtvMjJiOTRtMXp3In0.4ZgtEMT7PWwpuBetZQyaXg`);
                            resp = await resp.json();
                            setFiter1(resp.features)
                            
                        }
                        else if (updateUserSearch.status == 201) {
                            setErr("You have reached limiting value of search, try upgrading to premium")
                        }
                        else if (updateUserSearch.status === 400) {
                            setErr("An unexpected error occured")
                        }
                        setLoader(false)
                    }

                } catch (error) {
                    setLoader(false)
                    setErr("Unable to fetch places")
                }

            }
        }
        else {
            const abortController = new AbortController();
            const signal = abortController.signal;
            setLoader(true)
            if (loc !== "") {
                setf(true)
                setp2(loc)
                console.log(loc);
                try {
                    
                    let cancelapiRequest = setTimeout(() => {
                        abortController.abort()
                        setErr("Oops ! an error occured")
                    }, 30000)

                    let updateUserSearch = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/incrementSearch/${localStorage.getItem("id")}`, {
                        method: "put",
                        headers: { 'Content-Type': 'application/json' },
                        signal: signal
                    })
                    updateUserSearch = await updateUserSearch.json()
                    console.log(updateUserSearch);
                    if (updateUserSearch) {
                        clearTimeout(cancelapiRequest)
                        if (updateUserSearch.status === 200) {
                            let resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?limit=10&access_token=pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dWl0eXkwZGU4MmtvMjJiOTRtMXp3In0.4ZgtEMT7PWwpuBetZQyaXg`);
                            resp = await resp.json();
                            setFiter2(resp.features)

                        }
                        else if (updateUserSearch.status == 201) {
                            setErr("You have reached limiting value of search, try upgrading to premium")
                        }
                        else if (updateUserSearch.status === 400) {
                            setErr("An unexpected error occured")
                        }
                        setLoader(false)
                    }

                } catch (error) {
                    setLoader(false)
                      setErr("Unable to fetch response")
                }

            }

        }
    }
    let [load, setLoader] = useState(false);
    let [err, setErr] = useState("");
    let [err1, setErr1] = useState("");
    let [err2, setErr2] = useState("");


    let [search, setSearch] = useState(false);

    let searchCoordinates = async () => {
        console.log("search");
        if (placeName === "" && p2 === "") {
            setErr("Complete the empty fields!!!")
            return
        }
        else {
            setsrchLoad(true)
            const abortController = new AbortController();
            const signal = abortController.signal;

            try {
                let cancelapiRequest = setTimeout(() => {
                    abortController.abort()
                    setErr("Oops ! an error occured")
                }, 30000)

                let updateUserSearch = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/insertSearch/${localStorage.getItem("id")}`, {
                    method: "put",
                    body: JSON.stringify(coord),
                    headers: { 'Content-Type': 'application/json' },
                    signal: signal
                })
                updateUserSearch = await updateUserSearch.json()
                if (updateUserSearch) {
                    clearTimeout(cancelapiRequest)
                    if (updateUserSearch.status === 200) {
                        console.log(updateUserSearch);
                        setPlacesMap(coord)
                        setSearch(!search)
                    }
                    else if (updateUserSearch.status == 201) {
                        setErr("You have reached limiting value of search, try upgrading to premium")
                    }
                    else if (updateUserSearch.status === 400) {
                        setErr("An unexpected error occured")
                    }
                    setsrchLoad(false)
                }
            } catch (error) {
                console.log(error);
                setsrchLoad(false);
                setErr("An error occured.")
            }

        }
    }

    let [searchPlace, setPlaces] = useState([]);

    let mapBoxCodinf = async (val) => {
        let resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${val}.json?limit=10&access_token=pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dWl0eXkwZGU4MmtvMjJiOTRtMXp3In0.4ZgtEMT7PWwpuBetZQyaXg`)
        resp = await resp.json();
        console.log(resp);
    }
    return (

        <>
            {
                search ? <>
                    <div onClick={() => { setSearch(!search) }} className="absolute w-[100%] h-[100%] bg-slate-400 opacity-40 top-0"></div>
                    <div className={`absolute  ${window.innerWidth < 650 ? "top-0" : ""}  rounded-md md:bottom-12 md:left-2 md:w-[24vw] w-[100%] bg-white flex flex-col p-1 py-2 items-center`}>
                        <span className="w-[95%] relative">
                            {
                                placeName && showf && filterPlaces1.length !== 0 && <div className="absolute z-40 w-[100%] bg-white md:top-[-20vh] top-[7vh]   min-h-[10vh] max-h-[40vh] md:max-h-[20vh] overflow-auto">
                                    {
                                        filterPlaces1.map((i, p) => {
                                            return (
                                                <div onClick={() => {
                                                    setName(prev => i.text); setCoord((prev) => ({
                                                        ...prev,
                                                        ['c1']: i.geometry.coordinates
                                                    })); setf(false); setFiter1([])
                                                }} key={p} className="hover:bg-slate-200 duration-150 px-4 py-1">
                                                    <div className="font-semibold ">{i.place_name}</div>
                                                    <div className="font-semibold text-[15px] text-slate-400">{i.text}</div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            }
                             <span className="relative  flex items-center justify-center"> <DebounceInput onChange={(e) => { getLoc(e.target.value, true) }} value={placeName} minLength={4} debounceTimeout={1000} placeholder="Enter first location" className="w-[100%]  border-2 px-1 py-2 border-slate-500 rounded-md" />
                             {
                                load && placeName && <LuLoader2 className="absolute right-2 animate-spin"/>
                             }
                             </span>
                        </span>
                        {
                            err1 && <span className="text-[12px] w-[95%] font-semibold text-red-500">{err1}</span>

                        }
                        <span className="w-[95%] relative">
                            {
                                p2 && showf && filterPlaces2.length !== 0 && <div className="absolute z-40 w-[100%] bg-white md:top-[-20vh] top-[7vh]   min-h-[10vh] max-h-[40vh] md:max-h-[20vh] overflow-auto">
                                    {
                                        filterPlaces2.map((i, p) => {
                                            return (
                                                <div onClick={() => {
                                                    setp2(prev => i.text); setCoord((prev) => ({
                                                        ...prev,
                                                        ['c2']: i.geometry.coordinates
                                                    })); setf(false); setFiter2([])
                                                }} key={p} className="hover:bg-slate-200 duration-150 px-4 py-1">
                                                    <div className="font-semibold ">{i.place_name}</div>
                                                    <div className="font-semibold text-[15px] text-slate-400">{i.text}</div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            }
                        <span className="flex relative items-center mt-1">
                        <DebounceInput onChange={(e) => { getLoc(e.target.value, false) }} value={p2} minLength={4} debounceTimeout={1000} placeholder="Enter second location" className="w-[100%]  border-2 px-1 py-2 border-slate-500 rounded-md" />
                        {
                            load && p2 && <LuLoader2 className="absolute right-2 animate-spin"/>
                        }
                        </span>
                        </span>
                        {/* <input value={p2} onChange={(e)=>{setp2(e.target.value);setErr2("")}} className="w-[95%] mt-1 border-2 px-1 py-2 border-slate-500 rounded-md" type="text" placeholder="Enter ending location"/> */}
                        {
                            err2 && <span className="text-[12px] w-[95%] font-semibold text-red-500">{err2}</span>

                        }
                        {
                            err && <span className="text-[0.8rem] mt-1 font-semibold text-left w-[95%]">{err}</span>

                        }
                        <button onClick={() => { searchCoordinates() }} className={`w-[95%]  md:h-[2.8vw] h-[10vw]  p-2 mt-2  rounded-md text-white bg-slate-800 font-semibold text-center flex justify-center items-center`}>{srchLoad ? <LuLoader2 className="transition-all  animate-spin font-semibold" /> : "Search"}</button>

                    </div></> : <>
                    {
                        coord.c1.length !== 0 ? <>
                            <span className="absolute cursor-pointer p-3 flex md:flex-row items-start md:items-center flex-col bottom-8 left-2 ">
                                <span onClick={() => { setSearch(!search) }} className=" cursor-pointer rounded-full md:mb-0 mb-2 md:mr-3 p-3 border-2 border-slate-600 transition-all duration-150  bg-white"><IoSearchSharp /></span>
                                <Link className="bg-black text-white font-semibold px-4 py-2   rounded-[25px] " state={coord} to="/user/navigation">Get routes</Link>
                            </span>
                        </> : <>
                            <span onClick={() => { setSearch(!search) }} className="absolute cursor-pointer rounded-full p-3 border-2 border-slate-600 transition-all duration-150 bottom-8 left-2 bg-white"><IoSearchSharp /></span>
                        </>
                    }
                </>
            }
        </>
    )
}
export { SearchPlace }