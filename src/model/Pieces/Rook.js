import { Piece } from "../Piece";
import { Square } from "../Square";
import { horizontal, vertical } from "../utils/movements";

class Rook extends Piece{

    constructor(color){
        super(color)
        this.castling = true
    }

    move(board, fromSquare, toSquare){
        const squares = [...board.squares];

        if(this.isLegalMove(board, fromSquare.position, toSquare.position)){
            squares[toSquare.position.x][toSquare.position.y] = new Square(toSquare.position, fromSquare.piece)
            squares[fromSquare.position.x][fromSquare.position.y] = new Square(fromSquare.position)

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
        let squares = [...board.squares]
        const verticalMoves = vertical(this, squares, position)
        const horizontalMoves = horizontal(this, squares, position)
        const moves = [...horizontalMoves, ...verticalMoves]

        return moves
    }

    isLegalMove(board, fromPosition, toPosition){
        const legalMoves = this.getLegalMoves(board, fromPosition)
        return legalMoves.some(square => square.position.x === toPosition.x && square.position.y === toPosition.y)
    }
}

export { Rook }