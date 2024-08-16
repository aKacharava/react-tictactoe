import Player from "./components/Player/Player.tsx";
import GameBoard from "./components/GameBoard/GameBoard.tsx";
import {useState} from "react";
import Log from "./components/Log/Log.tsx";
import {Turn} from "./interfaces.ts";
import {WINNING_COMBINATIONS} from "./data.ts";
import {GameBoardData, GameBoardSquare} from "./types.ts";
import GameOver from "./components/GameOver/GameOver.tsx";

const initialGameBoard: GameBoardData = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayer(gameTurns: Turn[]) {
    let currentPlayer: string = 'X'

    if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }

    return currentPlayer
}

function App() {
    const [gameTurns, setGameTurns] = useState<Turn[]>([])
    const [players, setPlayers] = useState<{X: string, O:string}>({
        X: 'Alex',
        O: 'Bob'
    })

    const activePlayer = deriveActivePlayer(gameTurns)

    let winner;
    const gameBoard: GameBoardData = [...initialGameBoard.map(array => [...array])]
    const hasDraw = gameTurns.length === 9 && !winner

    for (const turn of gameTurns) {
        const { square, player } = turn
        const { row, cell } = square

        gameBoard[row][cell] = player
    }

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol: GameBoardSquare = gameBoard[combination[0].row][combination[0].cell]
        const secondSquareSymbol: GameBoardSquare = gameBoard[combination[1].row][combination[1].cell]
        const thirdSquareSymbol: GameBoardSquare = gameBoard[combination[2].row][combination[2].cell]

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol as keyof typeof players]
        }
    }

    function handleSelectSquare(rowIndex: number, cellIndex: number) {
        setGameTurns((prevTurns: Turn[]) => {
            const currentPlayer = deriveActivePlayer(prevTurns)

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

    function handleRestart() {
        setGameTurns([])
    }

    function handlePlayerNameChange(player: string, name: string) {
        setPlayers((prevPlayer) => ({
            ...prevPlayer,
            [player]: name
        }))
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className={"highlight-player"}>
                    <Player
                        name="Alex"
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        name="Bob"
                        symbol="O"
                        isActive={activePlayer === 'O'}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) ? <GameOver winner={winner} onResetGame={handleRestart} /> : ''}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
