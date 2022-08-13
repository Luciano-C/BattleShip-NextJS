import { Board } from "../components/board"
import { useBattleShipContext } from "../context/battleshipContext"
import { Ship_2, Ship_3, Ship_4, Ship_5 } from "../utils/ship";
import React, { useState, useEffect } from "react";
import { chooseRandomIndex } from "../utils/functions";


// Componente que contiene la funcionalidad del juego y renderiza los tableros.
export default function Home() {

  // useContext 
  const { variables, actions } = useBattleShipContext();

  // Almacena la cantidad total de índices ocupados, al crear los barcos para el parámetro que restringe donde colocar los barcos porque ya hay otros. 
  // Ademas se utiliza para verificar que el usuario no inicie el juego si no están puestos todos los barcos.
  const [userOccupiedIndexes, setUserOccupiedIndexes] = useState([]);
  const [computerOccupiedIndexes, setComputerOccupiedIndexes] = useState([]);

  // Almacenan en variable de estado los índices de cada barco
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

  // Variable de estado que permite verificar si el usuario o computadora ganaron.
  const [hasUserWon, setHasUserWon] = useState(false);
  const [hasComputerWon, setHasComputerWon] = useState(false);

  // Se crean las instancias de cada barco para usuario y computadora.
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


  // Utiliza el método de los barcos para ubicarlos, almacena los índices en variables de estado y actualiza lo índices totales ocupados.
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



  // Verifican cuantas celdas con valor 1 (barco) quedan en el tablero del oponente.
  // Si no quedan, quiere decir que todos fueron hundidos (valor=2).
  const checkIfUserWon = () => {
    const checker = variables.boardComputer.filter(x => x === 1).length;
    if (checker === 0) {
      setHasUserWon(true)
    }
  }

  const checkIfComputerWon = () => {
    const checker = variables.boardUser.filter(x => x === 1).length;
    if (checker === 0) {
      setHasComputerWon(true)
    }
  }


  // Inicia el juego. Primero verifica que todos los barcos fueron ubicados, luego cambia la variable de useContext isGameOn a true.
  // El usuario siempre dispara primero.
  const startGame = () => {

    if (userOccupiedIndexes.length !== 17 || computerOccupiedIndexes.length !== 17) {
      alert("Falta poner naves");
      return
    }

    actions.setIsGameOn(true);
    actions.setCurrentPlayer("user");

  }

  // useEffect que verifica si hay un ganador después de cada turno (si isGameOn es true).
  useEffect(() => {

    if (variables.isGameOn) {
      checkIfUserWon();
      checkIfComputerWon();
      if (hasUserWon) {
        alert("Tú ganas")
        actions.setIsGameOn(false);
      }
      else if (hasComputerWon) {
        alert("Gana la computadora");
        actions.setIsGameOn(false);
      }
    }
  }, [variables.isGameOn, variables.userTurns, variables.computerTurns, variables.currentPlayer, hasUserWon, hasComputerWon])



// useEffect que hace que la computadora dispare. 
// Hay un timer para que la animación no sea tan rápida, pero este es opcional. Se podría utilizar sin timer.
// Si isGameOn es true y es turno de la computadora, se produce un disparo en una celda aleatoria en la cual no se haya producido un disparo anteriormente.
// Conforme progresan los turnos el filter parece demorarse más, por lo que el parámetro de tiempo del timer se disminuye conforme avanzan los turnos con la fórmula:
// 200 - 0.8 * computerTurns
  useEffect(() => {

    const timer = setTimeout(() => {
      if (variables.isGameOn && variables.currentPlayer === "computer") {
        variables.currentPlayer === "computer"
        actions.shoot("computer", chooseRandomIndex(variables.boardUser.filter(x => x !== 2 || x !== 3)))

      }
    }, 200 - 0.8 * variables.computerTurns)


    return () => clearTimeout(timer)



  }, [variables.currentPlayer, variables.computerTurns])


/* 
 Renderiza la página:
 - Hay un header con valor condicional mostrando un mensaje indicando iniciar el juego si no ha empezado, a quien le toca cuando el juego está en progreso.
 y quien gana al terminar el juego
 - Luego están los tableros
 - Luego están los botones que permiten añadir cada barco con la función onClick placeShip(), además se desactivan los botones una vez añadido cada barco, para evitar duplicados. 
 - Tambien se tiene un botón para iniciar el juego con la función onClick startGame() que también se desactiva al iniciar el juego.
*/
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <h1 className="text-white">{!variables.isGameOn && !hasUserWon && !hasComputerWon ? "Presiona start para empezar" : hasUserWon ? "Tú ganas" : hasComputerWon ? "Gana la computadora" : variables.currentPlayer === "user" ? "Es tu turno" : "Es turno de la computadora"}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-around">

          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3 className="text-white">Tu tablero</h3>
            <Board board={variables.boardUser} />
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3 className="text-white">Tablero Computadora</h3>
            <Board board={variables.boardComputer} />
          </div>

        </div>
      </div>
      <div className="row d-flex justify-content-center align-items-center ps-3">
        <div className="col-3 d-flex justify-content-center align-items-center">
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(userDestroyer, "user"); e.currentTarget.disabled = true; }}>Destroyer</button>
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(userCruiser, "user"); e.currentTarget.disabled = true; }}>Cruiser</button>
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(userSubmarine, "user"); e.currentTarget.disabled = true; }}>Submarine</button>
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(userBattleShip, "user"); e.currentTarget.disabled = true; }}>Battleship</button>
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(userCarrier, "user"); e.currentTarget.disabled = true; }}>Carrier</button>
        </div>


        <div className="col-3 d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-primary btn-lg ps-5 pe-5" onClick={(e) => { startGame(); if( userOccupiedIndexes.length === 17 || computerOccupiedIndexes.length === 17){e.currentTarget.disabled = true }}}>Start</button>
        </div>

        <div className="col-3 d-flex justify-content-center align-items-center ps-3">
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(computerDestroyer, "computer"); e.currentTarget.disabled = true; }}>Destroyer</button>
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(computerCruiser, "computer"); e.currentTarget.disabled = true; }}>Cruiser</button>
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(computerSubmarine, "computer"); e.currentTarget.disabled = true; }}>Submarine</button>
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(computerBattleShip, "computer"); e.currentTarget.disabled = true; }}>Battleship</button>
          <button className="btn btn-dark w-50 ms-2" onClick={(e) => { placeShip(computerCarrier, "computer"); e.currentTarget.disabled = true; }}>Carrier</button>
        </div>

      </div>

    </div>

  )
}
