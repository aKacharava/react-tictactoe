import Player from "./components/Player/Player.tsx";
import GameBoard from "./components/GameBoard/GameBoard.tsx";
import {useState} from "react";
import Log from "./components/Log/Log.tsx";
import {Turn} from "./interfaces.ts";

function App() {
    const [activePlayer, setActivePlayer] = useState('X')
    const [gameTurns, setGameTurns] = useState<Turn[]>([])

    function handleSelectSquare(rowIndex: number, cellIndex: number) {
        setActivePlayer((currentActivePlayer: string) => currentActivePlayer === 'X' ? 'O' : 'X')
        setGameTurns((prevTurns: Turn[]) => {
            let currentPlayer: string = 'X'

            if(prevTurns.length > 0 && prevTurns[0].player === 'X') {
                currentPlayer = 'O'
            }

            const updatedTurns: Turn[] = [
                {
                    square: { row: rowIndex, cell: cellIndex },
                    player: currentPlayer
                },
                ...prevTurns
            ]


            return updatedTurns
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className={"highlight-player"}>
                    <Player name="Alex" symbol="X" isActive={activePlayer === 'X'} />
                    <Player name="Bob" symbol="O" isActive={activePlayer === 'O'} />
                </ol>
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    turns={gameTurns}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
