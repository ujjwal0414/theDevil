import ReactMapboxGl, { Layer,Marker,Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MdLocationPin } from "react-icons/md";

import { useState } from 'react';
const MapRender = () => {
  let [viewport,setPort]=useState({
    latitude:28.6448,
    longitude:77.216,
    zoom:7
  })
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoidWpleCIsImEiOiJjbHN5dW4yeTYwNTg4MmtwOTRnZTBzaDh5In0.sRbdQMLShUeoZmr4Da8oNA",

  });
  
  return (
    <>
      <div >
      
        <Map
          // center={[-0.481747846041145, 51.3233379650232]}
          style="mapbox://styles/mapbox/streets-v11"
         className='h-[90%] md:h-[100%] md:w-[40vw] w-[80vw] rounded-lg'
         center={[ 78.9629, 20.5937]}
          // containerStyle={{
          //   height: '100%',
          //   width: '40vw'
          // }}
          zoom={[6]}
        >       </Map>
        
      </div>
    </>
  )
}
export { MapRender }