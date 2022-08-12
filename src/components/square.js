import React, { useState, useEffect } from 'react'
import { useBattleShipContext } from '../context/battleshipContext';


export const Square = ({ board, index }) => {
    /* 
    0: empty
    1: part of ship
    2: shot ship
    3: missed
    */

    const { variables, actions } = useBattleShipContext();
    const [value, setValue] = useState(0);
    


    const statusArray = [
        { description: "empty", value: 0, colorUser: "white", colorComputer: "white" },
        { description: "part of ship", value: 1, colorUser: "black", colorComputer: "white" },
        { description: "empty", value: 2, colorUser: "red", colorComputer: "red" },
        { description: "empty", value: 3, colorUser: "blue", colorComputer: "blue" }
    ]

    useEffect(() => {
        if (board === variables.boardUser) {
            setValue(variables.boardUser[index])
        } else {
            setValue(variables.boardComputer[index])
        }
        
        

        /* switch (value) {
            case 0:
                setBackgroundColor("white")
                break;
            case 1:
                setBackgroundColor("black")
            case 2:
                setBackgroundColor("red")
            case 3:
                setBackgroundColor("blue")

            default:
                break;
        } */

    }, [variables.boardUser])





    /* const getBackgroundColor = () => {
        if (board === variables.boardUser) {
            return statusArray.filter(x => x.value === value)[0].colorUser
        } else {
            return statusArray.filter(x => x.value === value)[0].colorComputer
        }

    } */

    if (board === variables.boardUser) {
        return (
            <div style={{ height: "10%", width: "10%", border: "solid black 1px", backgroundColor: value === 0 ? "white" : value === 1 ? "black" : value === 2 ? "red" : "blue" }}></div>
        )
    } else {
        return (
            <div style={{ height: "10%", width: "10%", border: "solid black 1px", backgroundColor: value === 0 ? "white" : value === 1 ? "pink" : value === 2 ? "red" : "blue" }}></div>
        )
    }
    
}

