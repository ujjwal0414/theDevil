import { MapRender } from "../Map/Map"
import { MMap } from "../ModifiedMap/modifiedMap"
const Home=()=>{
    return(
        <>
        <div className="w-[100%] overflow-y-hidden">
        <MMap/>
        </div>
        </>
    )
}
export {Home}