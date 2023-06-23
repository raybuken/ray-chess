import { Piece } from "../Piece";
import { JumpInL } from "../utils/movements";

class Knight extends Piece{
    move(board, fromSquare, toSquare){
        const squares = [...board.squares];

        if(this.isLegalMove(fromSquare.position, toSquare.position)){
            squares[toSquare.position.x][toSquare.position.y].piece = fromSquare.piece
            squares[fromSquare.position.x][fromSquare.position.y].piece = null

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
        const {squares} = [...board]

        const moves = JumpInL(this, squares, position)
        return moves
    }

    isLegalMove(board, fromPosition, toPosition){
        const legalMoves = this.getLegalMoves(board, fromPosition)
        return legalMoves.some(move => move.x === toPosition.x && move.y === toPosition.y)
    }
}

export {Knight}