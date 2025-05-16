import React, { useState, useContext } from 'react';
import './newpopupform.css';
import axios from 'axios';
import { LocationContext } from "../../../context/LocationContext";
import { AuthContext } from "../../../context/AuthContext";

const NewPopupForm = () => {
    const { newPlace } = useContext(LocationContext);
    const { currentUser } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [star, setStar] = useState("0");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // JUST TESTING THE SENSORY ENDPOINT
            const response = await axios.get('http://localhost:8000/api/sensory-analysis', {
                params: { 
                    lat: newPlace.lat, 
                    lon: newPlace.long,
                    place_id: newPlace.placeId || "test-place-id" // Fallback for testing
                }
            });

            // Show the raw response
            alert(`Sensory Service Response:\n${JSON.stringify(response.data, null, 2)}`);
            console.log("Full response:", response);

        } catch (err) {
            console.error("Full error:", err);
            console.log("Error response:", err.response);
            setError(err.response?.data?.message || "Failed to call sensory service");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    placeholder="Enter a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <label>Description</label>
                <textarea
                    placeholder="Say something about this place."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                
                <label>Rating</label>
                <select 
                    value={star} 
                    onChange={(e) => setStar(e.target.value)}
                >
                    <option value="0" disabled>Select rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                
                <button 
                    type="submit" 
                    className="submitButton"
                    disabled={loading}
                >
                    {loading ? 'Testing...' : 'Test Sensory Service'}
                </button>
                
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <p>Check browser console for details</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default NewPopupForm;