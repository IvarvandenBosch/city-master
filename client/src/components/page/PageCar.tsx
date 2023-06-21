import { createEffect, createSignal, onMount } from "solid-js";

interface CarStyle {
    [key: string]: string | number;
  }
  
export default function PageCar() {
    const [direction, setDirection] = createSignal("right");
    const [speed, setSpeed] = createSignal(10);
    const [distance, setDistance] = createSignal({x: 0, y:0});
  
    const [position, setPosition] = createSignal({ x: 0, y: 0 });
    const [style, setStyle] = createSignal<CarStyle>({
      width: "50px",
      height: "30px",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      rotate: 0,
      transition: "top 0.1s, left 0.1s, rotate 0.2s ease",
    });

    function carMovement(e: MouseEvent, bounding: DOMRect) {
        const cursorX = e.clientX - bounding.left;
        const cursorY = e.clientY - bounding.top;
        const dx = cursorX - position().x;
        const dy = cursorY - position().y;
        const { x, y } = position();
        console.log(distance())
    
        setDistance({ x: dx, y:dy });    
            setTimeout(() => {
                calcDirection(e, bounding)
                if (distance().x !== 0 && distance().y !== 0) {
                    if (direction() === "right") {
                        const newX = x + speed() / 2;
                        setPosition({ x: newX, y }); // Updated here
                    } else if (direction() === "left") {
                        const newX = x - speed() / 2;
                        const newPos = { x: newX, y }; // Updated here
                        setPosition(newPos);
                    } else if (direction() === "down") {
                        const newY = y + speed() / 2;
                        const newPos = { x, y: newY }; // Updated here
                        setPosition(newPos);
                    } else if (direction() === "up") {
                        const newY = y - speed() / 2;
                        const newPos = { x, y: newY }; // Updated here
                        setPosition(newPos);
                    }
                }
            }, 20);
    }
    
    
    function calcDirection(e: MouseEvent, bounding: DOMRect ) {
        const carPosition = position();
        const cursorX = e.clientX - bounding.left; 
        const cursorY = e.clientY - bounding.top; 
      
        // Calculate the difference in positions
        const dx = cursorX - carPosition.x;
        const dy = cursorY - carPosition.y;
      
        // Determine the new direction based on the differences
        let newDir;
        if (Math.abs(dx) > Math.abs(dy)) {
          newDir = dx > 0 ? "right" : "left";
        } else {
          newDir = dy > 0 ? "down" : "up";
        }
      
        // Return the new direction
        if (direction() != newDir) {
            setDirection(newDir)
        }
    }
    

    

    createEffect(() => {
        window.addEventListener('mousemove', (e) => {
            const mainPage = document.querySelector(".car-boundings")
            const bounding: DOMRect = mainPage?.getBoundingClientRect()
            const x = e.clientX - bounding.left; //x position within the element.
            const y = e.clientY - bounding.top;  //y position within the element.
            updateStyle(e)
            if (x > 0 && y > 0) {
                carMovement(e, bounding)
            }
        })
    })
    
    
    function updateStyle(e) {
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
    }

    return (
        <div class="car" style={style()}></div>
    )
}