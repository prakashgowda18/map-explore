import React from 'react'
import { Marker, Popup } from 'react-map-gl'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import NewPopupForm from '../forms/newPopup/NewPopupForm'

const UserMarkerPopup = ({
    newPlace,
    currentUsername,
    pins,
    setPins,
    setNewPlace
}) => {

    return (
        <div>
            {newPlace && currentUsername && (
                <>
                    <Marker latitude={newPlace.lat} longitude={newPlace.long}>
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
                        {/* New popup creation Form */}
                        <NewPopupForm
                            currentUsername={currentUsername}
                            newPlace={newPlace}
                            pins={pins}
                            setPins={setPins}
                            setNewPlace={setNewPlace}
                        />
                    </Popup>

                </>
            )}
        </div>
    )
}

export default UserMarkerPopup
