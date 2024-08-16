import {GameBoardData, GameBoardSquare} from "../../types.ts";

export default function GameBoard(
    props: {
        onSelectSquare: (rowIndex: number, cellIndex: number) => void,
        board: GameBoardData
    }
) {
    return(
        <ol id="game-board">
            {props.board.map((row: GameBoardSquare[], rowIndex: number)  => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((cell: string | null, cellIndex: number) => (
                                <li key={cellIndex}>
                                    <button
                                        onClick={() => props.onSelectSquare(rowIndex, cellIndex)}
                                        disabled={cell !== null}
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
