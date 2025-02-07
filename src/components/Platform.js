import React from "react";
import "./Platform.css";

const Platform = ({ position, size, className }) => (
    <div
      className={`platform ${className}`} // Aplica la clase adicional si se proporciona
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    />
  );
export default Platform;