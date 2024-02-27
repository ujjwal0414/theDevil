import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import "@maptiler/geocoding-control/style.css";
const MMap=({places})=>{
  let mapMake=null;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 80.949997, lat: 26.850000 };
  const [zoom] = useState(6);
  maptilersdk.config.apiKey = 'tuCxAEXuYyaHuE1Vz2vq';
  useEffect(() => {
    // stops map from intializing more than onc
    callMap()
  }, [places]);
  let callMap=()=>{
   
    if (false) {
      return
    }
    else{
      console.log(places.length);
      mapMake =map.current = new maptilersdk.Map({
      container: mapContainer.current,
      center:[tokyo.lng, tokyo.lat],      
      // center:places.length==0?[tokyo.lng, tokyo.lat]:places,
      style: maptilersdk.MapStyle.STREETS,
      
      zoom: zoom,
      
    })
    }; 
  }
  useEffect(()=>{
    if(places.length!==0){
      let p1=places[0][0];
    let p2=places[1][0]
   
    if(p1){
      new maptilersdk.Marker({color: "#FF0000"})
   .setLngLat([p1?.longitude,p1?.latitude])
   .addTo(map.current)
    }
  if(p2){
    new maptilersdk.Marker({color: "#FF0000"})
    .setLngLat([p2?.longitude,p2?.latitude])
    .addTo(map.current)
  }
    }
  //   mapMake.flyTo({
  //     center:places.length==0?[tokyo.lng, tokyo.lat]:places,
  //     essential:true,
  //     zoom:14
  //   })
  //   new maptilersdk.Marker({color: "#FF0000"})
  //  .setLngLat(places.length==0?[tokyo.lng, tokyo.lat]:places)
  //  .addTo(map.current)
let gc=new GeocodingControl()
mapMake.addControl(gc,"bottom-right")
  },[places])
 
    return(
        <>
        <div className="map-wrap w-[100%] h-[100vh] absolute top-0 -z-50">
      <div ref={mapContainer} className="map  w-[100%] h-[100%]" ></div>
    </div>
        </>
    )
}
export {MMap}