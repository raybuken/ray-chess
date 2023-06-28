
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

import { PLAYERS } from '../../model/constants'

export default function Piece({piece}){

   const getPieceSrc = () => {
      if(piece instanceof Bishop) return piece.color === PLAYERS.WHITE ? white_bishop : black_bishop
      if(piece instanceof Knight) return piece.color === PLAYERS.WHITE ? white_knight : black_knight
      if(piece instanceof Rook) return piece.color === PLAYERS.WHITE ? white_rook : black_rook
      if(piece instanceof Queen) return piece.color === PLAYERS.WHITE ? white_queen : black_queen
      if(piece instanceof King) return piece.color === PLAYERS.WHITE ? white_king : black_king

      return piece.color === PLAYERS.WHITE ? white_pawn : black_pawn
   }

   if(piece) return <img className='piece' src={getPieceSrc()} alt="piece" width={32} height={32} />

   return
}