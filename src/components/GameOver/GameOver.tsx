export default function GameOver(
    props: {
        winner: string|undefined,
        onResetGame: () => void
    }
) {
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            {
                props.winner ?
                <p>You have won, {props.winner}!</p> :
                    <p>It's a draw!</p>
            }
            <button onClick={props.onResetGame}>Rematch!</button>
        </div>
    )
}
