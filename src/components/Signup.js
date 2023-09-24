import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (cpassword !== password) {
            setErrorMessage("Password and confirm password must match");
            return; // Don't proceed with the submission
        }

        // Passwords match, clear any previous error message
        setErrorMessage("");
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Account Created Successfully","success")
        }
        else {
            props.showAlert("Invalid details","danger")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        setErrorMessage("");
    }
    return (
        <div className='conatiner mt-2'>
            <h2>Create an account to use iNotebook</h2><br/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="nameHelp" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div><br />
                <p className='matching'>{errorMessage}</p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
