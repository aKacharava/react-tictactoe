const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard() {

    return(
        <ol id="game-board">
            {initialGameBoard.map((row, index: number)  => {
                return (
                    <li key={index}>
                        <ol>
                            {row.map((cell, cellIndex: number) => (
                                <li key={cellIndex}>
                                    <button>{cell}</button>
                                </li>
                            ))}
                        </ol>
                    </li>
                )
            })}
        </ol>
    )
}
