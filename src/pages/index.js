import { Board } from "../components/board"
import { useBattleShipContext } from "../context/battleshipContext"
import { Ship_2, Ship_3, Ship_4, Ship_5 } from "../utils/ship";
import React, { useState, useEffect } from "react";



export default function Home() {

  const { variables, actions } = useBattleShipContext();
  const [userOccupiedIndexes, setUserOccupiedIndexes] = useState([]);
  const [computerOccupiedIndexes, setComputerOccupiedIndexes] = useState([]);
  const [playerScore, setPlayerScore] = useState(17);
  const [computerScore, setComputerScore] = useState(17);





  const userDestroyer = new Ship_2(variables.boardUser, userOccupiedIndexes);
  const userCruiser = new Ship_3(variables.boardUser, userOccupiedIndexes);
  const userSubmarine = new Ship_3(variables.boardUser, userOccupiedIndexes);
  const userBattleShip = new Ship_4(variables.boardUser, userOccupiedIndexes);
  const userCarrier = new Ship_5(variables.boardUser, userOccupiedIndexes);

  const computerDestroyer = new Ship_2(variables.boardUser, computerOccupiedIndexes);
  const computerCruiser = new Ship_3(variables.boardUser, computerOccupiedIndexes);
  const computerSubmarine = new Ship_3(variables.boardUser, computerOccupiedIndexes);
  const computerBattleShip = new Ship_4(variables.boardUser, computerOccupiedIndexes);
  const computerCarrier = new Ship_5(variables.boardUser, computerOccupiedIndexes);


  const placeShip = (ship, player) => {
    ship.placeShip();
    ship.indexes.forEach(x => {
      actions.drawShip(player, x)
    });

    if (player === "user") {
      setUserOccupiedIndexes(currentIndexes => {
        return [...currentIndexes, ...ship.indexes]
      });
    }
    else {
      setComputerOccupiedIndexes(currentIndexes => {
        return [...currentIndexes, ...ship.indexes]
      });
    }

  }

  const startGame = () => {
    actions.setGameIsOn(true);
  }



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <h1>Mensaje</h1>
        </div>
      </div>
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
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
          <button onClick={(e) => { placeShip(userDestroyer, "user"); e.currentTarget.disabled = true; }}>Destroyer</button>
          <button onClick={(e) => { placeShip(userCruiser, "user"); e.currentTarget.disabled = true; }}>Cruiser</button>
          <button onClick={(e) => { placeShip(userSubmarine, "user"); e.currentTarget.disabled = true; }}>Submarine</button>
          <button onClick={(e) => { placeShip(userBattleShip, "user"); e.currentTarget.disabled = true; }}>Battleship</button>
          <button onClick={(e) => { placeShip(userCarrier, "user"); e.currentTarget.disabled = true; }}>Carrier</button>
        </div>


        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-primary" onClick={() => { console.log("start game") }}>Start game</button>

        </div>

        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
          <button onClick={(e) => { placeShip(computerDestroyer, "computer"); e.currentTarget.disabled = true; }}>Destroyer</button>
          <button onClick={(e) => { placeShip(computerCruiser, "computer"); e.currentTarget.disabled = true; }}>Cruiser</button>
          <button onClick={(e) => { placeShip(computerSubmarine, "computer"); e.currentTarget.disabled = true; }}>Submarine</button>
          <button onClick={(e) => { placeShip(computerBattleShip, "computer"); e.currentTarget.disabled = true; }}>Battleship</button>
          <button onClick={(e) => { placeShip(computerCarrier, "computer"); e.currentTarget.disabled = true; }}>Carrier</button>
        </div>

      </div>

    </div>

  )
}
