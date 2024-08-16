export default function GameOver(
    props: {
        winner: string|undefined
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
        </div>
    )
}
