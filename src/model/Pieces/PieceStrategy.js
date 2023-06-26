import { PLAYERS } from "../constants"

class PieceStrategy{
    constructor(piece, board){
        this.piece = piece
        this.board = board
    }

    move(fromSquare, toSquare){
        const action = this.piece.move(this.board, fromSquare, toSquare)

        if(action.ok){
            this.board.update(action.squares)
            this.board.playingNow = this.board.playingNow === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE
        }
    }

    getLegalMoves(position){
        return this.piece.getLegalMoves(this.board, position)
    }

    isLegalMove(fromPosition, toPosition){
        return this.piece.isLegalMove(this.board, fromPosition, toPosition)
    }
}

export { PieceStrategy }