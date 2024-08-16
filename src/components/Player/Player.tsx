import React, {useState} from "react";

export default function Player(
    props:{
        name:string,
        symbol:string,
        isActive:boolean
        onChangeName:(symbol:string, name:string) => void
    }
) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(props.name);

    const buttonText = isEditing ? "Save" : "Edit"

    function handleEdit() {
        setIsEditing((editing: boolean) => !editing)

        if (isEditing) {
            props.onChangeName(props.symbol, playerName)
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (isEditing) {
            setPlayerName(event.target.value)
        }
    }

    return (
        <li className={props.isActive ? "active" : ''}>
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
