import React from 'react'
import Map, { Marker,NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MapPage = () => {
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                initialViewState={{
                    longitude: 79.861244,
                    latitude: 6.927079,
                    zoom: 10
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={79.861244} latitude={6.927079} anchor="bottom" >
                    <LocationOnIcon style={{fontSize:visualViewport.zoom*10, color:'slateblue'}}/>
                </Marker>
                <NavigationControl position='top-right'/>

            </Map>
        </div>
    )
}
export default MapPage
