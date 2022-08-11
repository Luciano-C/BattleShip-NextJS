import { Board } from "../components/board"
import { useBattleShipContext } from "../context/battleshipContext"
import { Ship_2 } from "../utils/ship";
import React, { useState, useEffect } from "react";


export default function Home() {

  const { variables, actions } = useBattleShipContext();


  const barquito = new Ship_2(variables.boardUser, []);

  /* useEffect(() => {

    console.log(barquito)
    barquito.placeShip();
    barquito.indexes.forEach(x => console.log(x))
    console.log(barquito.indexes[0])
    actions.drawShip("user", barquito.indexes[0])

  }, [])

  useEffect(() => {
    if (barquito.indexes !== []) {
      [...barquito.indexes].forEach(x => { actions.drawShip("user", x) });
    }
  }, []) */

  const startGame = () => {
    actions.drawShip("user", 1)
    actions.drawShip("user", 2)
    
  }

  useEffect(() => {
    console.log("hola")
    
    
  }, [variables.board])
  


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-around">

          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>Your board</h3>
            <Board board={variables.boardUser} player={"user"} />
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>Computer board</h3>
            <Board board={variables.boardComputer} player={"computer"} />
          </div>

        </div>
      </div>
      <div className="row">
        <button onClick={startGame}>Empezar</button>
      </div>

    </div>

  )
}
