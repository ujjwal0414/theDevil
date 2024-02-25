import ReactMapboxGl, { Layer,Marker,Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MdLocationPin } from "react-icons/md";

import { useState } from 'react';
const MapRender = () => {
  let [viewport,setPort]=useState({
    latitude:28.6448,
    longitude:77.216,
    zoom:17
  })
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dW4yeTYwNTg4MmtwOTRnZTBzaDh5In0.sRbdQMLShUeoZmr4Da8oNA",

  });
  
  return (
    <>
      <div className='absolute top-0 -z-50'>
      
        <Map
          // center={[-0.481747846041145, 51.3233379650232]}
          style="mapbox://styles/mapbox/streets-v11"
         
         
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
        


        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature className="bg-black" coordinates={[-0.481747846041145, 51.3233379650232]} />
  </Layer>        </Map>
        
      </div>
    </>
  )
}
export { MapRender }