import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
    const description = method === "login" ? "Not registered?" : "Already have an account?"
    const assist = method === "login" ? "" : "Make a Username and Password to register."

    const handleClick = () => {
        if (name === "Login") {
            navigate("/register")
        }
        else {
            navigate("/login");
        }
    }


    const handleSubmit = async (e) => {
       
        e.preventDefault();
        try {
            
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert("this account is not registered or username/password incorrect")
        } 
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div>Welcome to NFL Draft Calculator</div>
            <h1>{name}</h1>
            <p className="small">{assist}</p>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            
            <button className="form-button" type="submit">
                {name}
            </button>
            <div>{description}</div>
            <button className="swap-button" onClick ={handleClick}>Click Here.</button>
        </form>
    );




}

export default Form