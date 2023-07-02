import { Move } from '../Move';
import {Piece} from '../Piece'
import { diagonal, horizontal, vertical } from '../utils/movements';

class Queen extends Piece{

    move(board, fromSquare, toSquare){
        const squares = [...board.squares];

        if(this.isLegalMove(board, fromSquare.position, toSquare.position)){
            const isCapture = Boolean(toSquare.piece)
            squares[toSquare.position.x][toSquare.position.y].piece = fromSquare.piece
            squares[fromSquare.position.x][fromSquare.position.y].piece = null

            return {
                ok: true,
                squares,
                lastMove: new Move(fromSquare.position, toSquare.position, "Queen", isCapture)
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
        const horizontalMoves = horizontal(this, squares, position)
        const verticalMoves = vertical(this, squares, position)
        const diagonalMoves = diagonal(this, squares, position)

        const moves = [...horizontalMoves, ...verticalMoves, ...diagonalMoves]

        return moves
    }

    isLegalMove(board, fromPosition, toPosition){
        const legalMoves = this.getLegalMoves(board, fromPosition)
        return legalMoves.some(square => square.position.x === toPosition.x && square.position.y === toPosition.y)
    }
}

export {Queen}