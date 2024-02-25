import ReactMapboxGl, { Layer,Marker } from 'react-mapbox-gl';
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
          center={[-0.481747846041145, 51.3233379650232]}
          style="mapbox://styles/mapbox/streets-v11"
          zoom={[10]}
          projection="equirectangular"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
        

          <Marker
          
            
          >
            jyjjthrsgees
            <button>    
              <img className='z-1000 scale-150' src="https://static.vecteezy.com/system/resources/previews/000/552/683/non_2x/geo-location-pin-vector-icon.jpg" />
            </button>
          </Marker>

        </Map>
        
      </div>
    </>
  )
}
export { MapRender }