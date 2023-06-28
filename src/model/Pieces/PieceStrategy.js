import { King } from "./King"

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
        let legalMoves = this.piece?.getLegalMoves(this.board, position) ?? []
        if(this.board.isPlayerInCheck() && !(this.piece instanceof King)){
            legalMoves = legalMoves.filter(move => {
                const squares = [...this.board.squares]
                const oldSquare = {...squares[move.position.x][move.position.y]}
                squares[move.position.x][move.position.y].piece = this.piece

                const isInCheck = !this.board.isPlayerInCheck(squares)
                squares[move.position.x][move.position.y] = oldSquare

                return isInCheck
            })
        }
        return legalMoves
    }

    isLegalMove(fromPosition, toPosition){
        return this.piece.isLegalMove(this.board, fromPosition, toPosition)
    }
}

export { PieceStrategy }