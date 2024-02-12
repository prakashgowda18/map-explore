import React, { useState, useEffect } from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import axios from "axios"
import { format } from "timeago.js"
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import Register from "../components/register/Register"
import Login from "../components/login/Login"
import './mappage.css'


const MapPage = () => {
    const myStorage = window.localStorage
    const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"))
    const [pins, setPins] = useState([])
    const [currentPlaceId, setCurrentPlaceId] = useState(null)
    const [newPlace, setNewPlace] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [star, setStar] = useState(0)
    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

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

    const handleMarkerClick = (id) => {
        setCurrentPlaceId(id)
        console.log(`${id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPin = {
            username: currentUsername,
            title,
            desc,
            rating: star,
            lat: newPlace.lat,
            long: newPlace.long,
        }

        try {
            const res = await axios.post("http://localhost:8800/api/pins", newPin)
            setPins([...pins, res.data])
            setNewPlace(null)
        } catch (err) {
            console.log(err)
        }
    }
    const handleLogout = () => {
        setCurrentUsername(null)
        myStorage.removeItem("user")
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
                <NavigationControl position='top-left' />

                {pins.map(p => (

                    <>
                        <Marker
                            latitude={p.lat}
                            longitude={p.long}
                            anchor="bottom"
                            onClick={() => handleMarkerClick(p._id)}
                        >
                            <LocationOnIcon
                                style={{ fontSize: 40, color: p.username === currentUsername ? 'tomato' : 'slateblue', cursor: "pointer" }}

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
                            </Popup>
                        )}

                    </>
                ))}

                {newPlace && currentUsername && (
                    <>
                        <Marker
                            latitude={newPlace.lat}
                            longitude={newPlace.long}
                        >
                            <LocationOnIcon
                                style={{
                                    fontSize: 40,
                                    color: "tomato",
                                    cursor: "pointer",
                                }}

                            />
                        </Marker>
                        <Popup
                            latitude={newPlace.lat}
                            longitude={newPlace.long}
                            anchor="left"
                            closeOnClick={false}
                            onClose={() => setNewPlace(null)}

                        >
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <label>Title</label>
                                    <input
                                        placeholder="Enter a title"
                                        autoFocus
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label>Description</label>
                                    <textarea
                                        placeholder="Say us something about this place."
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                    <label>Rating</label>
                                    <select onChange={(e) => setStar(e.target.value)}>
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
                        </Popup>
                    </>
                )}
                {currentUsername ? (
                    <button className="button logout" onClick={handleLogout}>
                        Log out
                    </button>
                ) : (
                    <div className="buttons">
                        <button className="button login" 
                        onClick={() => {
                            setShowLogin(true);
                            setShowRegister(false);
                        }}
                        >
                            Log in
                        </button>
                        <button
                            className="button register"
                            jsx

                            onClick={() => {
                                setShowRegister(true);
                                setShowLogin(false);
                            }}
                        >
                            Register
                        </button>
                    </div>
                )}
                {showRegister && (
                    <Register
                        setShowRegister={setShowRegister}
                    />
                )}
                {showLogin && (
                    <Login
                        setShowLogin={setShowLogin}
                        setCurrentUsername={setCurrentUsername}
                        myStorage={myStorage}
                    />
                )}


            </Map>
        </div>
    )
}
export default MapPage
