import React from "react";
import "../styles/TopBar.css"
import {useNavigate } from "react-router-dom"


function TopBar() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/logout");
    }


    return (
        <div className="top">
        <div className="topbar">
            <div className="title">
            NFL Draft Tool Calculator
            </div>
            {/* <div>Hi {user}</div> */}
            <div className="logout">
                <button className= "logout-button" onClick = {handleSubmit}>Logout</button>
            </div>
        </div>
            <div className="description"><p>Choose a Starting Team, Target Team, and Season Finishes. Picks in green are based on season finish, picks in blue respresent Compensatory picks for each team.
            </p>
            </div>
        </div>
    );

}

export default TopBar;