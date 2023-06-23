import { Piece } from "../Piece"
import { PLAYERS } from "../constants";
import { PROMOTION } from "../promotion";

class Pawn extends Piece{

    constructor(){
        super()
        this.enPassant = false
        this.promotion = null
    }

    move(board, fromSquare, toSquare){
        //TODO promotions
        const squares = [...board.squares];

        if(this.isLegalMove(fromSquare.position, toSquare.position)){
            //check if should remove adjacent piece
            let enPassantValidation = board.playingNow === PLAYERS.WHITE ? fromSquare.position.x === 4 : fromSquare.position.x === 3
            if(enPassantValidation){
                if(toSquare.position.y === fromSquare.position.y + 1 && squares[fromSquare.position.x][toSquare.position.y + 1].piece.enPassant){
                    squares[fromSquare.position.x][toSquare.position.y + 1].piece = null
                }
                if(toSquare.position.y === fromSquare.position.y - 1 && squares[fromSquare.position.x][toSquare.position.y + 1].piece.enPassant){
                    squares[fromSquare.position.x][toSquare.position.y - 1].piece = null
                }
            }

            //set enPassant Property
            if(Math.abs(fromSquare.position.x - toSquare.position.x) === 2){
                fromSquare.piece.enPassant = true
            }

            let promotion = PROMOTION[this.promotion] ?? PROMOTION.QUEEN
            if((board.playingNow === PLAYERS.WHITE && toSquare.position.x === 7) || (board.playingNow === PLAYERS.BLACK && toSquare.position.x === 0)){
                fromSquare.piece = new promotion() //instance any piece to promote
            }

            squares[toSquare.position.x][toSquare.position.y].piece = fromSquare.piece
            squares[fromSquare.position.x][fromSquare.position.y] = null

            return {
                ok: true,
                squares
            }
        }

        return {
            ok: false,
            msg: 'Illegal move!',
            squares
        }
    }

    getLegalMoves(board, position){
        const squares = [...board.squares]
        let moves = []
        let { playingNow } = board

        if(playingNow === PLAYERS.WHITE) {
            let square;
            //common move
            square = squares[position.x + 1][position.y]
            if(!square.piece){
                moves.push(square)
            }
            //initial move
            square = squares[position.x + 2][position.y]
            if(position.x === 1 && !square.piece){
                moves.push(squares[square])
            }

            //capture
            square = squares[position.x + 1][position.y + 1]
            if(square && square.piece && square.piece.color !== this.color){
                moves.push(square)
            }
            square = squares[position.x + 1][position.y -1]
            if(square && square.piece && square.piece.color !== this.color){
                moves.push(square)
            }

            //en passant
            let lateralSquare1 = squares[position.x][position.y + 1]
            let lateralSquare2 = squares[position.x][position.y + -1]
            if(position.x === board.length - 3 && lateralSquare1 && lateralSquare1.piece && lateralSquare1.piece.enPassant && lateralSquare1.piece.color !== this.color) {
                moves.push(squares[position.x + 1][position.y + 1])
            }
            if(position.x === board.length - 3 && lateralSquare2 && lateralSquare2.piece && lateralSquare2.piece.enPassant && lateralSquare2.piece.color !== this.color) {
                moves.push(squares[position.x + 1][position.y + 1])
            }
        }else{
            //common move
            if(!squares[position.x - 1][position.y].piece){
                moves.push(squares[position.x - 1][position.y])
            }

            //initial move
            if(position.x === squares.length - 2 && !squares[position.x - 2][position.y].piece){
                moves.push(squares[position.x - 2][position.y])
            }

            //capture
            if(squares[position.x - 1][position.y - 1].piece && squares[position.x - 1][position.y - 1].piece.color !== this.color){
                moves.push(squares[position.x - 1][position.y - 1])
            }
            if(squares[position.x - 1][position.y + 1].piece && squares[position.x - 1][position.y + 1].piece.color !== this.color){
                moves.push(squares[position.x - 1][position.y + 1])
            }

            //en passant
            let lateralSquare1 = squares[position.x][position.y + 1]
            let lateralSquare2 = squares[position.x][position.y - 1]
            if(position.x === 4 && lateralSquare1 && lateralSquare1.piece && lateralSquare1.piece.enPassant && lateralSquare1.piece.color !== this.color) {
                moves.push(squares[position.x - 1][position.y + 1])
            }
            if(position.x === 4 && lateralSquare2 && lateralSquare2.piece && lateralSquare2.piece.enPassant && lateralSquare2.piece.color !== this.color) {
                moves.push(squares[position.x - 1][position.y - 1])
            }

        }
    }

    isLegalMove(board, fromPosition, toPosition){
        const legalMoves = this.getLegalMoves(board, fromPosition)
        return legalMoves.some(move => move.x === toPosition.x && move.y === toPosition.y)
    }
}

export {Pawn}