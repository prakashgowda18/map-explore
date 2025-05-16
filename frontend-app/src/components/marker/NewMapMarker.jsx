import React, { useState, useContext } from 'react';
import './newpopupform.css';
import axios from 'axios';
import { LocationContext } from "../../../context/LocationContext";
import { AuthContext } from "../../../context/AuthContext";

const NewPopupForm = () => {
    const { newPlace, setNewPlace } = useContext(LocationContext);
    const { currentUser } = useContext(AuthContext);

    // Form states
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [star, setStar] = useState("0");
    
    // Sensory data states
    const [sensoryData, setSensoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('sensory'); // 'sensory' or 'review'

    const handleGetSensoryData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:8000/api/sensory-analysis', {
                params: { 
                    lat: newPlace.lat, 
                    lon: newPlace.long,
                    place_id: newPlace.placeId || "test-place-id"
                }
            });
            setSensoryData(response.data);
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to get sensory data");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Your existing review submission logic here
            alert("Review submitted successfully!");
            setNewPlace(null); // Close the popup
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to submit review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="tab-buttons">
                <button 
                    onClick={() => setActiveTab('sensory')}
                    className={activeTab === 'sensory' ? 'active' : ''}
                >
                    Sensory Data
                </button>
                <button 
                    onClick={() => setActiveTab('review')}
                    className={activeTab === 'review' ? 'active' : ''}
                >
                    Add Review
                </button>
            </div>

            {activeTab === 'sensory' ? (
                <div className="sensory-tab">
                    <h3>Environment Analysis</h3>
                    <button 
                        onClick={handleGetSensoryData}
                        disabled={loading}
                        className="sensory-button"
                    >
                        {loading ? 'Analyzing...' : 'Check Environment'}
                    </button>

                    {sensoryData && (
                        <div className="sensory-results">
                            <h4>Current Conditions:</h4>
                            <ul>
                                <li>🔊 Noise: {sensoryData.scores.noise.level}</li>
                                <li>👥 Crowd: {sensoryData.scores.crowd.level}</li>
                                <li>💡 Light: {sensoryData.scores.light.level}</li>
                            </ul>
                            <p className="timestamp">
                                Last updated: {new Date(sensoryData.timestamp).toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmitReview} className="review-form">
                    <label>Title</label>
                    <input
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    
                    <label>Description</label>
                    <textarea
                        placeholder="Share your experience"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                    
                    <label>Rating</label>
                    <select 
                        value={star} 
                        onChange={(e) => setStar(e.target.value)}
                        required
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
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            )}

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default NewPopupForm;