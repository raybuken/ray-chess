
// object -> object from the Piece class

export const horizontal = (object, squares, position) => {
    let horizontalMoves = []
    for(let i = position.y +1; i <=7; i++){
        if(squares[position.x][i].piece){
            if(squares[position.x][i].piece.color !== object.color){
                horizontalMoves.push(squares[position.x][i])
            }
            break;
        }
        horizontalMoves.push(squares[position.x][i])
    }

    for(let i = position.y -1; i >=0; i--){
        if(squares[position.x][i].piece){
            if(squares[position.x][i].piece.color !== object.color){
                horizontalMoves.push(squares[position.x][i])
            }
            break;
        }
        horizontalMoves.push(squares[position.x][i])
    }

    return horizontalMoves
}
export const vertical = (object, squares, position) => {
    let verticalMoves = []
    for(let i = position.x + 1; i <= 7; i++){
        if(squares[i][position.y].piece){
            if(squares[i][position.y].piece.color !== object.color){
                verticalMoves.push(squares[i][position.y])
            }
            break;
        }
        verticalMoves.push(squares[i][position.y])
    }

    for(let i = position.x - 1; i >= 0; i--){
        if(squares[i][position.y].piece){
            if(squares[i][position.y].piece.color !== object.color){
                verticalMoves.push(squares[i][position.y])
            }
            break;
        }
        verticalMoves.push(squares[i][position.y])
    }

    return verticalMoves
}

export const diagonal = (object, squares, position) => {
    let moves = []

    //right-up diagonal
    for(let i=position.x + 1, j=position.y+1; i < squares.length && j < squares.length; i++,j++){
        let piece = squares[i][j].piece
        if(piece){
            if(object.color !== squares[position.x][position.y].piece.color){
                moves.push(squares[i][j])
            }
            break;
        }
        moves.push(squares[i][j])
    }

    //left-up diagonal
    for(let i=position.x + 1, j=position.y - 1; i < squares.length && j >= 0; i++,j--){
        let piece = squares[i][j].piece
        if(piece){
            if(object.color !== squares[position.x][position.y].piece.color){
                moves.push(squares[i][j])
            }
            break;
        }
        moves.push(squares[i][j])
    }

    //down-right diagonal
    for(let i=position.x - 1, j=position.y + 1; i >=0 && j >= squares.length; i--,j++){
        let piece = squares[i][j].piece
        if(piece){
            if(object.color !== squares[position.x][position.y].piece.color){
                moves.push(squares[i][j])
            }
            break;
        }
        moves.push(squares[i][j])
    }

    //down-left diagonal
    for(let i=position.x - 1, j=position.y - 1; i >=0 && j >= 0; i--,j--){
        let piece = squares[i][j].piece
        if(piece){
            if(object.color !== squares[position.x][position.y].piece.color){
                moves.push(squares[i][j])
            }
            break;
        }
        moves.push(squares[i][j])
    }

    return moves
}

export const uniDirectional = (object, squares, position) => {
    let moves = []
    let patterns = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ]

    patterns.forEach(pattern => {
        const move = squares[position.x + pattern[0]]?.[position.y + pattern[1]]
        if(move){
            if(move.piece){
                if(move.piece.color !== object.color){
                    moves.push(move)
                }
            }else{
                moves.push(move)
            }
        }
    })

    return moves
}

export const knightJumping = (object, squares, position) => {
    const patterns = [
        [1,2],
        [1,-2],
        [-1,2],
        [-1,-2],
        [2,1],
        [2,-1],
        [-2,1],
        [-2,-1]
    ]

    let moves = []

    patterns.forEach(pattern => {
        const move = squares[position.x + pattern[0]]?.[position.y + pattern[1]]
        if(move){
            if(move.piece){
                if(move.piece.color !== object.color){
                    moves.push(move)
                }
            }else{
                moves.push(move)
            }
        }
    })

    return moves
}


export const castlings = (object, squares, position) => {

}
