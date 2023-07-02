import { Piece } from "../Piece"
import { diagonal, horizontal, knightJumping, uniDirectional, vertical } from "../utils/movements"
import { Bishop } from './Bishop'
import { Queen }from './Queen'
import { Rook } from './Rook'
import { Pawn } from './Pawn'
import { PLAYERS } from '../constants'
import { Knight } from "./Knight"
import { Move } from "../Move"
class King extends Piece{
    constructor(color){
        super(color)
        this.shortCastling = true
        this.longCastling = true
    }

    move(board, fromSquare, toSquare){
        const squares = [...board.squares];

        if(this.isLegalMove(board, fromSquare.position, toSquare.position)){
            const COLOR_FACTOR = board.playingNow === PLAYERS.WHITE ? 0 : 7

            //castling
            if(fromSquare.position.x === COLOR_FACTOR && fromSquare.position.y === 3){
                if(toSquare.position.y === 1){ //short
                    squares[toSquare.position.x][toSquare.position.y + 1].piece = squares[COLOR_FACTOR][0].piece
                    squares[COLOR_FACTOR][0].piece = null
                }
                else if(toSquare.position.y === 5){ //long
                    squares[toSquare.position.x][toSquare.position.y - 1].piece = squares[COLOR_FACTOR][7].piece
                    squares[COLOR_FACTOR][7].piece = null
                }
            }
            const isCapture = Boolean(toSquare.piece)

            fromSquare.piece.shortCastling = false
            fromSquare.piece.longCastling = false
            squares[toSquare.position.x][toSquare.position.y].piece = fromSquare.piece
            squares[fromSquare.position.x][fromSquare.position.y].piece = null

            return {
                ok: true,
                squares,
                lastMove: new Move(fromSquare.position, toSquare.position, "King", isCapture)
            }
        }

        return {
            ok: false,
            msg: 'Illegal move!',
            squares
        }
    }

    getLegalMoves(board, position){
        const squares = [...board.squares]
        const kingColor = squares[position.x][position.y].piece.color
        const currentKing = new King(kingColor)
        currentKing.shortCastling = this.shortCastling
        currentKing.longCastling = this.longCastling

        squares[position.x][position.y].piece = null
        let moves = uniDirectional(this, squares, position).filter(move => !this.isInCheck(squares, move.position))
        squares[position.x][position.y].piece = currentKing

        //Castling
        if(!this.isInCheck(squares, position)){
            if(this.shortCastling){
                const COLOR_FACTOR = PLAYERS.WHITE ? 1 : - 1
                let step_one = squares[position.x][position.y + (COLOR_FACTOR*-1)]
                let step_two = squares[position.x][position.y + (COLOR_FACTOR*-2)]
                let shortCastlingSquare = squares[position.x][position.y + (COLOR_FACTOR*-2)]
    
                if(step_one && !step_one.piece && step_two && !step_two.piece){
                    let rookSquare = squares[position.x][0]
    
                    if(rookSquare.piece instanceof Rook && rookSquare.piece.castling && rookSquare.piece.color === this.color){
                        if(!this.isInCheck(squares, step_one.position) && !this.isInCheck(squares, step_two.position)){
                            moves.push(shortCastlingSquare)
                        }
                    }
                }
            }
            if(this.longCastling){
                const COLOR_FACTOR = PLAYERS.WHITE ? 1 : - 1
                let step_one = squares[position.x][position.y+ (COLOR_FACTOR*1)]
                let step_two = squares[position.x][position.y+ (COLOR_FACTOR*2)]
                let step_three = squares[position.x][position.y+ (COLOR_FACTOR*3)]
                let longCastlingSquare = squares[position.x][position.y+ (COLOR_FACTOR*2)]
    
                if(step_one && !step_one.piece && step_two && !step_two.piece && step_three && !step_three.piece){
                    let rookSquare = squares[position.x][0]
    
                    if(rookSquare.piece instanceof Rook && rookSquare.piece.castling && rookSquare.piece.color === this.color){
                        if(!this.isInCheck(squares, step_one.position) && !this.isInCheck(squares, step_two.position)){
                            moves.push(longCastlingSquare)
                        }
                    }
                }
            }
        }

        return moves
    }

    isLegalMove(board, fromPosition, toPosition){
        const legalMoves = this.getLegalMoves(board, fromPosition)
        return legalMoves.some(square => square.position.x === toPosition.x && square.position.y === toPosition.y)
    }

    isInCheck(squares, position){
        //bishop and queen
        
        let hasDiagonalInCheck = diagonal(this, squares, position).some(move => move.piece && move.piece?.color !== this.color && (move.piece instanceof Bishop || move.piece instanceof Queen))
        if(hasDiagonalInCheck) return true

        //rook and queen
        let hasHorizontalInCheck = horizontal(this, squares, position).some(move => move.piece && move.piece?.color !== this.color && (move.piece instanceof Rook || move.piece instanceof Queen))
        let hasVerticalInCheck = vertical(this, squares, position).some(move => move.piece && move.piece?.color !== this.color && (move.piece instanceof Rook || move.piece instanceof Queen))
        if(hasHorizontalInCheck || hasVerticalInCheck) return true

        //knight
        let hasKnightJumpingInCheck = knightJumping(this, squares, position).some(move => move.piece && move.piece?.color !== this.color && (move.piece instanceof Knight))
        if(hasKnightJumpingInCheck) return true

        //pawn
        const PAWN_COLOR_FACTOR = this.color === PLAYERS.WHITE ? 1 : -1

        let hasLeftCloseDiagonalInCheck = squares[position.x + PAWN_COLOR_FACTOR]?.[position.y + 1]?.piece?.color !== this.color && squares[position.x + PAWN_COLOR_FACTOR]?.[position.y + 1]?.piece instanceof Pawn
        let hasRightCloseDiagonalInCheck = squares[position.x + PAWN_COLOR_FACTOR]?.[position.y - 1]?.piece?.color !== this.color && squares[position.x + PAWN_COLOR_FACTOR]?.[position.y - 1]?.piece instanceof Pawn
        if(hasLeftCloseDiagonalInCheck || hasRightCloseDiagonalInCheck) return true

        //king
        let hasUniDirectionalInCheck = uniDirectional(this, squares, position).some(move => move.piece && move.piece?.color !== this.color && (move.piece instanceof King))
        if(hasUniDirectionalInCheck) return true

        return false
    }

}

export {King}