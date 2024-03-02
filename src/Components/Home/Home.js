import { useEffect, useState } from "react"
import { MapRender } from "../Map/Map"
import { SearchPlace } from "../ModifiedMap/SearchPlace"
import { MMap } from "../ModifiedMap/modifiedMap"
import { ChangeMapStyle } from "../ModifiedMap/changeMapstyle"
import { useNavigate } from "react-router-dom"
const Home=()=>{
    let navigate=useNavigate()
    let [searchPlace,setPlaces]=useState(null);
   

    return(
        <>
        <div className="w-[100%] overflow-y-hidden overflow-x-hidden">
        <MMap places={searchPlace}  />
        <SearchPlace places={searchPlace} setPlacesMap={setPlaces} />
       
        </div>
        </>
    )
}
export {Home}