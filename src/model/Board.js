import { Square } from "./Square";
import { PLAYERS } from "./constants";

class Board {
    constructor(playingNow = PLAYERS.WHITE){
        this.reset(playingNow)
    }

    reset(playingNow){
        this.squares = [...new Array(8)].fill([...new Array(8)].fill(new Square()))
        this.playingNow = playingNow
        this.fivtyMovesDraw = 0
    }

    update(squares){
        //TODO Deshabilitar peon al paso cuando pase el turno
        //TODO logica para ir contando/reiniciando regla de 50 pasos
        //TODO detectar ahogado
        //TODO detectar jaque
        //TODO detectar jaquemate
        this.squares = squares
    }
}

export { Board }