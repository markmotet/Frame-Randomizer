/* 1) Create an instance of CSInterface. */
var csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
var openButton = document.querySelector("#apply-button");
openButton.addEventListener("click", randomizeFrames);

/* 3) Write a helper function to pass instructions to the ExtendScript side. */
function randomizeFrames() {
  
  const filmIcon1 = document.getElementById("film-icon-1");
  const filmIcon2 = document.getElementById("film-icon-2");
  const filmIcon3 = document.getElementById("film-icon-3");

  // Start frame swapping animation
  filmIcon1.style.animation= "swap-1 0.7s infinite"
  filmIcon2.style.animation= "swap-2 0.7s infinite"
  filmIcon3.style.animation= "swap-3 0.7s infinite"

  // 7 is the colour


  const framesPerCut = document.getElementById("frames-per-cut-input").value;
  csInterface.evalScript("randomizeFrames("+ framesPerCut + ", 15)");


  // End frame swapping animation

  /*
  filmIcon1.style.animation= "swap-1 0.7s"
  filmIcon2.style.animation= "swap-2 0.7s"
  filmIcon3.style.animation= "swap-3 0.7s"
  */
}
