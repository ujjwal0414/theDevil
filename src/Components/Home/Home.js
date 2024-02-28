import { useState } from "react"
import { MapRender } from "../Map/Map"
import { SearchPlace } from "../ModifiedMap/SearchPlace"
import { MMap } from "../ModifiedMap/modifiedMap"
import { ChangeMapStyle } from "../ModifiedMap/changeMapstyle"
const Home=()=>{
    let [searchPlace,setPlaces]=useState([]);
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