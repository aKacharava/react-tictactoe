import {Turn} from "../../interfaces.ts";

export default function Log(
    props: {
        turns: Turn[]
    }
) {
    return(
        <ol id="log">
            {
                props.turns.map(
                    (turn: Turn, index: number) => <li key={index}>{turn.player} selected {turn.square.row}-{turn.square.cell}</li>
                )
            }
        </ol>
    )
}
