
import { useContext } from 'react'
import { ChessBoardContext } from '../../context/chessBoardContext'
import { PLAYERS } from '../../model/constants'
import white from '../../assets/pieces/white_king.svg'
import black from '../../assets/pieces/black_king.svg'

function PlayingNow() {
    const {playingNow} = useContext(ChessBoardContext)


    return (
        <div className="playing-now">
            <img className={playingNow === PLAYERS.WHITE ? 'highlight-white' : ''} src={white} alt="white player" width={32} height={32}/>
            <img className={playingNow === PLAYERS.BLACK ? 'highlight-black' : ''} src={black} alt="black player" width={32} height={32}/>
        </div>
    )
}

export default PlayingNow