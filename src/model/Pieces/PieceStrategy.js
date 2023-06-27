class PieceStrategy{
    constructor(piece, board){
        this.piece = piece
        this.board = board
    }

    move(fromSquare, toSquare){
        if(this.piece.color !== this.board.playingNow) {
            return
        }

        const action = this.piece.move(this.board, fromSquare, toSquare)

        if(action.ok){
            this.board.update(action.squares, action.lastMove)
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