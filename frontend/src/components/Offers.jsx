import React from "react";
import "../styles/Offers.css"

function Offer ({offer, onDelete}) {

    const buttonLeftColor = () => {
        if (offer.trade_from === "49ERS") {
            return "ERS" ;
        }
        console.log('do we update picks on left correctly', offer.picksA);
        const temp = offer.trade_from;
        return temp;
    }

    const buttonRightColor = () => {
        if (offer.trade_to === "49ERS") {
            return "ERS" ;
        }
        const temp = offer.trade_to;
        return temp;
    }

    const checkWinner = () => {
        if (offer.calculation > 0) {
            return offer.trade_from;
        }
        else {
            return offer.trade_to;
        }
    }

    return (
   
        <div className="note-container">
            <div className="single-note">
            <div className="details">
                <div className={buttonLeftColor()}>
                    <div className="left">STARTING Team: {offer.trade_from}<br/> ranked {offer.rankingA}.</div>
                    <div className="left">Traded picks: <br/>{offer.picksA}</div>
                </div>
                <div className={buttonRightColor()}>
                    <div className="right">TARGET Team: {offer.trade_to} <br/>ranked {offer.rankingB}.</div>
                    <div className="right">Traded picks: <br/>{offer.picksB}</div>
                </div>
            </div>

                <div className="header">
                    <div className="value2">The {checkWinner()} came out ahead with value:</div>
                </div>
                <div className="header"><div className="value">{Math.abs(offer.calculation)}</div></div>

            </div>
            <div className="button-background">
            <button className="delete-button" onClick={() => onDelete(offer.id)}>
                Delete
            </button>
            </div>
        </div>
    

    );
}

export default Offer;