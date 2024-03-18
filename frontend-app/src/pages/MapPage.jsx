import React, { useState, useEffect , lazy, Suspense } from 'react'
import Map, { NavigationControl } from 'react-map-gl'
import axios from "axios"
import 'mapbox-gl/dist/mapbox-gl.css'
import './mappage.css'
import Loader from '../components/ui/Loader'

import MapMarker  from '../components/marker/MapMarker'
const MarkerPopup = lazy(() => import('../components/popup/MarkerPopup'))
const UserMarkerPopup = lazy(() => import('../components/popup/UserMarkerPopup'))
const UserAuthentication = lazy(() => import('../components/authentication/UserAuthentication'))

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
                <Loader/> 
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
                <Suspense fallback={<Loader/>}>  
                <MarkerPopup
                    p={p}
                    currentPlaceId={currentPlaceId}
                    setCurrentPlaceId={setCurrentPlaceId}
                />
                </Suspense>  
            </>
            ))}   
                {/* User popup creation */}  
                <Suspense fallback={<Loader/>}>       
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
                </Suspense>    
            </Map>
        </div>
    )
}
export default MapPage
