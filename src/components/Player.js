import React from "react";  
import './Player.css';

const Player = ({ position }) => {
    return (
        <div className="player" style={{ left: position.x, top: position.y }}></div>
    );
};

export default Player;