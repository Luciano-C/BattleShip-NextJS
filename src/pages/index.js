import { Board } from "../components/board"
import { useBattleShipContext } from "../context/battleshipContext"
import { Ship_2, Ship_3, Ship_4, Ship_5 } from "../utils/ship";
import React, { useState, useEffect } from "react";



export default function Home() {

  const { variables, actions } = useBattleShipContext();
  const [userOccupiedIndexes, setUserOccupiedIndexes] = useState([]);


  const userShips = [
    {data: new Ship_5(variables.boardUser, userOccupiedIndexes)},
    {data: new Ship_4(variables.boardUser, userOccupiedIndexes)},
    {data: new Ship_3(variables.boardUser, userOccupiedIndexes)},
    {data: new Ship_3(variables.boardUser, userOccupiedIndexes)},
    {data: new Ship_2(variables.boardUser, userOccupiedIndexes)}
  ]

  /* const userDestroyer = new Ship_2(variables.boardUser, userOccupiedIndexes);
  const userCruiser = new Ship_3(variables.boardUser, userOccupiedIndexes);
  const userSubmarine = new Ship_3(variables.boardUser, userOccupiedIndexes);
  const userBattleShip = new Ship_4(variables.boardUser, userOccupiedIndexes);
  const userCarrier = new Ship_5(variables.boardUser, userOccupiedIndexes); */


  const placeShips = () => {
    
    
    userShips.forEach(ship => {
      ship.data.placeShip();
      ship.data.indexes.forEach(x => {
        actions.drawShip("user", x)
      });
      setUserOccupiedIndexes(currentIndexes => {
        return [...currentIndexes, ...ship.data.indexes]
      });
    })
    
    
    /* userCarrier.placeShip();
    userCarrier.indexes.forEach(x => {
      actions.drawShip("user", x)
    })
    setUserOccupiedIndexes(currentIndexes => {
      return [...currentIndexes, ...userCarrier.indexes]
    }) */

    

  }


  const startGame = () => {
    
    placeShips();
    
    /* barquito.placeShip();
    console.log(barquito.indexes)
    barquito.indexes.forEach(x => {
      actions.drawShip("user", x)
    }) */


    /* barco.placeShip();
    console.log(barco.indexes)
    console.log(barco.bannedIndexes)
    barco.indexes.forEach(x => {
      actions.drawShip("user", x)
    }) */

    /* barcote.placeShip();
    console.log(barcote.indexes)
    console.log(barcote.bannedIndexes)
    barcote.indexes.forEach(x => {
      actions.drawShip("user", x)
    }) */

    /* barcotote.placeShip();
    console.log(barcotote.indexes)
    console.log(barcotote.bannedIndexes)
    barcotote.indexes.forEach(x => {
      actions.drawShip("user", x)
    }) */

  }





  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-around">

          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>Your board</h3>
            <Board board={variables.boardUser} />
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3>Computer board</h3>
            <Board board={variables.boardComputer} />
          </div>

        </div>
      </div>
      <div className="row">
        <button onClick={() => { startGame() }}>Empezar</button>
      </div>

    </div>

  )
}
