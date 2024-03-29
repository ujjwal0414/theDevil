import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/geocoding-control/style.css";
import { ChangeMapStyle } from './changeMapstyle';
const MMap=({places})=>{
  let [initStyle,setStyle]=useState(maptilersdk.MapStyle.STREETS)
  let mapStyle=[
  {
    val:"Street",
    styleMap:maptilersdk.MapStyle.STREETS
  },
  {
    val:"Satellite",
    styleMap:maptilersdk.MapStyle.SATELLITE
  },
  {
    val:"Open Street",
    styleMap:maptilersdk.MapStyle.OPENSTREETMAP
  },
  {
    val:"Winter",
    styleMap:maptilersdk.MapStyle.WINTER
  },

]
  let mapMake=null;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 80.949997, lat: 26.850000 };
  const [zoom] = useState(6);
  maptilersdk.config.apiKey = 'tuCxAEXuYyaHuE1Vz2vq';
  useEffect(() => {
    // stops map from intializing more than onc
    callMap()
  }, [places,initStyle]);
  let callMap=()=>{
    if (false) {
      return
    }
    else{
     
      mapMake =map.current = new maptilersdk.Map({
      container: mapContainer.current,
      center:[tokyo.lng, tokyo.lat],      
      // center:places.length==0?[tokyo.lng, tokyo.lat]:places,
      style:initStyle,
      navigationControl:true,
      zoom: zoom,
      
      
    })
    }; 
    
  }

  useEffect(()=>{
    let gc=new GeocodingControl()
mapMake.addControl(gc,"bottom-right")
    if(places==null) return
    new maptilersdk.Marker({color: "#FF0000"})
    .setLngLat(places.c1)
    .addTo(map.current)
    new maptilersdk.Marker({color: "#FF0000"})
    .setLngLat(places.c2)
    .addTo(map.current)
    console.log(places);

  },[places])
 
    return(
        <>
        <ChangeMapStyle initial={initStyle} styl={setStyle} styles={mapStyle} />
        <div className="map-wrap w-[100%] h-[95vh] md:h-[100vh] absolute top-0 -z-50">
      <div ref={mapContainer} className="map  w-[100%] h-[100%]" ></div>
    </div>
        </>
    )
}
export {MMap}