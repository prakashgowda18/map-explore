import React, { useState, useEffect } from 'react'
import Map, { NavigationControl } from 'react-map-gl'
import axios from "axios"
import 'mapbox-gl/dist/mapbox-gl.css'
import './mappage.css'
import MapMarker from "../components/marker/MapMarker"
import MarkerPopup from "../components/popup/MarkerPopup"
import UserMarkerPopup from "../components/popup/UserMarkerPopup"
import UserAuthentication from '../components/authentication/UserAuthentication'


const MapPage = () => {
    const myStorage = window.localStorage
    const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"))
    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [newPlace, setNewPlace] = useState(null)

    useEffect(() => {
        const getPins = async () => {
            try {
                const allPins = await axios.get("http://localhost:8800/api/pins")
                setPins(allPins.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPins()
    }, [])

    const handleAddClick = (e) => {
        if (e.lngLat) {
            const { lng, lat } = e.lngLat
            setNewPlace({
                lat: lat,
                long: lng,
            })
        }
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
           
            {/*Mapbox map */}
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}// Use your mapbox public access token
                initialViewState={{
                    longitude: 79.861244,
                    latitude: 6.927079,
                    zoom: 5,

                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onDblClick={handleAddClick} //Double click to create marker
            >
             <NavigationControl position='top-left' /> {/*navigation contol for map */}

            {pins.map(p => (
            <>
                {/*Retrieve all markers on Map */}
                <MapMarker
                    pins={pins}
                    currentUsername={currentUsername}
                    setCurrentPlaceId={setCurrentPlaceId}
                />
                {/*Popup on Marker */}
                <MarkerPopup
                    p={p}
                    currentPlaceId={currentPlaceId}
                    setCurrentPlaceId={setCurrentPlaceId}
                />
            </>
            ))}   
                {/* User popup creation */}             
                <UserMarkerPopup
                    newPlace={newPlace}
                    currentUsername={currentUsername}
                    pins={pins}
                    setPins={setPins}
                    setNewPlace={setNewPlace}
                />
                {/*User Authentication - Login/Register*/}
                <UserAuthentication
                    currentUsername = {currentUsername}
                    setCurrentUsername = {setCurrentUsername}
                    myStorage = {myStorage}
                />
            </Map>
        </div>
    )
}
export default MapPage
