import Player from "./components/Player/Player.tsx";
import GameBoard from "./components/GameBoard/GameBoard.tsx";

function App() {

  return (
    <main>
        <div id="game-container">
            <ol id="players">
                <Player name="Alex" symbol="X" />
                <Player name="Bob" symbol="O" />
            </ol>
            <GameBoard />
        </div>
    </main>
  )
}

export default App
