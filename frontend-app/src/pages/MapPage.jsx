import React, { useState, useEffect } from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import axios from "axios"
import { format } from "timeago.js"
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import './mappage.css'


const MapPage = () => {
    const currentUser = "john"
    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);

    useEffect(() => {
        const getPins = async () => {
            try {
                const allPins = await axios.get("http://localhost:8800/api/pins");
                setPins(allPins.data);
            } catch (err) {
                console.log(err);
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

    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id)
        console.log(`${id}`)
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                initialViewState={{
                    longitude: 79.861244,
                    latitude: 6.927079,
                    zoom: 5,

                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onDblClick={handleAddClick}
            >
                <NavigationControl position='top-right' />

                {pins.map(p => (

                    <>
                        <Marker
                            latitude={p.lat}
                            longitude={p.long}
                            anchor="bottom"
                            onClick={() => handleMarkerClick(p._id)}
                        >
                            <LocationOnIcon
                                style={{ fontSize: 40, color: p.username === currentUser ? 'slateblue' : 'tomato', cursor: "pointer" }}

                            />
                        </Marker>

                        {p._id === currentPlaceId && (
                            <Popup
                                latitude={p.lat}
                                longitude={p.long}
                                key={p._id}
                                anchor="left"
                                closeOnClick={false}
                                onClose={() => setCurrentPlaceId(null)}

                            >
                                <div className="card">
                                    <label>Place</label>
                                    <h4 className="place">{p.title}</h4>
                                    <label>Review</label>
                                    <p className="desc">{p.desc}</p>
                                    <label>Rating</label>
                                    <div className="stars">
                                        {Array(p.rating).fill(<StarIcon className="star" />)}
                                    </div>
                                    <label>Information</label>
                                    <span className="username">
                                        Created by <b>{p.username}</b>
                                    </span>
                                    <span className="date">{format(p.createdAt)}</span>
                                </div>
                            </Popup>)}
                        {newPlace &&
                            <Popup
                                latitude={newPlace.lat}
                                longitude={newPlace.long}
                                key={p._id}
                                anchor="left"
                                closeOnClick={false}
                                onClose={() => setNewPlace(null)}

                            >
                                <div>
                <form >
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                  />
                  <label>Rating</label>
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
                            </Popup>}

                    </>
                ))}

            </Map>
        </div>
    )
}
export default MapPage
