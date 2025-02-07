//Trap.js
import React from 'react';
import './Trap.css';


const Trap = ({ position, size }) => (
    <div
      className="trap"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        position: 'absolute',
        backgroundColor: 'red', // Puedes personalizar el estilo
      }}
    />
  );

export default Trap;