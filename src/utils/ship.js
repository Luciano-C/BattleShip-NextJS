import { chooseRandomIndex } from "./functions";


/* 
En este archivo se definen los barcos como clases, con sus atributos y funcionalidades. Para poder explicarlos considerar el tablero de la siguiente forma:

Tablero
           00,01,02,03,04,05,06,07,08,09,
           10,11,12,13,14,15,16,17,18,19,
           .
           .
           90,91,92,93,94,95,96,97,98,99
this.name = Nombre del barco, este es utilizado para actualizar dinámicamente los objetos de estado en index que contienen los índices de cada barco
this.board = Tablero al cual pertenece el barco
this.shipIndexes = Corresponden a los índices del tablero que ya tienen barcos. Esto se usa como restricción para no poner barcos encima de otros.
this.orientation = Orientación del barco (horizontal o vertical)
this.indexes =  Lo índices que tendrá el barco en el tablero.

Se definen 4 clases hija (barcos de 2,3,4 y 5 cuadros)
Las clases hijas además poseen lo siguiente:

placeShip(): Elige aleatoriamente un lugar para la parte inicial del barco, luego dependiendo de la orientación y el tamaño determina los otros índices.
const errors contiene las restricciones para ubicar el barco y son de 2 tipos:
- La primera es la que se mencionó anteriormente respecto a posicionar barcos encima de otros
- La segunda corresponde a restricciones naturales para el barco respecto al tablero. Para esto considerar que los barcos horizontales simpre son construidos hacia la derecha
y los barcos verticales siempre hacia abajo. Para explicar mejor un ejemplo:
  El comienzo barco de 2 cuadros horizontal no puede estar ubicado en la columna 09, 19, 29....99 porque el cuadro que sigue quedaría en 00, 10, 20...90, lo cual dividiría el barco;
  de la misma manera el comienzo de un barco vertical no puede estar en la fila 90, 91, 92....99 porque el final del barco quedaría en la fila 100, 101, 102... lo cual lo dejaría fuera del tablero.
  El mismo razonamiento se aplica para barcos de 3, 4 y 5 cuadros, pero la fila y columna de inicio se va recorriendo hacia la izquierda (para barcos horizontales) o arriba (barcos verticales) cada
  vez que se aumenta de tamaño el barco.
  Si el barco cumple con todas las restricciones se ubica en el tablero, si no las cumple la función se llama a si misma nuevamente y lo intenta denuevo.

*/


class Ship {
    constructor(name, board, shipIndexes) {
        this.name = name;
        // Tablero al que pertenece: []
        this.board = board;
        // Indices que no se pueden ocupar, porque quedarían partes fuera del tablero o chocaría con otros barcos: [[]]
        this.bannedIndexes = [];
        // Indices que no se pueden ocupar porque hay otros barcos
        this.shipIndexes = shipIndexes
        // Orientación del barco: string
        let orientations = ["horizontal", "vertical"];
        this.orientation = orientations[chooseRandomIndex(orientations)];
        // Índices del tablero donde estará posicionado el barco
        this.indexes = [];

    }

}

export class Ship_2 extends Ship {
    constructor(name, board, shipIndexes) {
        super(name, board, shipIndexes)
    }


    placeShip() {
        
        // Se elige el inicio del barco
        this.indexes.push(chooseRandomIndex(this.board));

        switch (this.orientation) {
            case "horizontal":
                // Se llena el resto de los indices de acuerdo a orientación    
                for (let i = 1; i < 2; i++) {
                    this.indexes.push(this.indexes[i - 1] + 1)
                };

                // Añade a los índices baneados en la primera parte del barco: 9 para la fila 0; 19 para la fila 1 .....99 para la fila 9
                for (let i = 0; i < 10; i++) {
                    this.bannedIndexes.push([i * 10 + 9, i * 10 + 10])
                }

                break;

            case "vertical":
                // Se llena el resto de los indices de acuerdo a orientación 
                for (let i = 1; i < 2; i++) {
                    this.indexes.push(this.indexes[i - 1] + 10)
                }

                // Añade a los índices baneados en la primera parte del barco: [90, 0], [91, 1], ....[99, 9]
                for (let i = 0; i < 10; i++) {
                    this.bannedIndexes.push([i + 90, i * 1])
                }

                break;
        }

        const errors = [
            // Posicion
            this.bannedIndexes.map(x => x[0]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[1]),
            this.shipIndexes.includes(this.indexes[0]),
            this.shipIndexes.includes(this.indexes[1])
        ]

        if (errors.includes(true)) {
            console.log("denuevo");
            this.indexes = [];
            this.placeShip();
        }
        
    }
}


export class Ship_3 extends Ship {
    constructor(name, board, shipIndexes) {
        super(name, board, shipIndexes)
    }


    placeShip() {
        /* 
        Tablero
           00,01,02,03,04,05,06,07,08,09,
           10,11,12,13,14,15,16,17,18,19
           .
           .
           90,91,92,93,94,95,96,97,98,99
           */
        // Se elige el inicio del barco
        this.indexes.push(chooseRandomIndex(this.board));

        switch (this.orientation) {
            case "horizontal":
                // Se llena el resto de los indices de acuerdo a orientación    
                for (let i = 1; i < 3; i++) {
                    this.indexes.push(this.indexes[i - 1] + 1)
                };

                // Añade a los índices baneados en la primera parte del barco: 8, 9 para la fila 0; 18, 19 para la fila 1 .....98, 99 para la fila 9
                for (let i = 0; i < 10; i++) {
                    this.bannedIndexes.push([i * 10 + 8, i * 10 + 9, i * 10 + 10])
                }

                break;

            case "vertical":
                // Se llena el resto de los indices de acuerdo a orientación 
                for (let i = 1; i < 3; i++) {
                    this.indexes.push(this.indexes[i - 1] + 10)
                }

                // Añade a los índices baneados en la primera parte del barco: [80, 90, 0], [81, 91, 1], ....[89, 99, 9]
                for (let i = 0; i < 10; i++) {
                    this.bannedIndexes.push([i + 80, i + 90, i * 1])
                }

                break;
        }

        const errors = [
            this.bannedIndexes.map(x => x[0]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[1]),
            this.shipIndexes.includes(this.indexes[0]),
            this.shipIndexes.includes(this.indexes[1]),
            this.shipIndexes.includes(this.indexes[2]),
            
        ]


        if (errors.includes(true)) {
            console.log("denuevo");
            this.indexes = [];
            this.placeShip();
        }

    }
}

