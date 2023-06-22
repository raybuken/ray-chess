import { Piece } from "../Piece"

class King extends Piece{
    constructor(){
        super()
        this.shortCastle = false,
        this.longCastle = false
    }
}

export {King}