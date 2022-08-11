import React, { useState } from 'react'


export const Square = ({ value, player }) => {
    /* 
    0: empty
    1: part of ship
    2: shot ship
    3: missed
    */
    const statusArray = [
        { description: "empty", value: 0, colorUser: "white", colorComputer: "white" },
        { description: "part of ship", value: 1, colorUser: "black", colorComputer: "white" },
        { description: "empty", value: 2, colorUser: "red", colorComputer: "red" },
        { description: "empty", value: 3, colorUser: "blue", colorComputer: "blue" }
    ]

    const [estado, setEstado] = useState(value);

    const getBackgroundColor = () => {
        if (player === "user") {
            return statusArray.filter(x => x.value === value)[0].colorUser
        } else {
            return statusArray.filter(x => x.value === value)[0].colorComputer
        }
    }


    return (
        <div style={{ height: "10%", width: "10%", border: "solid black 1px", backgroundColor: getBackgroundColor()}}></div>
    )
}

