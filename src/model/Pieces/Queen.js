import {Piece} from '../Piece'

class Queen extends Piece{

    move(board, fromSquare, toSquare){
        const squares = [...board.squares];

        if(this.isLegalMove(fromSquare.position, toSquare.position)){
            squares[toSquare.position.x][toSquare.position.y].piece = fromSquare.piece
            squares[fromSquare.position.x][fromSquare.position.y].piece = null

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
        const squares = [...board.squares]

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

        //diagonals
        let diagonalMoves = []

        //right-up diagonal
        for(let i=position.x + 1, j=position.y+1; i < squares.length && j < squares.length; i++,j++){
            let piece = squares[i][j].piece
            if(piece){
                if(piece.color !== squares[position.x][position.y].piece.color){
                    diagonalMoves.push(squares[i][j])
                }
                break;
            }
            diagonalMoves.push(squares[i][j])
        }

        //left-up diagonal
        for(let i=position.x + 1, j=position.y - 1; i < squares.length && j >= 0; i++,j--){
            let piece = squares[i][j].piece
            if(piece){
                if(piece.color !== squares[position.x][position.y].piece.color){
                    diagonalMoves.push(squares[i][j])
                }
                break;
            }
            diagonalMoves.push(squares[i][j])
        }

        //down-right diagonal
        for(let i=position.x - 1, j=position.y + 1; i >=0 && j >= squares.length; i--,j++){
            let piece = squares[i][j].piece
            if(piece){
                if(piece.color !== squares[position.x][position.y].piece.color){
                    diagonalMoves.push(squares[i][j])
                }
                break;
            }
            diagonalMoves.push(squares[i][j])
        }

        //down-left diagonal
        for(let i=position.x - 1, j=position.y - 1; i >=0 && j >= 0; i--,j--){
            let piece = squares[i][j].piece
            if(piece){
                if(piece.color !== squares[position.x][position.y].piece.color){
                    diagonalMoves.push(squares[i][j])
                }
                break;
            }
            diagonalMoves.push(squares[i][j])
        }

        const moves = [...horizontalMoves, ...verticalMoves, ...diagonalMoves]

        return moves
    }

    isLegalMove(board, fromPosition, toPosition){
        const legalMoves = this.getLegalMoves(board, fromPosition, toPosition)
        return legalMoves.some(move => move.x === toPosition.x && move.y === toPosition.y)
    }
}

export {Queen}