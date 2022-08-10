import React, { useState, createContext, useContext } from 'react'


export const BattleShipContext = createContext();

// Custom hook

export const useBattleShipContext = () => {
    return useContext(BattleShipContext);
}







export const BattleShipProvider = ({ children }) => {

    
    const createBoard = () => {
        let board = [];
        for (let i = 0; i < 100; i++) {
            board.push(0)
        }
        return board
    }
    
    const [currentPlayer, setCurrentPlayer] = useState("user")
    const [boardUser, setBoardUser] = useState(createBoard());
    const [boardComputer, setBoardComputer] = useState(createBoard());
    
    
    // Funciones para disparo
    /* 
    0: empty
    1: part of ship
    2: shot ship
    3: missed
    */
    const hitShip = (player, index) => {
        if (player === "user") {
            setBoardComputer(boardComputer.map((x, i) => {
                return i === index ? 1 : x
            }))
        } else {
            setBoardUser(boardUser.map((x, i) => {
                return i === index ? 1 : x
            }))
        }
    }

    const missShip = (player, index) => {
        if (player === "user") {
            setBoardComputer(boardComputer.map((x, i) => {
                return i === index ? 3 : x
            }))
        } else {
            setBoardUser(boardUser.map((x, i) => {
                return i === index ? 3 : x
            }))
        }
    }




    const variables = {
        currentPlayer,
        boardUser,
        boardComputer
    };
    const actions = {
        hitShip,
        missShip
    };







    return (
        <BattleShipContext.Provider value={{ variables, actions }}>
            {children}
        </BattleShipContext.Provider>
    )
}

