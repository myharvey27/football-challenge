// home page is calculator page

import { useState, useEffect } from "react";
import api from "../api"
import CreateTableForSchema from "../components/Tables";
import Options from "../components/Options";
import Offer from "../components/Offers";
import TopBar from "../components/TopBar";
import "../styles/Home.css"



function Home() {

    const [offers, setOffers] = useState([]);
    // set names of teams
    const [trade_from, setTrade_from] = useState("CHARGERS");
    const [trade_to, setTrade_to] = useState("JAGUARS");
    // set starting ranking for tables
    const [rankingA, setRankingA] = useState(1);
    const [rankingB, setRankingB] = useState(32);
    // make list of picks for retrieval
    const [picksA, setPicksA] = useState("");
    const [picksB, setPicksB] = useState("")
    // calculate values of each team
    const [teamA, setTeamA] = useState(0);
    const [teamB, setTeamB] = useState(0);
    const [calculation, setCalculation] = useState(0);
    // handy UI helpers
    const [note, setNote] = useState("Select Picks to Change Value:");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getOffers();
    }, []);

    const getOffers = () => {
        api.get("/offers/offers/").then((res) => res.data).then((data) => 
            {console.log(data); setOffers(data)})
            .catch((err) => alert(err));
    }

    const deleteOffer = (id) => {
        api.delete(`/offers/offers/delete/${id}/`).then((res) => 
            {if (res.status === 204) {
                alert("Offer deleted!");
                getOffers();
            } else {
                alert("Error deleting offer.")
            }}).catch((err) => alert(err));
    }

    const storeOffer = () => {
        const data = {
            picksA,
            picksB,
            rankingA,
            rankingB,
            trade_from,
            trade_to,
            calculation,
          };
          if (picksA == "" || picksB == "") {
            alert("Make sure to select picks from both teams before saving an offer.");
            return;
          }
        api.post('/offers/offers/', data).then(
            (res) => {
                if (res.status === 201) {
                    alert("Offer Stored!");
                    getOffers();
                } else {
                    alert("Failed to store offer");
                }
            }
        ).catch((err) => alert(err))
    }

    const handleTable1State = (newValue, newPicks) => {
        
        setPicksA(newPicks.join(', '));
        let leftNum = 0;
        for (let i = 0; i < newValue.length; i++){
            leftNum += newValue[i];
        }
        const rounded = Math.round((leftNum + Number.EPSILON) * 100) / 100
        // case when no numbers are selected
        if (rounded === 0) {
            const new_calc = calculation + teamA;
            const round_var = Math.round((new_calc + Number.EPSILON) * 100) / 100 
            if (round_var === 0) {
                setNote("Select Picks to see trade value:");
            }
            else {
                setNote("Starting Team Gains:")
            }
            setCalculation(round_var);
            setTeamA(0);
            return;
        }
        // case when someone deselects a number
        if (teamA > rounded) {
            let sub_from_calc = teamA - rounded;
            let new_calc = calculation + sub_from_calc;
            const round_var = Math.round((new_calc + Number.EPSILON) * 100) / 100 
            setNote(new_calc >= 0 ? "Starting Team Gains:" : "Target Team Gains:");
            setCalculation(round_var);
            setTeamA(rounded);
            return;
        // case when someone selects a new number
        } else {
            let num_to_add = rounded - teamA;
            let new_calc = calculation - num_to_add; 
            const round_var3 = Math.round((new_calc + Number.EPSILON) * 100) / 100 
            setNote(new_calc >= 0 ? "Starting Team Gains:" : "Target Team Gains:");
            setCalculation(round_var3);
            setTeamA(rounded);
        }
    }

    const handleTable2State = (newValue, newPicks) => {
        //need to store picks as strings
        setPicksB(newPicks.join(', '));
       
        let rightNum = 0;
        for (let i = 0; i < newValue.length; i++){
            rightNum += newValue[i];
        }
        const rounded = Math.round((rightNum + Number.EPSILON) * 100) / 100
        // case when no numbers are selected
        if (rounded === 0) {
            const new_calc = calculation - teamB;
            const round_var = Math.round((new_calc + Number.EPSILON) * 100) / 100 
            if (round_var === 0) {
                setNote("Select Picks to see trade value:");
            }
            else {
                setNote("Target Team Gains:")
            }
            setCalculation(round_var);
            setTeamB(0);
            return;
        }
        // case when someone deselects a number
        if (teamB > rounded) {
            let add_to_calc = teamB - rounded;
            let new_calc = calculation - add_to_calc;
            const round_var = Math.round((new_calc + Number.EPSILON) * 100) / 100 
            setNote(new_calc >= 0 ? "Starting Team Gains:" : "Target Team Gains:");
            setCalculation(round_var);
            setTeamB(rounded);
            return;
        // case when someone selects a new number
        } else {
            let num_to_subtract = rounded - teamB;
            let new_calc = calculation + num_to_subtract; 
            const round_var3 = Math.round((new_calc + Number.EPSILON) * 100) / 100 
            setNote(new_calc >= 0 ? "Starting Team Gains:" : "Target Team Gains:");
            setCalculation(round_var3);
            setTeamB(rounded);
        }
    }

    const handleToggle = () => {
        setIsVisible(prevIsVisible => !prevIsVisible);
      }


    return (
    <>
    <TopBar/>
  
    <div className="page-flex">
        <div className="page-border">
            <div className="calculator-header">
            <h1 className="header-item">Calculator</h1>
            </div>
            <div className="calculator-header2">
                <div className="header-item2">
                    <div className={calculation >= 0 ? "calculation-positive": "calculation-negative"}>{note}</div>
                </div>
                <div className="header-item2">
                    <div className={calculation >= 0 ? "calculation-positive": "calculation-negative"}> {Math.abs(calculation)}</div>
                </div>
            </div>
            <div className="calculator-header3">
                <button className="header-item3" onClick={storeOffer}>Store Offer</button>
                </div>

            {/* <div className="scaled"> */}
            <div className="flex-container">
                <div className ="team-item">
                    <div className= "placeholder"> Value Selected: 
                        <div className="teamA">{teamA}</div>
                    </div>
                    <div className="form-custom">
                        <form >
                            <label name="trade_from"> STARTING Team:
                            <select id="trade_from"  value={trade_from} onChange={e => {
                            if (e.target.value === trade_to) {
                                alert("Choose two different teams.");
                                return;
                            };
                            setTrade_from(e.target.value)}}>
                                <Options/>
                            </select>
                            </label>
                    <div>
                        <label name="Ranking"> Season Finish:
                            <input type="number" step="1" min="1" max="32" value={rankingA} onChange={
                                e => 
                                { if (e.target.value > 32) {
                                    e.target.value = 32};
                                    if (e.target.value < 1) {
                                        e.target.value = 1};
                                    if (rankingB === e.target.value) {
                                            alert("Make sure teams have different season finishes.");
                                        
                                        }
                                    if (teamA !== 0 || teamB !== 0) {
                                        console.log("picks_A list", picksA);
                                        console.log("picks_B list", picksB);

                                        alert("Make sure to reset the calculator. Unclick any selected picks.")
                                        return;
                                    }
                                    setRankingA(e.target.value)}}></input>
                        </label>
                    </div>
                        </form>
                    </div>
                    <div className="center">
                        <CreateTableForSchema schemaKey={rankingA} change={handleTable1State} schemaCompensatory={trade_from}/>
                    </div>
                </div>
                <div className ="team-item">
                    <div className= "placeholder"> Value Selected: 
                        <div className="teamB">{teamB}</div>
                    </div>
                    <div className="form-custom">
                    <form >
                        <label name="trade_to" > TARGET Team:
                            <select id="trade_to" value={trade_to} onChange={e => {
                            if (e.target.value === trade_from) {
                                alert("Choose two different teams.");
                            };
                                setTrade_to(e.target.value); }}>
                                <Options/>
                            </select>
                        </label>
                        <div>
                        <label name="Ranking"> Season Finish:
                            <input type="number"  step="1" min="1" max="32" value={rankingB} onChange={                               
                                e => 
                                {  // error handlers
                                    if (e.target.value > 32) {
                                    e.target.value = 32};
                                    if (e.target.value < 1) {
                                        e.target.value = 1};
                                     if (rankingA === e.target.value) {
                                        alert("Make sure teams have different season finishes.");
                                        }
                                    if (teamA !== 0 || teamB!= 0) {
                                        alert("Make sure to reset the calculator. Unclick any selected picks.")
                                        return;
                                    }
                                    
                                    setRankingB(e.target.value)}}></input>
                        </label>
                        </div>
                    </form>
                    </div>
                <div className="center">
                    <CreateTableForSchema schemaKey={rankingB} change={handleTable2State} schemaCompensatory={trade_to}/>
                </div>
            </div>
            </div>
        </div> 
        
        <div className="button-offer">
            <button onClick={handleToggle} className="toggle-button">{isVisible ? 'Hide' : 'Show'} Stored Offers</button>
            {isVisible && (
            <div className="offer-container">  
                <div className="inner-offers">   
                
                {offers.toReversed().map((offer) => <Offer offer={offer} onDelete={deleteOffer} key={note.id}/>
                )}
                </div>  
         </div>
         )}
        </div>
    </div>
    <footer className="footer">
        <a target="_blank" href="https://www.drafttek.com/NFL-Trade-Value-Chart.asp">Powered by the Jimmy Johnson Draft Model</a>
        <div>Maya Harvey 2024</div>
        </footer>
    </>
    )
}

export default Home;