import { Piece } from "../Piece";
import { Square } from "../Square";

class Rock extends Piece{

    move(board, fromSquare, toSquare){
        const squares = [...board.squares];

        if(this.isLegalMove(fromSquare.position, toSquare.position)){
            squares[toSquare.position.x][toSquare.position.y] = new Square(toSquare.position, fromSquare.piece)
            squares[fromSquare.position.x][fromSquare.position.y] = new Square(fromSquare.position)

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
        let squares = [...board.squares]
        //vertical moves
        let verticalMoves = []
        for(let i = position.x + 1; i <= 7; i++){
            if(squares[i][position.y].piece){
                if(squares[i][position.y].piece.color !== this.color){
                    verticalMoves.push(squares[i][position.y])
                }
                break;
            }
            verticalMoves.push(squares[i][position.y])
        }

        for(let i = position.x - 1; i >= 0; i--){
            if(squares[i][position.y].piece){
                if(squares[i][position.y].piece.color !== this.color){
                    verticalMoves.push(squares[i][position.y])
                }
                break;
            }
            verticalMoves.push(squares[i][position.y])
        }

        //horizontal moves
        let horizontalMoves = []
        for(let i = position.y +1; i <=7; i++){
            if(squares[position.x][i].piece){
                if(squares[position.x][i].piece.color !== this.color){
                    horizontalMoves.push(squares[position.x][i])
                }
                break;
            }
            horizontalMoves.push(squares[position.x][i])
        }

        for(let i = position.y -1; i >=0; i--){
            if(squares[position.x][i].piece){
                if(squares[position.x][i].piece.color !== this.color){
                    horizontalMoves.push(squares[position.x][i])
                }
                break;
            }
            horizontalMoves.push(squares[position.x][i])
        }

        const moves = [...horizontalMoves, ...verticalMoves]

        return moves
    }

    isLegalMove(board, fromPosition, toPosition){
        const legalMoves = this.getLegalMoves(board, fromPosition, toPosition)
        return legalMoves.some(move => move.x === toPosition.x && move.y === toPosition.y)
    }
}

export { Rock }