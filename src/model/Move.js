
export class Move {
    constructor(from, to, type, isCapture, hasEnPassant = false){
        this.from = from
        this.to = to
        this.type = type
        this.isCapture = isCapture
        this.hasEnPassant = hasEnPassant
    }
}