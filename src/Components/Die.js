import React from "react";

export default function Die({ value, isHeld, id,  onClick }) {

    return (
        <div 
            key={id}
            onClick={() => onClick(id, isHeld)}
        >
            <img 
                src={require(`../Images/Die${value}.png`)} 
                className={!isHeld ? "die" : "die_held"}
            />
        </div>
    )
}