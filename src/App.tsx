import Player from "./components/Player/Player.tsx";
import GameBoard from "./components/GameBoard/GameBoard.tsx";
import {useState} from "react";
import Log from "./components/Log/Log.tsx";
import {Turn} from "./interfaces.ts";
import {WINNING_COMBINATIONS} from "./data.ts";
import {GameBoardData, GameBoardSquare, Players} from "./types.ts";
import GameOver from "./components/GameOver/GameOver.tsx";

const PLAYERS: Players = {
    X: 'Player 1',
    O: 'Player 2'
}

const INITIAL_GAME_BOARD: GameBoardData = [
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

function deriveWinner(gameBoard: GameBoardData, players: Players) {
    let winner;

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

    return winner;
}

function deriveGameBoard(gameTurns: Turn[]) {
    const gameBoard: GameBoardData = [...INITIAL_GAME_BOARD.map(array => [...array])]

    for (const turn of gameTurns) {
        const { square, player } = turn
        const { row, cell } = square

        gameBoard[row][cell] = player
    }

    return gameBoard;
}

function App() {
    const [gameTurns, setGameTurns] = useState<Turn[]>([])
    const [players, setPlayers] = useState<Players>(PLAYERS)

    const activePlayer = deriveActivePlayer(gameTurns)
    const gameBoard = deriveGameBoard(gameTurns)

    const winner = deriveWinner(gameBoard, players)
    const hasDraw = gameTurns.length === 9 && !winner

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
                        name={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        name={PLAYERS.O}
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
