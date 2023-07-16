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
    const lastMove = board.lastMove
    const lastMoveFromStyle = square.position.x === lastMove?.from.x && square.position.y === lastMove?.from.y ? ' highlight-last-move' : ''
    const lastMoveToStyle = square.position.x === lastMove?.to.x && square.position.y === lastMove?.to.y ? ' highlight-last-move' : ''

    const handleMove = toSquare => {
        if(fromSquare.piece && fromSquare.piece instanceof Pawn && (board.playingNow === PLAYERS.WHITE ? toSquare.position.x === 7 : toSquare.position.x ===0 )){
            updatePromotion({...new Position(toSquare.position.x, toSquare.position.y), fromSquare, toSquare})
        }else {
            dispatch({type: 'move', board, fromSquare, toSquare})
        }
    }

    const handleClick = () => {
        //TODO fix current square bug (refactor useEffect in board component)
        //const {piece, position} = square
        const {position} = square

        if(highlightMove){
            handleMove(square)
            updateLegalMoves([])
            updateFromSquare(null)
        }else{
            const moves = new PieceStrategy(board.squares[position.x][position.y].piece,board)?.getLegalMoves(position)?.map(sqr => sqr.position) ?? []
            updateLegalMoves(moves)
            updateFromSquare(square)                                            
        }
    }

    return (
        <div className={`square ${squareColor}${highlightMove ? ' highlight-square' : ''}${lastMoveFromStyle}${lastMoveToStyle}`} onClick={handleClick}>
            <Piece piece={square.piece} isInCheck={isIncheck} />
        </div>
    )

}


export default Square