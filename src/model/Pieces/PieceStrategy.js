import { King } from "./King"

class PieceStrategy{
    constructor(piece, board){
        this.piece = piece
        this.board = board
    }

    move(fromSquare, toSquare){
        if(this.piece.color !== this.board.playingNow) {
            return {ok: false}
        }

        const action = this.piece.move(this.board, fromSquare, toSquare)

        if(action.ok){
            this.board.update(action.squares, action.lastMove)
            return action
        }
        return action
    }

    getLegalMoves(position){
        let legalMoves = this.piece?.getLegalMoves(this.board, position) ?? []
        if(!(this.piece instanceof King)){
            const squares = [...this.board.squares]
            const fromSquare = squares[position.x][position.y].clone()
            
            legalMoves = legalMoves.filter(move => {
                //dissapear temporally piece from square to verify any discover check
                const toSquare = squares[move.position.x][move.position.y].clone()
                squares[move.position.x][move.position.y].piece = this.piece
                squares[position.x][position.y].piece = null

                const noInCheck = !this.board.isPlayerInCheck(squares)
                squares[move.position.x][move.position.y] = toSquare
                squares[position.x][position.y].piece = fromSquare.piece

                return noInCheck
            })
        }
        return legalMoves
    }

    isLegalMove(fromPosition, toPosition){
        return this.piece.isLegalMove(this.board, fromPosition, toPosition)
    }
}

export { PieceStrategy }