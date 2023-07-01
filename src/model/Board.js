import { Square } from "./Square";
import { PLAYERS } from "./constants";
import {Position} from './Position'
import { Pawn } from "./Pieces/Pawn";
import { Rook } from "./Pieces/Rook";
import { Knight } from "./Pieces/Knight";
import { Bishop } from "./Pieces/Bishop";
import { King } from "./Pieces/King";
import { Queen } from "./Pieces/Queen";
import { PieceStrategy } from "./Pieces/PieceStrategy";

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
        this.squares = squares
        this.lastMove = lastMove
        this.playingNow = this.playingNow === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE

        this.isCheckmate()
    }

    isPlayerInCheck(squares = this.squares){
        const kingSquare = this.getKingSquare()
        return kingSquare.piece.isInCheck(squares, kingSquare.position)
    }

    hasAnyLegalMove(){
        for(let i=0; i < this.squares.length; i++){
            for (let j = 0; j < this.squares[i].length; j++) {
                const square = this.squares[i][j];
                
                if(square.piece && square.piece.color === this.playingNow){
                    const numOfLegalMoves = new PieceStrategy(square.piece, this).getLegalMoves(square.position).length
                    if(numOfLegalMoves > 0){
                        return true
                    }
                }
            }
        }
        
        return false
    }

    isCheckmate(){
        return this.isPlayerInCheck() && !this.hasAnyLegalMove()
    }

    getKingSquare(){
        for(let i=0;i<this.squares.length;i++){
            for(let j=0;j<this.squares[i].length;j++){
                const square = this.squares[i][j]
                const {piece} = square
                if(piece && piece.color === this.playingNow && piece instanceof King){
                    return square
                }
            }
        }
        throw new Error("Must have a king in the board!")
    }
}

export { Board }