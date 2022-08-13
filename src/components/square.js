import React, { useState, useEffect } from 'react'
import { useBattleShipContext } from '../context/battleshipContext';

// Componente que tiene la funcionalidad de cada cuadro
export const Square = ({ board, index }) => {
    /* 
    0: empty
    1: part of ship
    2: shot ship
    3: missed
    */

    const { variables, actions } = useBattleShipContext();
    // Valor del cuadro de acuerdo a índice y tablero correspondiente
    const [value, setValue] = useState(0);
    

    // Cada vez que cambian los tableros de usuario o computador actualiza el valor del cuadro.
    useEffect(() => {
        if (board === variables.boardUser) {
            setValue(variables.boardUser[index])
        } else {
            setValue(variables.boardComputer[index])
        }
        
    }, [variables.boardUser, variables.boardComputer])



    // Renderiza de acuerdo al tablero al cual pertenece. Lo cuadro del tablero del usuario no tienen funcionalidad onClick
    // Lo del tablero de la computador tienen funcionalidad onClick; se llama a la función shoot de useContext si es que el juego está en marcha y es turno del jugador
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
            style={{ height: "10%", width: "10%", border: "solid black 1px", backgroundColor: value === 0 ? "white" : value === 1 ? "white" : value === 2 ? "red" : "blue" }}></div>
        )
    }
    
}

