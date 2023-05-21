// Car.tsx

import { createSignal, onCleanup, createEffect, onMount } from "solid-js";

interface CarStyle {
  [key: string]: string | number;
}

export default function Car(props: { volume: number; }) {
  const [direction, setDirection] = createSignal("right");
  const [speed, setSpeed] = createSignal(10);
  const [leftTrail, setLeftTrail] = createSignal<any[]>([]);
  const [rightTrail, setRightTrail] = createSignal<any[]>([]);

  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const [style, setStyle] = createSignal<CarStyle>({
    position: "absolute",
    width: "50px",
    height: "30px",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    rotate: 0,
    transition: "top 0.1s, left 0.1s, rotate 0.2s ease",
  });
  const [showRange, setShowRange] = createSignal<any>(false);
  
  // Add event listeners for keydown and update the position accordingly
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      // Update position based on the key pressed
      if (key === "ArrowUp" || key === "w") {
        
        event.preventDefault();
        if (position().y - speed() >= 2) {
          checkOverlap();
          setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - speed() }));
          
          setDirection("up");
        }
      } else if (key === "ArrowDown" || key === "s") {
        event.preventDefault();
        if (position().y + speed() < 970) {
          checkOverlap();
          setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + speed() }));
          setDirection("down");
        }
      } else if (key === "ArrowLeft" || key === "a") {
        if (position().x - speed() >= 0) {
          checkOverlap();
          setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - speed() }));
          setDirection("left");
        }
      } else if (key === "ArrowRight" || key === "d") {
        if (position().x + speed() < 960) {
          checkOverlap();
          setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + speed() }));
          setDirection("right");
        }
      }
    };

    
    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });
  
  const updateLeftTrail = () => {
    if (direction() === "right") {
      let newPos = {...position()}
      newPos.y += 10
      setLeftTrail((prevTrail) => [...prevTrail, newPos])
    } else if (direction() === "down") {
      let newPos = {...position()}
      newPos.x += 27
      setLeftTrail((prevTrail) => [...prevTrail, newPos])
    } else if (direction() === "left") {
      let newPos = {...position()}
      newPos.x += 27
      newPos.y += 18
      setLeftTrail((prevTrail) => [...prevTrail, newPos])
    } else if (direction() === "up") {
      let newPos = {...position()}
      newPos.x += 17
      newPos.y += 27
      setLeftTrail((prevTrail) => [...prevTrail, newPos])
    }
  };

  const updateRightTrail = () => {
    if (direction() === "right") {
      let newPos = {...position()}
      newPos.y += 20
      setRightTrail((prevTrail) => [...prevTrail, newPos])
    } else if (direction() === "down") {
      let newPos = {...position()}
      newPos.x += 17
      setRightTrail((prevTrail) => [...prevTrail, newPos])
    } else if (direction() === "left") {
      let newPos = {...position()}
      newPos.x += 20
      newPos.y += 7
      setRightTrail((prevTrail) => [...prevTrail, newPos])
    } else if (direction() === "up") {
      let newPos = {...position()}
      newPos.x += 30
      newPos.y += 30
      setRightTrail((prevTrail) => [...prevTrail, newPos])
    }
  };

  function playCantDoThat() {
    const sound = new Audio("../GameAudio/wrong.mp3");
    sound.volume = props.volume / 100;
    sound.play();
    return
  }

  function checkOverlap() {
    const carElement = document.querySelector('.car');
    const roadClasses = ["road-h", "road-Ld", "road-Ulr", "road-fourway"];
  
    if (carElement) {
      const carRect = carElement.getBoundingClientRect();
      const overlappingElements = Array.from(document.getElementsByClassName('cols')).filter((element) => {
        const elementRect = element.getBoundingClientRect();
        return roadClasses.some((className) => element.classList.contains(className)) && doRectsOverlap(carRect, elementRect);
      });
  
      if (overlappingElements.length > 0) {
        if (checkBrokenElement(overlappingElements)) {
          if (speed() !== 0.2) {
            console.log("Overlapping with speed of .2")
            setSpeed(0.2)
          }
        }else if (speed() !== 10) {
          console.log("Overlapping with speed of 10")
          setSpeed(10)
        }
      } else {
        if (leftTrail().length % 2 === 0 && leftTrail() != 0 ) {
          updateLeftTrail()
          updateRightTrail()
        }
        if (speed() !== 1) {
          console.log("Not overlapping with speed of 1")
          setSpeed(1)
        }
      }
    }
  }
  
  // Helper function to check if two rectangles overlap
  function doRectsOverlap(rect1: DOMRect, rect2: DOMRect) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  function checkBrokenElement(elList: Element[]) {
    let hasBroken = false
    elList.forEach(element => {
      if (element.classList.contains("broken")) {
        hasBroken = true
      }
    });
    return hasBroken
  }
  
  // Update the style signal when the position changes
  createEffect(() => {
    const { x, y } = position();
    const dir = direction();
    setStyle((prevStyle) => ({
      ...prevStyle,
      top: `${y}px`,
      left: `${x}px`,
      rotate:
        dir === "right"
          ? 0 + "deg"
          : dir === "down"
          ? 90 + "deg"
          : dir === "left"
          ? 180 + "deg"
          : 270 + "deg",
    }));
  });

  createEffect(() => {
    setInterval(() => {
      // Reduce Left Trail length
      let newLeftTrail = [...leftTrail()]
      newLeftTrail.shift()
      setLeftTrail(newLeftTrail)
      // Reduce Right Trail length
      let newRightTrail = [...rightTrail()]
      newRightTrail.shift()
      setRightTrail(newRightTrail)
    }, 30)
  })
    
  return (
    <>
      <div class={`car ${showRange() ? "show-range" : ""}`} style={style()}>
        <div class="top" onClick={playCantDoThat}></div>
        <div class="right" onClick={playCantDoThat}></div>
        <div class="bottom" onClick={playCantDoThat}></div>
        <div class="left" onClick={playCantDoThat}></div>
      </div>
      {leftTrail().map((trailPosition, index) => (
        <div
          key={index}
          className="trail"
          style={{
            top: trailPosition.y + "px",
            left: trailPosition.x + "px",
            width: 5 * (index / 100) > 5 ? 5 + "px" : 5 * (index / 100) + "px",
            height: 5 * (index / 100) > 5 ? 5 + "px" : 5 * (index / 100) + "px",
            opacity: (index / 100) / 2 
          }}
        />
      ))}
      {rightTrail().map((trailPosition, index) => (
        <div
          key={index}
          className="trail"
          style={{
            top: trailPosition.y + "px",
            left: trailPosition.x + "px",
            width: 5 * (index / 100) > 5 ? 5 + "px" : 5 * (index / 100) + "px",
            height: 5 * (index / 100) > 5 ? 5 + "px" : 5 * (index / 100) + "px",
            opacity: (index / 100) / 2 
          }}
        />
      ))}
    </>
  );
}
