import React from 'react'
import Map  from 'react-map-gl'

const MapPage=()=>{
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}  
      initialViewState={{
        longitude: 79.861244,
        latitude: 	6.927079,
        zoom: 3
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
    </div>
  )
}
export default MapPage
