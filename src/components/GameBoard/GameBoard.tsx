import {useState} from "react";

const initialGameBoard: (string | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard(
    props: {
        onSelectSquare: () => void,
        activePlayer: string
    }
) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard)

    function handleMatrix(rowIndex: number, cellIndex: number) {
        setGameBoard((prevGameBoard) => {
            const newGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
            newGameBoard[rowIndex][cellIndex] = props.activePlayer
            return newGameBoard
        })

        props.onSelectSquare()
    }

    return(
        <ol id="game-board">
            {gameBoard.map((row, rowIndex: number)  => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((cell, cellIndex: number) => (
                                <li key={cellIndex}>
                                    <button onClick={() => handleMatrix(rowIndex, cellIndex)}>{cell}</button>
                                </li>
                            ))}
                        </ol>
                    </li>
                )
            })}
        </ol>
    )
}
