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
    


    useEffect(() => {
        if (board === variables.boardUser) {
            setValue(variables.boardUser[index])
        } else {
            setValue(variables.boardComputer[index])
        }
        
    }, [variables.boardUser, variables.boardComputer])




    if (board === variables.boardUser) {
        return (
            <div style={{ height: "10%", width: "10%", border: "solid black 1px", backgroundColor: value === 0 ? "white" : value === 1 ? "black" : value === 2 ? "red" : "blue" }}></div>
        )
    } else {
        return (
            <div 
            onClick={
                () => {
                    if(variables.isGameOn && variables.currentPlayer === "user")
                    actions.shoot("user", index);
                }
            } 
            style={{ height: "10%", width: "10%", border: "solid black 1px", backgroundColor: value === 0 ? "white" : value === 1 ? "pink" : value === 2 ? "red" : "blue" }}></div>
        )
    }
    
}

