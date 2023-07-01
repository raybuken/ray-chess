
import confetti from "canvas-confetti"
import { PLAYERS } from "../../model/constants"

function GameOver({ checkmate, winner }) {

    if (checkmate) {
        confetti()
        return (
            <div className='gameover-modal'>
                <h1 className="results">Juego Terminado</h1>
                <h2>Han ganado las {winner === PLAYERS.WHITE ? "blancas": "negras"} por jaquemate</h2>
            </div>
        )
    }

    return null
}

export default GameOver