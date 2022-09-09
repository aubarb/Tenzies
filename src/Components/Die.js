import React from "react";

export default function Die({ value, isHeld, id,  onClick }) {

    return (
        <div 
            className={!isHeld ? "die" : "die_held"}
            key={id}
            onClick={() => onClick(id, isHeld)}
        >
            <p>{value}</p>
        </div>
    )
}