import { Board } from "../model/Board"
import { PieceStrategy } from "../model/Pieces/PieceStrategy"

export const chessBoardReducer = (board, action) => {

    switch(action.type){
        case 'start':
            return new Board()
        case 'move':
            {
                if(action?.fromSquare?.piece && action.toSquare){
                    const pieceStrategy = new PieceStrategy(action.fromSquare.piece, board)
                    pieceStrategy.move(action.fromSquare, action.toSquare)
                }
                return board
            }
        default:
            throw new Error("Invalid action type")
    }
}