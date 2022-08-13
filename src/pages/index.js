import { Board } from "../components/board"
import { useBattleShipContext } from "../context/battleshipContext"
import { Ship_2, Ship_3, Ship_4, Ship_5 } from "../utils/ship";
import React, { useState, useEffect } from "react";
import { chooseRandomIndex } from "../utils/functions";



export default function Home() {

  const { variables, actions } = useBattleShipContext();
  const [userOccupiedIndexes, setUserOccupiedIndexes] = useState([]);
  const [computerOccupiedIndexes, setComputerOccupiedIndexes] = useState([]);
  const [userShipIndexes, setUserShipIndexes] = useState({
    userDestroyer: [],
    userCruiser: [],
    userSubmarine: [],
    userBattleShip: [],
    userCarrier: [],
  })

  const [computerShipIndexes, setComputerShipIndexes] = useState({
    computerDestroyer: [],
    computerCruiser: [],
    computerSubmarine: [],
    computerBattleShip: [],
    computerCarrier: []
  })





  const userDestroyer = new Ship_2("userDestroyer", variables.boardUser, userOccupiedIndexes);
  const userCruiser = new Ship_3("userCruiser", variables.boardUser, userOccupiedIndexes);
  const userSubmarine = new Ship_3("userSubmarine", variables.boardUser, userOccupiedIndexes);
  const userBattleShip = new Ship_4("userBattleShip", variables.boardUser, userOccupiedIndexes);
  const userCarrier = new Ship_5("userCarrier", variables.boardUser, userOccupiedIndexes);

  const computerDestroyer = new Ship_2("computerDestroyer", variables.boardUser, computerOccupiedIndexes);
  const computerCruiser = new Ship_3("computerCruiser", variables.boardUser, computerOccupiedIndexes);
  const computerSubmarine = new Ship_3("computerSubmarine", variables.boardUser, computerOccupiedIndexes);
  const computerBattleShip = new Ship_4("computerBattleShip", variables.boardUser, computerOccupiedIndexes);
  const computerCarrier = new Ship_5("computerCarrier", variables.boardUser, computerOccupiedIndexes);


  const placeShip = (ship, player) => {
    ship.placeShip();
    ship.indexes.forEach(x => {
      actions.drawShip(player, x)
    });
    
    if (player === "user") {
      setUserShipIndexes({
        ...userShipIndexes, [ship.name]: [...ship.indexes]
      })
    }

    else {
      setComputerShipIndexes({
        ...computerShipIndexes, [ship.name]: [...ship.indexes]
      })
    }



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


  const getShipStatus = (player, ship) => {
    if (player === "user") {
      if (!userShipIndexes[ship.name].map(x => variables.boardUser[x]).includes(1)) {
        return "destroyed"
      } 
      else {
        return "alive"
      }
    } 
    else {
      if (!computerShipIndexes[ship.name].map(x => variables.boardComputer[x]).includes(1)) {
        return "destroyed"
      } 
      else {
        return "alive"
      }
    }
    
  }


  

  const startGame = () => {
    
    
    if (userOccupiedIndexes.length !== 17 || computerOccupiedIndexes.length !== 17) {
      alert("Falta poner naves");
      return
    }

    actions.setIsGameOn(true);
    
    
    
    let userShipConditions = [
      getShipStatus("user", userDestroyer),
      getShipStatus("user", userCruiser),
      getShipStatus("user", userSubmarine),
      getShipStatus("user", userBattleShip),
      getShipStatus("user", userCarrier)
    ]

    let computerShipConditions = [
      getShipStatus("computer", computerDestroyer),
      getShipStatus("computer", computerCruiser),
      getShipStatus("computer", computerSubmarine),
      getShipStatus("computer", computerBattleShip),
      getShipStatus("computer", computerCarrier)
    ]

    actions.setCurrentPlayer("user");



    

    console.log(userShipConditions)


    //console.log(getShipStatus("computer", computerDestroyer))
    
    
  }

  useEffect(() => {
    
    setTimeout(() => {
      if (variables.isGameOn && variables.currentPlayer === "computer") {
        variables.currentPlayer === "computer"
          actions.shoot("computer", chooseRandomIndex(variables.boardUser.filter(x => x !== 2 || x !== 3)))
        
        
      }
    }, 1000)
  
   
  }, [variables.currentPlayer])
  



  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <h1>{!variables.isGameOn ? "Presiona start para empezar" : variables.currentPlayer === "user" ? "Es tu turno" : "Es turno de la computadora"}</h1>
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
          <button className="btn btn-primary" onClick={() => { startGame() }}>Start game</button>

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
