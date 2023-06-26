import { useState } from "react"
import { Board as BoardModel } from "../../model/Board"
import Square from "./Square"
import { PLAYERS } from "../../model/constants"
import { Pawn } from "../../model/Pieces/Pawn"
import { Position } from "../../model/Position"
import Promotion from "./Promotion"

function Board() {
    const [board, setBoard] = useState(new BoardModel())
    const [highlightMoves, setHighlightMoves] = useState([])
    const [fromSquare, setFromSquare] = useState(null)
    const [promotion, setPromotion] = useState(null)

    const getSquareColor = (rowNumber, squareNumber) => {
        if(rowNumber%2 === 0){
            return squareNumber%2 === 0 ? 'light-square' : 'dark-square'
        }
        return squareNumber%2 === 0 ? 'dark-square' : 'light-square'
    }

    const handleMove = (toSquare) => {
        const newBoard = {...board}

        if(fromSquare.piece instanceof Pawn && (board.playingNow === PLAYERS.WHITE ? toSquare.position.x === 7 : toSquare.position.x ===0 )){

            setPromotion({...new Position(toSquare.position.x, toSquare.position.y), fromSquare, toSquare} )
        }else {
            fromSquare.piece.move(newBoard, fromSquare, toSquare)
        }
        setBoard(newBoard)
    }

    const promotePawn = (piece) => {
        const newBoard = {...board}
        promotion.fromSquare.piece.promotion = piece
        promotion.fromSquare.piece.move(newBoard, promotion.fromSquare, promotion.toSquare)
        setBoard(newBoard)
        setPromotion(null)
    }

    return (
        <div className="game">
            {promotion && <Promotion piece={board.squares[promotion.x][promotion.y].piece} rowPosition={promotion.y} color={board.playingNow} promotePawn={promotePawn}/>}
            <div className="board">
                {board.squares.map((row,i) => (
                    row.map((square, j) => {
                        const color = getSquareColor(i, j)
                        const highlightMove = Boolean(highlightMoves.find(el => el.x === i && el.y === j))
                        return <Square board={board} position={square.position} key={j} square={square} squareColor={color} highlightMove={highlightMove} updateLegalMoves={setHighlightMoves} updateFromSquare={setFromSquare} handleMove={handleMove} promotion={promotion} />})
                ))}
            </div>
        </div>
    )
}

export default Board