export class Ship_4 extends Ship {
    constructor(name, board, shipIndexes) {
        super(name, board, shipIndexes)
    }


    placeShip() {
        /* 
        Tablero
           00,01,02,03,04,05,06,07,08,09,
           10,11,12,13,14,15,16,17,18,19
           .
           .
           90,91,92,93,94,95,96,97,98,99
           */
        // Se elige el inicio del barco
        this.indexes.push(chooseRandomIndex(this.board));

        switch (this.orientation) {
            case "horizontal":
                // Se llena el resto de los indices de acuerdo a orientación    
                for (let i = 1; i < 4; i++) {
                    this.indexes.push(this.indexes[i - 1] + 1)
                };

                // Añade a los índices baneados en la primera parte del barco: 8, 9 para la fila 0; 18, 19 para la fila 1 .....98, 99 para la fila 9
                for (let i = 0; i < 10; i++) {
                    this.bannedIndexes.push([i * 10 + 7, i * 10 + 8, i * 10 + 9, i * 10 + 10])
                }

                break;

            case "vertical":
                // Se llena el resto de los indices de acuerdo a orientación 
                for (let i = 1; i < 4; i++) {
                    this.indexes.push(this.indexes[i - 1] + 10)
                }

                // Añade a los índices baneados en la primera parte del barco: [80, 90, 0], [81, 91, 1], ....[89, 99, 9]
                for (let i = 0; i < 10; i++) {
                    this.bannedIndexes.push([i + 70, i + 80, i + 90, i * 1])
                }

                break;
        }

        const errors = [
            this.bannedIndexes.map(x => x[0]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[1]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[2]),
            this.bannedIndexes.map(x => x[2]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[2]).includes(this.indexes[1]),
            this.bannedIndexes.map(x => x[2]).includes(this.indexes[2]),
            this.shipIndexes.includes(this.indexes[0]),
            this.shipIndexes.includes(this.indexes[1]),
            this.shipIndexes.includes(this.indexes[2]),
            this.shipIndexes.includes(this.indexes[3])
            
        ]


        if (errors.includes(true)) {
            console.log("denuevo");
            this.indexes = [];
            this.placeShip();
        }

    }
}


export class Ship_5 extends Ship {
    constructor(name, board, shipIndexes) {
        super(name, board, shipIndexes)
    }


    placeShip() {
        /* 
        Tablero
           00,01,02,03,04,05,06,07,08,09,
           10,11,12,13,14,15,16,17,18,19
           .
           .
           90,91,92,93,94,95,96,97,98,99
           */
        // Se elige el inicio del barco
        this.indexes.push(chooseRandomIndex(this.board));

        switch (this.orientation) {
            case "horizontal":
                // Se llena el resto de los indices de acuerdo a orientación    
                for (let i = 1; i < 5; i++) {
                    this.indexes.push(this.indexes[i - 1] + 1)
                };

                // Añade a los índices baneados en la primera parte del barco: 8, 9 para la fila 0; 18, 19 para la fila 1 .....98, 99 para la fila 9
                for (let i = 0; i < 10; i++) {
                    this.bannedIndexes.push([i * 10 + 6, i * 10 + 7, i * 10 + 8, i * 10 + 9, i * 10 + 10])
                }

                break;

            case "vertical":
                // Se llena el resto de los indices de acuerdo a orientación 
                for (let i = 1; i < 5; i++) {
                    this.indexes.push(this.indexes[i - 1] + 10)
                }

                // Añade a los índices baneados en la primera parte del barco: [80, 90, 0], [81, 91, 1], ....[89, 99, 9]
                for (let i = 0; i < 10; i++) {
                    this.bannedIndexes.push([i + 60, i + 70, i + 80, i + 90, i * 1])
                }

                break;
        }

        const errors = [
            this.bannedIndexes.map(x => x[0]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[1]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[2]),
            this.bannedIndexes.map(x => x[1]).includes(this.indexes[3]),
            this.bannedIndexes.map(x => x[2]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[2]).includes(this.indexes[1]),
            this.bannedIndexes.map(x => x[2]).includes(this.indexes[2]),
            this.bannedIndexes.map(x => x[2]).includes(this.indexes[3]),
            this.bannedIndexes.map(x => x[3]).includes(this.indexes[0]),
            this.bannedIndexes.map(x => x[3]).includes(this.indexes[1]),
            this.bannedIndexes.map(x => x[3]).includes(this.indexes[2]),
            this.bannedIndexes.map(x => x[3]).includes(this.indexes[3]),
            this.shipIndexes.includes(this.indexes[0]),
            this.shipIndexes.includes(this.indexes[1]),
            this.shipIndexes.includes(this.indexes[2]),
            this.shipIndexes.includes(this.indexes[3]),
            this.shipIndexes.includes(this.indexes[4])
            
        ]


        if (errors.includes(true)) {
            console.log("denuevo");

            this.indexes = [];
            this.placeShip();
            
        }

    }
}