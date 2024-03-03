import { IoLayersSharp } from "react-icons/io5";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import * as maptilersdk from '@maptiler/sdk';
import { useState } from "react";

const ChangeMapStyle=({styl,styles,initial})=>{
    let [showLayer,setLayer]=useState(true);
    return (
        <>
        {
            showLayer?
            <div onClick={()=>{setLayer(!showLayer)}} className="absolute left-2 bg-white p-2 cursor-pointer shadow-md shadow-slate-600 "><IoLayersSharp/></div>
           :
        <div className="absolute left-2 bg-white py-2 md:w-[15vw] w-[60vw]  shadow-md shadow-slate-600 ">
           {
            styles.map((i,p)=>{
                return(
                    <div onClick={()=>{styl(i.styleMap);setLayer(!showLayer)}} key={p} className={`font-semibold cursor-pointer ${i.styleMap==initial?"bg-slate-100":""} text-slate-600 py-1 pl-1 transition-all duration-100 hover:bg-slate-200`}>{i.val}</div>
                    )
            })
           }

        </div>
        }
        </>
    )
}
export {ChangeMapStyle}