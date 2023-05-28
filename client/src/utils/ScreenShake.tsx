export const ScreenShake = (intensity: number = 10, duration: number = 20) => {
  document.body.style.transition = "50ms";
  let count = 0;
  setTimeout(function shake() {
    count++;
    document.body.style.transform = `translate(${
      (Math.random() > 0.5 ? Math.random() : -Math.random()) * intensity
    }px, ${
      (Math.random() > 0.5 ? Math.random() : -Math.random()) * intensity
    }px)`;
    if (count === duration) {
      // For Loop has ended
      document.body.style.transform = `translate(0px,0px)`;
      return;
    }
    setTimeout(shake, 2);
  }, 1);
};
