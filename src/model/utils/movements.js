
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
    const moves = []

    //Evaluate any move logic depending of the diagonal
    const addMoves = (incrementX, incrementY) => {
        let x = incrementX ? position.x + 1 : position.x - 1 ;
        let y = incrementY ? position.y + 1 : position.y - 1 ;

        const xCondition = i => incrementX ? i < squares.length : i >=0
        const yCondition = j => incrementY ? j < squares.length : j >=0

        for(let i=x, j=y; xCondition(i) && yCondition(j);){
            let square = squares[i][j]
            let piece = square?.piece
            if(square){
                if(piece){
                    if(object.color !== piece.color){
                        moves.push(square)
                    }
                    break;
                }
                moves.push(square)
            }
            i = incrementX ? i + 1 : i - 1
            j = incrementY ? j + 1 : j - 1
        }
    }
    addMoves(true, true) //right-up diagonal
    addMoves(true, false) //left-up diagonal
    addMoves(false, false) //down-right diagonal
    addMoves(false, true) //down-left diagonal

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
        const move = squares[position.x + pattern[0]] ? squares[position.x + pattern[0]][position.y + pattern[1]] : null
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