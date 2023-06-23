import { Piece } from "../Piece"
import { diagonal, horizontal, knightJumping, uniDirectional, vertical } from "../utils/movements"
import { Bishop } from './Bishop'
import { Queen }from './Queen'
import { Rock } from './Rock'
import { Pawn } from './Pawn'
import { PLAYERS } from '../constants'
class King extends Piece{
    constructor(){
        super()
        this.shortCastling = true
        this.longCastling = true
    }

    move(board, fromSquare, toSquare){
        const squares = [...board.squares];

        if(this.isLegalMove(fromSquare.position, toSquare.position)){
            const COLOR_FACTOR = PLAYERS.WHITE ? 0 : 7

            //castling
            if(fromSquare.position.x === COLOR_FACTOR && fromSquare.position.y === 3){
                if(toSquare.position.y === 1){ //short
                    squares[toSquare.position.x][toSquare.position.y + 1].piece = [...squares[COLOR_FACTOR][0].piece]
                    squares[COLOR_FACTOR][0].piece = null
                }
                else if(toSquare.position.y === 5){ //long
                    squares[toSquare.position.x][toSquare.position.y - 1].piece = [...squares[COLOR_FACTOR][7].piece]
                    squares[COLOR_FACTOR][7].piece = null
                }
            }
            squares[toSquare.position.x][toSquare.position.y].piece = fromSquare.piece
            squares[fromSquare.position.x][fromSquare.position.y].piece = null

            this.shortCastling = false
            this.longCastling = false

            return {
                ok: true,
                squares
            }
        }

        return {
            ok: false,
            msg: 'Illegal move!',
            squares
        }
    }

    getLegalMoves(board, position){
        const { squares } = [...board]
        let moves = uniDirectional(this, squares, position).filter(move => !this.isInCheck(squares, move.position))

        //Castling
        if(this.isInCheck(squares, position)){
            if(this.shortCastling){
                const COLOR_FACTOR = PLAYERS.WHITE ? 1 : - 1
                let step_one = squares[position.x][position.y (COLOR_FACTOR*-1)]
                let step_two = squares[position.x][position.y + (COLOR_FACTOR*-2)]
                let shortCastlingSquare = squares[position.x][position.y + (COLOR_FACTOR*-2)]
    
                if(step_one && !step_one.piece && step_two && step_two.piece){
                    let rockSquare = squares[position.x][0]
    
                    if(rockSquare.piece instanceof Rock && rockSquare.piece.castling && rockSquare.piece.color === this.color){
                        if(!this.isInCheck(squares, step_one.position) && !this.isInCheck(squares, step_two.position)){
                            moves.push(shortCastlingSquare)
                        }
                    }
                }
            }
            if(this.longCastling){
                const COLOR_FACTOR = PLAYERS.WHITE ? 1 : - 1
                let step_one = squares[position.x][position.y+ (COLOR_FACTOR*-1)]
                let step_two = squares[position.x][position.y+ (COLOR_FACTOR*-2)]
                let step_three = squares[position.x][position.y+ (COLOR_FACTOR*-3)]
                let longCastlingSquare = squares[position.x][position.y+ (COLOR_FACTOR*-2)]
    
                if(step_one && !step_one.piece && step_two && step_two.piece && step_three && !step_three.piece){
                    let rockSquare = squares[position.x][0]
    
                    if(rockSquare.piece instanceof Rock && rockSquare.piece.castling && rockSquare.piece.color === this.color){
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
        return legalMoves.some(move => move.x === toPosition.x && move.y === toPosition.y)
    }

    isInCheck(squares, position){
        //bishop and queen
        let hasDiagonalInCheck = diagonal(this, squares, position).some(move => move.piece && move.piece.color !== this.color && (move.piece instanceof Bishop || move.piece instanceof Queen))
        if(hasDiagonalInCheck) return true

        //rock and queen
        let hasHorizontalInCheck = horizontal(this, squares, position).some(move => move.piece && move.piece.color !== this.color && (move.piece instanceof Rock || move.piece instanceof Queen))
        let hasVerticalInCheck = vertical(this, squares, position).some(move => move.piece && move.piece.color !== this.color && (move.piece instanceof Rock || move.piece instanceof Queen))
        if(hasHorizontalInCheck || hasVerticalInCheck) return true

        //knight
        let hasKnightJumpingInCheck = knightJumping(this, squares, position)
        if(hasKnightJumpingInCheck) return true

        //pawn
        let hasLeftCloseDiagonalInCheck = squares[position.x + 1]?.[position.y + 1]?.piece?.color !== this.color && squares[position.x + 1][position.y + 1].piece instanceof Pawn
        let hasRightCloseDiagonalInCheck = squares[position.x + 1]?.[position.y - 1]?.piece?.color !== this.color && squares[position.x + 1][position.y - 1].piece instanceof Pawn
        if(hasLeftCloseDiagonalInCheck || hasRightCloseDiagonalInCheck) return true

        //king
        let hasUniDirectionalInCheck = uniDirectional(this, squares, position).some(move => move.piece && move.piece.color !== this.color && (move.piece instanceof King))
        if(hasUniDirectionalInCheck) return true

        return false
    }
}

export {King}