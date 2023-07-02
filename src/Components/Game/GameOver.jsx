
import confetti from "canvas-confetti"
import { PLAYERS } from "../../model/constants"
import { useContext } from "react"
import { BoardDispatchContext } from "../../context/chessBoardContext"

function GameOver({ modal, updateModal }) {
    const dispatch = useContext(BoardDispatchContext)

    const hideModal = () => {
        updateModal((prevState) => ({
            ...prevState,
            show: false
        }))
    }
    
    const newGame = () => {
        dispatch({type: 'reset'})
        updateModal({
            show: false,
            winner: '',
            reason: '',
            draw: false
        })
    }

    if (modal.show) {
        confetti()
        return (
            <div className='gameover-modal'>
                <button className="close" onClick={hideModal}>✖</button>
                <h1 className="results">Juego Terminado</h1>
                {
                    modal.winner && (
                        <>
                        <h2>Ganan las {modal.winner === PLAYERS.WHITE ? "blancas" : "negras"} por {modal.reason}</h2>
                        <p>{modal.winner === PLAYERS.WHITE ? "1-0" : "0-1"}</p>
                        </>
                    )
                }
                {
                    modal.draw && (
                        <>
                            <h2>la partida ha sido finalizada en tablas por {modal.reason}</h2>
                            <p>1/2</p>
                        </>
                    )
                }
                <button onClick={newGame} className="play-again">Nueva partida</button>
            </div>
        )
    }

    return null
}

export default GameOver