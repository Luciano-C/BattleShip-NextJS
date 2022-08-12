import { chooseRandomIndex } from "./functions";

class Ship {
    constructor(board, shipIndexes) {
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
    constructor(board, shipIndexes) {
        super(board, shipIndexes)
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
    constructor(board, shipIndexes) {
        super(board, shipIndexes)
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