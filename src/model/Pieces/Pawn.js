import { Move } from "../Move";
import { Piece } from "../Piece"
import { PLAYERS } from "../constants";
import { PROMOTION } from "../promotion";

class Pawn extends Piece{

    constructor(color){
        super(color)
        this.promotion = null
    }

    move(board, fromSquare, toSquare){
        const squares = [...board.squares];

        if(this.isLegalMove(board, fromSquare.position, toSquare.position)){
            //check if should remove adjacent piece
            const {lastMove} = board
            let enPassantValidation = lastMove?.hasEnPassant && lastMove.to.x === fromSquare.position.x
            if(enPassantValidation){
                squares[lastMove.to.x][lastMove.to.y].piece = null
            }

            //set enPassant Property
            const hasEnPassantChance = Math.abs(fromSquare.position.x - toSquare.position.x) === 2

            //promotion
            const Promotion = PROMOTION[this.promotion] ?? PROMOTION.QUEEN
            if((board.playingNow === PLAYERS.WHITE && toSquare.position.x === 7) || (board.playingNow === PLAYERS.BLACK && toSquare.position.x === 0)){
                fromSquare.piece = new Promotion(board.playingNow) //instance any piece to promote
            }

            const isCapture = Boolean(toSquare.piece)
            squares[toSquare.position.x][toSquare.position.y].piece = fromSquare.piece
            squares[fromSquare.position.x][fromSquare.position.y].piece = null

            return {
                ok: true,
                squares,
                lastMove: new Move(fromSquare.position, toSquare.position, "Pawn", isCapture, hasEnPassantChance)
            }
        }

        return {
            ok: false,
            msg: 'Illegal move!'
        }
    }

    getLegalMoves(board, position){
        const squares = [...board.squares]
        let moves = []

        if(this.color === PLAYERS.WHITE) {
            let square;
            //common move
            square = squares[position.x + 1][position.y]
            if(!square.piece){
                moves.push(square)
            }
            //initial move
            square = squares[position.x + 2]?.[position.y]
            if(position.x === 1 && !squares[position.x +1][position.y]?.piece && !square.piece){
                moves.push(square)
            }

            //capture
            square = squares[position.x + 1]?.[position.y + 1]
            if(square && square.piece && square.piece.color !== this.color){
                moves.push(square)
            }
            square = squares[position.x + 1]?.[position.y -1]
            if(square && square.piece && square.piece.color !== this.color){
                moves.push(square)
            }

            //en passant
            const {lastMove} = board
            const lateralSquare = lastMove?.hasEnPassant && lastMove.type === "Pawn" && squares[lastMove.to.x][lastMove.to.y]

            if(lateralSquare && position.x === lateralSquare?.position.x){
                moves.push(squares[position.x + 1][lastMove.to.y])
            }
        }else{
            let square;
            //common move
            square = squares[position.x - 1][position.y]
            if(square && !square.piece){
                moves.push(squares[position.x - 1][position.y])
            }

            //initial move
            square = squares[position.x - 2]?.[position.y]
            if(position.x === squares.length - 2 && squares[position.x - 1][position.y] && !squares[position.x - 1][position.y].piece && square && !square.piece){
                moves.push(square)
            }

            //capture
            square = squares[position.x - 1]?.[position.y - 1]
            if(square?.piece && square.piece.color !== this.color){
                moves.push(square)
            }
            square = squares[position.x - 1]?.[position.y + 1]
            if(square?.piece && square.piece.color !== this.color){
                moves.push(square)
            }

            //en passant
            const {lastMove} = board
            const lateralSquare = lastMove?.hasEnPassant && lastMove.type === "Pawn" && squares[lastMove.to.x][lastMove.to.y]

            if(lateralSquare && position.x === lateralSquare?.position.x){
                moves.push(squares[position.x - 1][lastMove.to.y])
            }

        }

        return moves
    }

    isLegalMove(board, fromPosition, toPosition){
        const legalMoves = this.getLegalMoves(board, fromPosition)
        return legalMoves.some(square => square.position.x === toPosition.x && square.position.y === toPosition.y)
    }
}

export {Pawn}