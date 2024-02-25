import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MMap=()=>{
    const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 80.949997, lat: 26.850000 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = 'tuCxAEXuYyaHuE1Vz2vq';
  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS.NIGHT,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom
    });
     new maptilersdk.Marker({color: "#FF0000"})
     .setLngLat([80.949997, 26.850000])
     .addTo(map.current)
  }, []);
    return(
        <>
        <div className="map-wrap w-[100%] h-[100vh] absolute top-0 -z-50">
      <div ref={mapContainer} className="map  w-[100%] h-[100%]" />
    </div>
        </>
    )
}
export {MMap}