import React, { useState } from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import './mappage.css'


const MapPage = () => {
    const [showPopup, setShowPopup] = useState(true)
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
                <NavigationControl position='top-right' />

                <Marker longitude={79.861244} latitude={6.927079} anchor="bottom" >
                    <LocationOnIcon style={{ fontSize: visualViewport.zoom * 10, color: 'slateblue' }} />
                </Marker>

                {showPopup && (
                    <Popup longitude={79.861244} latitude={6.927079}
                        anchor="left"
                        onClose={() => setShowPopup(false)}>
                        <div className="card">
                            <label>Place</label>
                            <h4 className="place">Colombo</h4>
                            <label>Review</label>
                            <p className="desc">Noice</p>
                            <label>Rating</label>
                            <div className="stars">
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            </div>
                            <label>Information</label>
                            <span className="username">
                                Created by <b> Amal</b>
                            </span>
                            <span className="date"> 2hrs ago</span>
                        </div>
                    </Popup>)}


            </Map>
        </div>
    )
}
export default MapPage
