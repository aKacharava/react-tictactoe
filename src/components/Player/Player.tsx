import React, {useState} from "react";

export default function Player(
    props:{
        name:string,
        symbol:string
    }
) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(props.name);

    const buttonText = isEditing ? "Save" : "Edit"

    function handleEdit() {
        setIsEditing((editing: boolean) => !editing)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (isEditing) {
            setPlayerName(event.target.value)
        }
    }

    return (
        <li>
            <span className="player">
                {
                    isEditing ?
                       <input type="text" value={playerName} onChange={handleChange} /> :
                        <span className="player-name">
                            {playerName}
                        </span>
                }
                <span className="player-symbol">{props.symbol}</span>
            </span>
            <button onClick={handleEdit}>{buttonText}</button>
        </li>
    )
}
