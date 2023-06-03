import { Button, Divider } from "@suid/material";
import { FaSolidCircleArrowLeft, FaSolidCircleArrowRight, FaSolidFileCircleCheck } from "solid-icons/fa";
import { createSignal } from "solid-js";

export default function Tutorial() {
const [done, setDone] = createSignal(false);
  const [currentPage, setCurrentPage] = createSignal(0);
  const steps = [
    {
      title: "Basics",
      instructions:
        "You can see your score at the top of the page, and the bottom right shows how much you have earned, you get money every 5 seconds.",
      src: "1st-step",
    },
    {
      title: "Building",
      instructions:
        "Placing materials can be done by selecting a material from the material list on the right. Rotate the material accordingly and click the tile you want to build on",
      src: "2nd-step",
    },
    {
      title: "Range",
      instructions:
        "You might hear a sound when clicking on the field, this can either mean you don't have enough score, or your cursor isn't within the range of the car.",
      src: "3rd-step",
    },
    {
      title: "Driving",
      instructions:
        "You can drive around using WASD and the Arrow keys, you'll notice you move rather slow. Build roads to navigate quickly around the field.",
      src: "4th-step",
    },
    {
      title: "Dangers",
      instructions:
        "You might see a meteorite, broken road or polluted water appear on the screen. Clear your selected material and click on the broken material to fix it.",
      src: "5th-step",
    },
    {
      title: "Shortcuts",
      instructions:
        "Good shortcuts to remember are the 'r' key, to rotate the current element and the 'c' key to clear your current selected element.",
      src: "6th-step",
    },
  ];
    return ( 
        <section class="tutorial">
        <div class="text" >
          <h2>Tutorial</h2>
          <p>
            Here you will find everything you need to get started on building
            your own city.
            <br />
            Please follow through the steps before playing and have fun!
          </p>
        </div>

        <div class="tut-switch-container">
          {steps.map(
            (el, idx: number) =>
              idx === currentPage() && (
                <div class="tut-switch">
                  <div class="gradient1"></div>
                  <div class="gradient2"></div>
                  <h4>{el.title}</h4>
                  <p>{el.instructions}</p>
                  <img src={`../MainAssets/${el.src}.png`} alt={el.src} />
                  <Divider />
                  <div class="for-back-btns">
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ gap: "10px" }}
                      disabled={idx === 0}
                      onClick={() => {
                        setCurrentPage((prevPageNumber) => prevPageNumber - 1);
                      }}
                    >
                      <FaSolidCircleArrowLeft />
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        idx === steps.length - 1
                          ? setDone(true)
                          : setCurrentPage(
                              (prevPageNumber) => prevPageNumber + 1
                            );
                      }}
                      style={{ gap: "10px" }}
                    >
                      {idx === steps.length - 1 ? (
                        <FaSolidFileCircleCheck />
                      ) : (
                        <FaSolidCircleArrowRight />
                      )}
                      {idx === steps.length - 1 ? "Done" : "Next"}
                    </Button>
                  </div>
                </div>
              )
          )}
        </div>
      </section>
    )
}