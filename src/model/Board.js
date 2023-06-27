import { Square } from "./Square";
import { PLAYERS } from "./constants";
import {Position} from './Position'
import { Pawn } from "./Pieces/Pawn";
import { Rook } from "./Pieces/Rook";
import { Knight } from "./Pieces/Knight";
import { Bishop } from "./Pieces/Bishop";
import { King } from "./Pieces/King";
import { Queen } from "./Pieces/Queen";

class Board {
    constructor(playingNow = PLAYERS.WHITE){
        this.reset(playingNow)
    }

    reset(playingNow){
        const newSquares = [...new Array(8)]
        for(let i= 0; i < newSquares.length; i++){
            let column = [...new Array(8)]

            for(let j = 0; j < column.length; j++){
                column[j] = new Square(new Position(i, j))
            }

            newSquares[i] = column
        }

        this.setBoardPieces(newSquares)

        this.squares = newSquares
        this.playingNow = playingNow
        this.fivtyMovesDraw = 0
        this.lastMove = null
    }

    setBoardPieces(squares){
        //Rook
        squares[0][0].piece = new Rook(PLAYERS.WHITE)
        squares[0][7].piece = new Rook(PLAYERS.WHITE)

        //Knight
        squares[0][6].piece = new Knight(PLAYERS.WHITE)
        squares[0][1].piece = new Knight(PLAYERS.WHITE)

        //Bishop
        squares[0][5].piece = new Bishop(PLAYERS.WHITE)
        squares[0][2].piece = new Bishop(PLAYERS.WHITE)
        
        //King and Queen
        squares[0][3].piece = new King(PLAYERS.WHITE)
        squares[0][4].piece = new Queen(PLAYERS.WHITE)

        squares[1] = squares[1].map(square => {
            square.piece = new Pawn(PLAYERS.WHITE)
            return square
        })

        //Rook
        squares[7][0].piece = new Rook(PLAYERS.BLACK)
        squares[7][7].piece = new Rook(PLAYERS.BLACK)

        //Knight
        squares[7][6].piece = new Knight(PLAYERS.BLACK)
        squares[7][1].piece = new Knight(PLAYERS.BLACK)

        //Bishop
        squares[7][5].piece = new Bishop(PLAYERS.BLACK)
        squares[7][2].piece = new Bishop(PLAYERS.BLACK)
        
        //King and Queen
        squares[7][3].piece = new King(PLAYERS.BLACK)
        squares[7][4].piece = new Queen(PLAYERS.BLACK)

        squares[6] = squares[6].map(square => {
            square.piece = new Pawn(PLAYERS.BLACK)
            return square
        })
    }

    update(squares, lastMove){
        //TODO logica para ir contando/reiniciando regla de 50 pasos
        //TODO detectar ahogado
        //TODO detectar jaque
        //TODO detectar jaquemate
        this.squares = squares
        this.lastMove = lastMove
        this.playingNow = this.playingNow === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE
    }
}

export { Board }