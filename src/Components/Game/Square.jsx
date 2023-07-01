import { useContext } from "react"
import Piece from "./Piece"
import { BoardDispatchContext, ChessBoardContext } from "../../context/chessBoardContext"
import { PLAYERS } from "../../model/constants"
import { Pawn } from "../../model/Pieces/Pawn"
import { Position } from "../../model/Position"
import { PieceStrategy } from "../../model/Pieces/PieceStrategy"
import { King } from "../../model/Pieces/King"

function Square({square, squareColor, highlightMove, updateLegalMoves, updatePromotion, fromSquare, updateFromSquare}){
    const board = useContext(ChessBoardContext)
    const dispatch = useContext(BoardDispatchContext)
    const isIncheck = square.piece instanceof King && square.piece.isInCheck(board.squares, square.position)        

    const handleMove = toSquare => {
        if(fromSquare.piece && fromSquare.piece instanceof Pawn && (board.playingNow === PLAYERS.WHITE ? toSquare.position.x === 7 : toSquare.position.x ===0 )){
            updatePromotion({...new Position(toSquare.position.x, toSquare.position.y), fromSquare, toSquare})
        }else {
            dispatch({type: 'move', board, fromSquare, toSquare})
        }
    }

    const handleClick = () => {
        const {piece, position} = square

        if(highlightMove){
            handleMove(square)
            updateLegalMoves([])
            updateFromSquare(null)
        }else{
            const moves = new PieceStrategy(piece,board)?.getLegalMoves(position)?.map(sqr => sqr.position) ?? []
            updateLegalMoves(moves)
            updateFromSquare(square)
        }
    }

    return (
        <div className={`square ${squareColor} ${highlightMove ? 'highlight-square' : ''}`} onClick={handleClick}>
            <Piece piece={square.piece} isInCheck={isIncheck} />
        </div>
    )

}


export default Square