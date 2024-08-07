import { useState } from "react";
import React from "react";
import { SCHEMA } from "../constants";
import "../styles/Grid.css"



const CreateTableForSchema = ({schemaKey, change, schemaCompensatory})  => {
    const [buttonStates, setButtonStates] = useState([false, false, false, false, false, false, false, false, false, false, false]);
    const [toAdd, setVals] = useState([])
    const [pickvar, setPicks] = useState([])

    const schema = SCHEMA[schemaKey];
    const comp_schema = SCHEMA[schemaCompensatory];
    if (!schema === true) {
        alert("Make sure to enter a whole number ranking 1-32.")
        return (
         <div></div>
        ); 
    } 

    let picks = schema.picks;
    let values = schema.values;

    if (comp_schema) {
        const comp_picks = comp_schema.picks;
        const comp_values = comp_schema.values;
        picks = picks.concat(comp_picks);
        values = values.concat(comp_values);

    } 

    const handleClick = (index) => {
        
        //button UI handler
        setButtonStates((prevStates) =>
            prevStates.map((state, i) => (i === index ? !state : state))
          );
        
        var temp = [...toAdd];
        var picktemp = [...pickvar];
        if (!temp.includes(values[index])) {
            //means new value clicked, add value to array
            picktemp.push(picks[index])
            temp.push(values[index])
            setVals(temp);
            setPicks(picktemp);
            change(temp, picktemp);
            return
        }
        if (temp.includes(values[index])) {
            //means user unclicked, remove value from array   
            if (temp.length === 1) {
                console.log("picks values", temp);
                temp = [];
                picktemp = []
                setVals(temp);
                setPicks(picktemp);
                change(temp, picktemp);
                return
            }
            else {
                console.log("picks values", temp);
                const tempIndex = temp.indexOf(values[index])
                temp.splice(tempIndex, 1);
                console.log("picks values after splice", temp);
                setVals(temp);

                const picktempIndex = picktemp.indexOf(picks[index])
                picktemp.splice(picktempIndex, 1);
                setPicks(picktemp);
                change(temp, picktemp);
                return
            }
        }

        return console.log('error with state array');
    }

    const buttonColor = (i) => {
        if (i < 7) {           
            if (buttonStates[i]) {
                return 'button-true'; 
            } else {
                return 'button-false';
            }}
        else {
            if (buttonStates[i]) {
                return 'button-compensatory-true';
            } else {
                return 'button-compensatory-false';
            }
        }

    }

    return (
        <div>
      <div className="grid-container">
       <div >
        <div className="grid-item-table-pv">PICKS</div>
        {picks.map((pick, i) => (
        <button onClick={() => {handleClick(i);}} className={buttonColor(i)} key={i}>{pick}</button>
        ))}
       </div>
       <div>
       <div className="grid-item-table-pv">VALUES</div>
       <div>    
       {values.map((value, i) => (
            <div className="grid-item-table" key={i}>{value}</div>
        ))}
       </div>
       </div>
      </div>
      <div>

      </div>
      </div>
    );
}

export default CreateTableForSchema;