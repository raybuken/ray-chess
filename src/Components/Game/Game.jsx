import ChessBoardProvider from "../../context/ChessBoardProvider";
import Board from "./Board";

export default function Game(){
    return (
        <ChessBoardProvider>
            <Board/>
        </ChessBoardProvider>
    )
}