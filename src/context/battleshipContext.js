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
    const [isGameOn, setIsGameOn] = useState(false);


    // Funciones para disparo
    /* 
    0: empty
    1: part of ship
    2: shot ship
    3: missed
    */
    const hitShip = (player, index) => {
        if (player === "computer") {
            setBoardUser(x => {
                return [
                    ...x.slice(0, index),
                    2,
                    ...x.slice(index + 1)
                ]
            })
        } else {
            setBoardComputer(x => {
                return [
                    ...x.slice(0, index),
                    2,
                    ...x.slice(index + 1)
                ]
            })

        }
    }

    const missShip = (player, index) => {
        if (player === "computer") {
            setBoardUser(x => {
                return [
                    ...x.slice(0, index),
                    3,
                    ...x.slice(index + 1)
                ]
            })
        } else {
            setBoardComputer(x => {
                return [
                    ...x.slice(0, index),
                    3,
                    ...x.slice(index + 1)
                ]
            })

        }
    }


    const drawShip = (player, index) => {
        if (player === "computer") {
            setBoardComputer(x => {
                return [
                    ...x.slice(0, index),
                    1,
                    ...x.slice(index + 1)
                ]
            })
        } else {
            setBoardUser(x => {
                return [
                    ...x.slice(0, index),
                    1,
                    ...x.slice(index + 1)
                ]
            })

        }
    }


    const shoot = (shooter, index) => {
        let value;
        if (shooter === "user") {
            value = boardComputer[index];
        } else {
            value = boardUser[index];
        }
        switch (value) {
            case 0:
                actions.missShip(shooter, index);
                if (shooter === "user") {
                    setCurrentPlayer("computer")
                }
                else {
                    setCurrentPlayer("user")
                }
                break;
            case 1:
                actions.hitShip(shooter, index);
                break;
        
            default:
                break;
        } 
    }


    // Modificar verdaderamente arrays con useState https://www.codingdeft.com/posts/react-usestate-array/



    const variables = {
        currentPlayer, 
        boardUser,
        boardComputer,
        isGameOn
    };
    const actions = {
        setCurrentPlayer,
        hitShip,
        missShip,
        drawShip,
        setIsGameOn,
        shoot
    };







    return (
        <BattleShipContext.Provider value={{ variables, actions }}>
            {children}
        </BattleShipContext.Provider>
    )
}

