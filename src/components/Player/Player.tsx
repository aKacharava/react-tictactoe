export default function Player(
    props:{
        name:string,
        symbol:string
    }
) {
    return (
        <li>
            <span className="player">
                <span className="player-name">
                    {props.name}
                </span>
                <span className="player-symbol">{props.symbol}</span>
            </span>
            <button>Edit</button>
        </li>
    )
}
