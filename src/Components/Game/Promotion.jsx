
import black_king from '../../assets/pieces/black_king.svg'
import black_queen from '../../assets/pieces/black_queen.svg'
import black_rook from '../../assets/pieces/black_rook.svg'
import black_bishop from '../../assets/pieces/black_bishop.svg'
import black_knight from '../../assets/pieces/black_knight.svg'
import black_pawn from '../../assets/pieces/black_pawn.svg'

import white_king from '../../assets/pieces/white_king.svg'
import white_queen from '../../assets/pieces/white_queen.svg'
import white_rook from '../../assets/pieces/white_rook.svg'
import white_bishop from '../../assets/pieces/white_bishop.svg'
import white_knight from '../../assets/pieces/white_knight.svg'
import white_pawn from '../../assets/pieces/white_pawn.svg'

import {Bishop} from '../../model/Pieces/Bishop'
import {Knight} from '../../model/Pieces/Knight'
import {Rook} from '../../model/Pieces/Rook'
import {Queen} from '../../model/Pieces/Queen'
import {King} from '../../model/Pieces/King'

import { PROMOTION } from "../../model/promotion"
import { PLAYERS } from '../../model/constants'

const getPieceSrc = (color, piece) => {
    if(piece === Bishop) return color === PLAYERS.WHITE ? white_bishop : black_bishop
    if(piece === Knight) return color === PLAYERS.WHITE ? white_knight : black_knight
    if(piece === Rook) return color === PLAYERS.WHITE ? white_rook : black_rook
    if(piece === Queen) return color === PLAYERS.WHITE ? white_queen : black_queen
    if(piece === King) return color === PLAYERS.WHITE ? white_king : black_king

    return color === PLAYERS.WHITE ? white_pawn : black_pawn
}

function Promotion({color, rowPosition, promotePawn}) {
    const promotionPieces = Object.keys(PROMOTION)
    const pos = 100 * (7 - rowPosition)

    return (
        <div className="promotion" style={{left: pos + "px"}}>
            {promotionPieces.map((promotionPiece, i) => (
                <div className="promotion-piece" key={i} onClick={() => promotePawn(promotionPiece)}>
                    <img src={getPieceSrc(color, PROMOTION[promotionPiece])} alt="piece" width={32} height={32} />
                </div>
            ))}
        </div>
    )
}

export default Promotion