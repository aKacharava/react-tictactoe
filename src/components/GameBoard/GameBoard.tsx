import {Turn} from "../../interfaces.ts";

const initialGameBoard: (string | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard(
    props: {
        onSelectSquare: (rowIndex: number, cellIndex: number) => void,
        turns: Turn[]
    }
) {
    const gameBoard = initialGameBoard;

    for (const turn of props.turns) {
        const { square, player } = turn;
        const { row, cell } = square;

        gameBoard[row][cell] = player;
    }

    return(
        <ol id="game-board">
            {gameBoard.map((row, rowIndex: number)  => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((cell, cellIndex: number) => (
                                <li key={cellIndex}>
                                    <button
                                        onClick={() => props.onSelectSquare(rowIndex, cellIndex)}
                                    >
                                        {cell}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </li>
                )
            })}
        </ol>
    )
}
