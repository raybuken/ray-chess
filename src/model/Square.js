class Square{
    constructor(position, piece = null){
        this.position = position
        this.piece = piece
    }

    hasPiece(){
        return Boolean(this.piece)
    }

    getPosition(){
        return this.position
    }

    getPiece(){
        return this.piece
    }

    setPiece(piece){
        this.piece = piece
    }

    clone(){
        return new Square(this.position, this.piece)
    }
}


export {Square}