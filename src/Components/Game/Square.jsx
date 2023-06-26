import Piece from "./Piece"

function Square({board, square, squareColor, highlightMove, updateLegalMoves, updateFromSquare, handleMove}){
    const handleClick = () => {
        const {piece, position} = square

        if(highlightMove){
            handleMove(square)
            updateLegalMoves([])
            updateFromSquare(null)
        }else{
            const moves = piece?.getLegalMoves(board, position).map(sqr => sqr.position) ?? []
            updateLegalMoves(moves)
            updateFromSquare(square)
        }
    }

    return (
        <div className={`square ${squareColor} ${highlightMove ? 'highlight-square' : ''}`} onClick={handleClick}>
            <Piece piece={square.piece} />
        </div>
    )

}


export default Square