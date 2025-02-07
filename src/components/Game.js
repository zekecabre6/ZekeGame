import React, { useEffect, useState } from 'react';
import Platform from './Platform';
import Player from './Player';
import './Game.css';
import Trap from './Trap';
import { useMemo } from 'react';


const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 500 });
  const [isJumping, setIsJumping] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [cameraPosition, setCameraPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false); // Estado para controlar el fin del juego


  const platforms = useMemo(() => {
    return [
      { position: { x: 50, y: 550 }, size: { width: 200, height: 20 } },
      { position: { x: 300, y: 450 }, size: { width: 200, height: 20 } },
      { position: { x: 550, y: 550 }, size: { width: 200, height: 20 } },
      { position: { x: 800, y: 450 }, size: { width: 200, height: 20 } },
      { position: { x: 1050, y: 550 }, size: { width: 200, height: 20 } },
      { position: { x: 1300, y: 450 }, size: { width: 200, height: 20 } },
      { position: { x: 1550, y: 550 }, size: { width: 200, height: 20 } },
      { position: { x: 1800, y: 450 }, size: { width: 200, height: 20 } },
      { position: { x: 2050, y: 550 }, size: { width: 200, height: 20 } },
      { position: { x: 2300, y: 450 }, size: { width: 200, height: 20 } },
      { position: { x: 2550, y: 550 }, size: { width: 200, height: 20 } },
      { position: { x: 2800, y: 450 }, size: { width: 200, height: 20 } },
      { position: { x: 3050, y: 550 }, size: { width: 200, height: 20 } },
      { position: { x: 3300, y: 450 }, size: { width: 200, height: 20 } },
      { position: { x: 3550, y: 550 }, size: { width: 200, height: 20 } },
    ];;
  }, []);

  // Convierte las trampas en estado para poder actualizarlas
  const [traps, setTraps] = useState([
    // { 
    //   position: { x: 200, y: 450 }, 
    //   size: { width: 25, height: 20 },
    //   speed: 1,
    //   direction: 1,
    //   leftBound: 0, 
    //   rightBound: 275
    // },

    {
      position: { x: 675, y: 450 },
      size: { width: 25, height: 20 },
      speed: 1,
      direction: 1,
      leftBound: 500,
      rightBound: 775
    },

    {
      position: { x: 1175, y: 450 },
      size: { width: 25, height: 20 },
      speed: 2,
      direction: 1,
      leftBound: 1000,
      rightBound: 1275
    },

    {
      position: { x: 1675, y: 450 },
      size: { width: 25, height: 20 },
      speed: 3,
      direction: 1,
      leftBound: 1500,
      rightBound: 1775
    },

    {
      position: { x: 2175, y: 450 },
      size: { width: 25, height: 20 },
      speed: 4,
      direction: 1,
      leftBound: 2000,
      rightBound: 2275
    },

    {
      position: { x: 2675, y: 450 },
      size: { width: 25, height: 20 },
      speed: 5,
      direction: 1,
      leftBound: 2500,
      rightBound: 2775
    },

    {
      position: { x: 3175, y: 450 },
      size: { width: 25, height: 20 },
      speed: 6,
      direction: 1,
      leftBound: 3000,
      rightBound: 3275
    },

  ]);


  //calcula la posicion luego de la ultima plataforma
  const lastPlatform = platforms[platforms.length - 1];

  const goalPosition = lastPlatform.position.x + lastPlatform.size.width - 200;

  //

  //reinicia juego
  const restartGame = () => {
    setPlayerPosition({ x: 100, y: 500 });
    setVelocity({ x: 0, y: 0 });
    setCameraPosition(0);
    setGameOver(false);

  };
  useEffect(() => {
    // Manejador de eventos para teclados (opcional)
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      setVelocity((prev) => ({ ...prev, x: 5 }));
    } else if (event.key === 'ArrowLeft') {
      setVelocity((prev) => ({ ...prev, x: -5 }));
    } else if (event.key === ' ' && !isJumping) {
      setIsJumping(true);
      setVelocity((prev) => ({ ...prev, y: -10 }));
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      setVelocity((prev) => ({ ...prev, x: 0 }));
    }
  };

  // Agregar eventos táctiles (móviles)
  const handleTouchStart = (event) => {
    const touchX = event.touches[0].clientX;
    const screenWidth = window.innerWidth;

    // Dividir la pantalla en tres zonas: izquierda, centro y derecha
    const thirdScreenWidth = screenWidth / 3;
    const twoThirdScreenWidth = 2 * thirdScreenWidth;

    // Zona de la izquierda: Mover a la izquierda
    if (touchX < thirdScreenWidth) {
      setVelocity((prev) => ({ ...prev, x: -5 }));
    }
    // Zona del centro: Saltar
    else if (touchX >= thirdScreenWidth && touchX <= twoThirdScreenWidth) {
      if (!isJumping) {
        setIsJumping(true);
        setVelocity((prev) => ({ ...prev, y: -10 }));
      }
    }
    // Zona de la derecha: Mover a la derecha
    else if (touchX > twoThirdScreenWidth) {
      setVelocity((prev) => ({ ...prev, x: 5 }));
    }
  };

  const handleTouchEnd = () => {
    setVelocity((prev) => ({ ...prev, x: 0 })); // Detener movimiento al soltar
  };

  // Asignar los eventos táctiles
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchend', handleTouchEnd);

  // Asignar eventos de teclado (si es necesario)
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return () => {
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
  }, [isJumping, gameOver]);

  // Lógica de actualización del juego
  useEffect(() => {
    const gravity = 0.5;
    const gameLoop = setInterval(() => {
      // Actualizar posición de las trampas (movimiento horizontal)
      setTraps((prevTraps) =>
        prevTraps.map((trap) => {
          let newX = trap.position.x + trap.speed * trap.direction;
          // Si se alcanza el límite, se invierte la dirección
          if (newX < trap.leftBound || newX > trap.rightBound) {
            trap.direction = -trap.direction;
            newX = trap.position.x + trap.speed * trap.direction;
          }
          return { ...trap, position: { ...trap.position, x: newX } };
        })
      );


      setPlayerPosition((prev) => {
        let newY = prev.y + velocity.y;
        let newX = prev.x + velocity.x;

        // Aplicar gravedad
        let newVelocityY = velocity.y + gravity;

        // Detección de colisiones con el suelo
        if (newY >= 550) {
          setGameOver(true);
          alert('¡Has caído en una trampa! Inténtalo de nuevo');
          restartGame();
        }

        // Detección de colisiones con plataformas
        platforms.forEach((platform) => {
          if (
            newX < platform.position.x + platform.size.width &&
            newX + 50 > platform.position.x &&
            newY + 50 > platform.position.y &&
            newY + 50 < platform.position.y + platform.size.height
          ) {
            newY = platform.position.y - 50;
            newVelocityY = 0;
            setIsJumping(false);
          }
        });

        // Detección de colisiones horizontales
        platforms.forEach((platform) => {
          if (
            newY + 50 > platform.position.y &&
            newY < platform.position.y + platform.size.height
          ) {
            if (
              newX + 50 > platform.position.x &&
              newX < platform.position.x
            ) {
              newX = platform.position.x - 50;
            } else if (
              newX < platform.position.x + platform.size.width &&
              newX + 50 > platform.position.x + platform.size.width
            ) {
              newX = platform.position.x + platform.size.width;
            }
          }
        });

        // Detección de colisión con trampas
        traps.forEach((trap) => {
          if (
            newX < trap.position.x + trap.size.width &&
            newX + 50 > trap.position.x &&
            newY < trap.position.y + trap.size.height &&
            newY + 50 > trap.position.y
          ) {
            setGameOver(true);
            alert('¡Has caído en una trampa! Inténtalo de nuevo');
            restartGame();
          }
        });

        //verificar si llego a la meta
        if (newX >= goalPosition) {
          setGameOver(true);
          alert('¡Felicidades! Has llegado a la meta');
          restartGame();
        }

        // Actualizar la posición y la velocidad
        setVelocity((prev) => ({ ...prev, y: newVelocityY }));
        return { x: newX, y: newY };
      });


      // Actualizar la posición de la cámara
      setCameraPosition((prev) => {
        const newCameraPosition = playerPosition.x - window.innerWidth / 2;
        return Math.max(0, newCameraPosition); // Evita que la cámara se desplace fuera del mapa
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [velocity, platforms, playerPosition, goalPosition, traps]);

  return (
    <div className="game-container" style={{ transform: `translateX(-${cameraPosition}px)` }}>
      <Player position={playerPosition} />
      {platforms.map((platform, index) => (
        <Platform
          key={index}
          position={platform.position}
          size={platform.size}
          className={index === platforms.length - 1 ? 'last-platform' : ''}
        />
      ))}
      {traps.map((trap, index) => (
        <Trap key={index} position={trap.position} size={trap.size} />
      ))}
    </div>
  );
};

export default Game;