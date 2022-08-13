import React, { useState, createContext, useContext } from 'react'


export const BattleShipContext = createContext();

// Custom hook, para no tener que import BattleShipContext cada vez 

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

    // currentPlayer se usa para verificar los turnos.
    const [currentPlayer, setCurrentPlayer] = useState("user")
    // boardUser y boardComputer guardan los valores de cada casilla para cada tablero
    const [boardUser, setBoardUser] = useState(createBoard());
    const [boardComputer, setBoardComputer] = useState(createBoard());
    // isGameOn indica si el juego está en marcha
    const [isGameOn, setIsGameOn] = useState(false);
    // Cuenta los turnos, esto se usa en el useEffect en index para que la computadora dispare y en useEffect para determinar cuando alguien gana.
    const [userTurns, setUserTurns] = useState(0);
    const [computerTurns, setComputerTurns] = useState(0);


    // Código de valores de casilla.
    /* 
    0: empty
    1: part of ship
    2: shot ship
    3: missed
    */

    // Cambia el valor de la casilla correspondiente a 2, lo cual pintará el cuadro de rojo.
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
    // Cambia el valor de la casilla correspondiente a 1, lo cual pintará el cuadro de azul.
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

// Cambia el valor de la casilla correspondiente a 1, lo cual pintará el cuadro de negro.
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

    // Función de disparo. Primero obtiene el valor de la casilla disparada en el tablero correspondiente.
    // Dependiendo del valor elige en el switch la función que corresponde, si la casilla era vacía (0) activa la función missShip y cambia de turno de jugador.
    // Si había una parte de un barco (1), activa la función hitShip. El jugador vuelve a disparar.
    // Finalmente actualiza el conteo de turnos, los cuales son importantes en los useEffect de index.js
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
        if (shooter === "user" ) {
            setUserTurns(userTurns + 1);
        } 
        else {
            setComputerTurns(computerTurns + 1)
        }
    }


    // Modificar verdaderamente arrays con useState https://www.codingdeft.com/posts/react-usestate-array/


 // variables y actions contienen las variables y funciones que se mandan a través de useContext de forma similar al boilerplate de la academia.
    const variables = {
        currentPlayer, 
        boardUser,
        boardComputer,
        isGameOn,
        userTurns,
        computerTurns
    };
    const actions = {
        setCurrentPlayer,
        hitShip,
        missShip,
        drawShip,
        setIsGameOn,
        shoot,
        setUserTurns,
        setComputerTurns
    };



    return (
        <BattleShipContext.Provider value={{ variables, actions }}>
            {children}
        </BattleShipContext.Provider>
    )
}

