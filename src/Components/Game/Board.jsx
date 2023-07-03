import { useContext, useEffect, useState } from "react"
import Square from "./Square"
import Promotion from "./Promotion"
import { BoardDispatchContext, ChessBoardContext } from "../../context/chessBoardContext"
import PlayingNow from "./PlayingNow"
import GameOver from "./Gameover"
import { PLAYERS } from "../../model/constants"

function Board() {
    const board = useContext(ChessBoardContext)
    const dispatch = useContext(BoardDispatchContext)
    const [highlightMoves, setHighlightMoves] = useState([])
    const [promotion, setPromotion] = useState(null)
    const [fromSquare, setFromSquare] = useState(null)
    const [gameModal, setGameModal] = useState({
        show: false,
        winner: '',
        draw: false,
        reason: ''
    })
    const lastMove = board.lastMove

    useEffect(() => {
        if(board.isCheckmate()){
            setGameModal({
                show: true,
                winner: board.playingNow === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE,
                draw: false,
                reason: 'Jaquemate'
            })
        }else if(board.isSlatemate()){
            setGameModal({
                show: true,
                winner: '',
                draw: true,
                reason: "Ahogado"
            })
        }else if(board.fiftyMovesDraw === 50){
            setGameModal({
                show: true,
                winner:'',
                draw: true,
                reason: "haber pasado 50 turnos sin capturas ni movimientos de peón"
            })
        }
        console.log(board.fiftyMovesDraw)
    },[board, board.squares])

    const getSquareColor = (rowNumber, squareNumber) => {
        if(rowNumber%2 === 0){
            return squareNumber%2 === 0 ? 'light-square' : 'dark-square'
        }
        return squareNumber%2 === 0 ? 'dark-square' : 'light-square'
    }

    const promotePawn = (piece) => {
        promotion.fromSquare.piece.promotion = piece
        dispatch({
            type: 'move',
            board,
            fromSquare: promotion.fromSquare,
            toSquare: promotion.toSquare
        })
        setPromotion(null)
    }

    return (
        <div className="game">
            <GameOver modal={gameModal} updateModal={setGameModal} />
            <PlayingNow/>
            {promotion && <Promotion piece={board.squares[promotion.x][promotion.y].piece} rowPosition={promotion.y} color={board.playingNow} promotePawn={promotePawn}/>}
            <div className="board">
                {board.squares.map((row,i) => (
                    row.map((square, j) => {
                        const color = getSquareColor(i, j)
                        const highlightMove = Boolean(highlightMoves.find(el => el.x === i && el.y === j))
                        return <Square 
                                key={j} 
                                square={square} 
                                squareColor={color} 
                                highlightMove={highlightMove} 
                                updateLegalMoves={setHighlightMoves} 
                                promotion={promotion} 
                                updatePromotion={setPromotion}
                                fromSquare = {fromSquare}
                                updateFromSquare={setFromSquare}
                                lastMove={lastMove}
                                />
                    })
                ))}
            </div>
        </div>
    )
}

export default Board