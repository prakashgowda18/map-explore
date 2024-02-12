import CancelIcon from '@mui/icons-material/Cancel'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import axios from "axios"
import { useRef, useState } from "react"
import "./register.css"

export default function Register() {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [ShowRegister, setShowRegister] = useState(true)
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try {
            await axios.post("http://localhost:8800/api/user/register", newUser)
            setError(false)
            setSuccess(true)
        } catch (err) {
            setSuccess(true)
            setError(true)

        }
    }

    const toggleRegisterForm = () => {
        setShowRegister(false)
    }
    return (
        <>
            {ShowRegister ? (
                <div className="registerContainer">
                    <div className="logo">
                        <LocationOnIcon className="logoIcon" />
                        <span>Map-Explore</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input autoFocus placeholder="username" ref={usernameRef} />
                        <input type="email" placeholder="email" ref={emailRef} />
                        <input
                            type="password"
                            min="6"
                            placeholder="password"
                            ref={passwordRef}
                        />
                        <button className="registerBtn" type="submit">
                            Register
                        </button>
                        {success && (
                            <span className="success">Successful..! You can login now!</span>
                        )}
                        {error && <span className="failure">Something went wrong!</span>}
                    </form>
                    <CancelIcon
                        className="registerCancel"
                        onClick={toggleRegisterForm}
                    />
                </div>)

                : null}
        </>
    )
}