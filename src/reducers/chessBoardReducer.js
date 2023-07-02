import { Board } from "../model/Board"
import { PieceStrategy } from "../model/Pieces/PieceStrategy"
import moveAudio from '../assets/sounds/move-self.mp3'
import checkAudio from '../assets/sounds/move-check.mp3'
import captureAudio from '../assets/sounds/capture.mp3'

const moveAudioEffect = new Audio(moveAudio)
const captureAudioEffect = new Audio(captureAudio)
const checkAudioEffect = new Audio(checkAudio)

export const chessBoardReducer = (board, action) => {

    switch(action.type){
        case 'start':
            return new Board()
        case 'move':
            {
                if(action?.fromSquare?.piece && action.toSquare){
                    const pieceStrategy = new PieceStrategy(action.fromSquare.piece, board)
                    const response = pieceStrategy.move(action.fromSquare, action.toSquare)
                    if(response.ok){
                        if(board.isPlayerInCheck()){
                            checkAudioEffect.play()
                        }else if(board.lastMove.isCapture){
                            captureAudioEffect.play()
                        }else{
                            moveAudioEffect.play()
                        }
                    }
                }
                return board
            }
        case 'reset':
            board.reset()
            return board
        default:
            throw new Error("Invalid action type")
    }
}