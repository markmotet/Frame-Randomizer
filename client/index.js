/* 1) Create an instance of CSInterface. */
var csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
var applyButton = document.querySelector("#apply-button");
applyButton.addEventListener("click", randomizeFrames);

var moreOptionsButton = document.querySelector("#options-button");
moreOptionsButton.addEventListener("click", toggleOptions);

/* 3) Write a helper function to pass instructions to the ExtendScript side. */
function randomizeFrames() {
  
  const filmIcon1 = document.getElementById("film-icon-1");
  const filmIcon2 = document.getElementById("film-icon-2");
  const filmIcon3 = document.getElementById("film-icon-3");

  // Stop frame swapping animation
  filmIcon1.style.animation = "";
  filmIcon2.style.animation = "";
  filmIcon3.style.animation = "";

  // Start frame swapping animation. setTimeout() required as a workaround.
  setTimeout(() => {
    filmIcon1.style.animation = "swap-1 0.7s 2";
    filmIcon2.style.animation = "swap-2 0.7s 2";
    filmIcon3.style.animation = "swap-3 0.7s 2";  
  }, 100);

  const framesPerCut = document.getElementById("frames-per-cut-input").value;
  const color = document.getElementById("color-input").value;

  var inputString = "randomizeFrames(" + framesPerCut + "," + color + ")";

  csInterface.evalScript(inputString, test);

}

// Displays a warning message if no clips are selected
function test(evalScriptReturn) {
  if (evalScriptReturn == "EvalScript error.") {
    alert("Please select a clip on the timeline.");
  }
}

function toggleOptions() {

  const options = document.getElementById("options"); 

  if (options.style.display === "none") {
    options.style.display = "block";
  } 
  else {
    options.style.display = "none";
  } 
}