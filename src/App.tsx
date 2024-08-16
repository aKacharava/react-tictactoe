import Player from "./components/Player/Player.tsx";
import GameBoard from "./components/GameBoard/GameBoard.tsx";
import {useState} from "react";

function App() {
    const [activePlayer, setActivePlayer] = useState('X')

    function handleSelectSquare() {
        setActivePlayer((currentActivePlayer: string) => currentActivePlayer === 'X' ? 'O' : 'X')
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className={"highlight-player"}>
                    <Player name="Alex" symbol="X" isActive={activePlayer === 'X'} />
                    <Player name="Bob" symbol="O" isActive={activePlayer === 'O'} />
                </ol>
                <GameBoard onSelectSquare={handleSelectSquare} activePlayer={activePlayer} />
            </div>
        </main>
    )
}

export default App
