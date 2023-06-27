
import { useContext } from 'react'
import { ChessBoardContext } from '../../context/chessBoardContext'
import { PLAYERS } from '../../model/constants'

function PlayingNow() {
    const {playingNow} = useContext(ChessBoardContext)

    if(playingNow === PLAYERS.WHITE){
        return <span className="playing-now">Turno: Blancas</span>
    }
    return <span className='playing-now'>Turno: Negras</span>
}

export default PlayingNow