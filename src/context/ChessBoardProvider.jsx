import { chessBoardReducer } from '../reducers/ChessBoardReducer';
import { Board } from '../model/Board';
import { useReducer} from 'react'
import { BoardDispatchContext, ChessBoardContext } from './chessBoardContext';

export default function ChessBoardProvider({children}){
    const [board, dispatch] = useReducer(chessBoardReducer, new Board())
    return (
        <ChessBoardContext.Provider value={board}>
            <BoardDispatchContext.Provider value={dispatch}>
                {children}
            </BoardDispatchContext.Provider>
        </ChessBoardContext.Provider>
    )
}