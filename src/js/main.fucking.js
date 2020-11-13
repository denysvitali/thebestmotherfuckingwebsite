"use strict";
// I wish I could have used ES6 extravaganza, but not everyone supports it :(
var r = document.getElementById("rbw"),
  currentHue = 0,
  hueAddition = 5,
  documentElement = document.getElementsByTagName("html")[0],
  clickEvent = "ontouchstart" in window ? "touchend" : "click",
  classMethods = ["remove", "add"],
  rainbowTiming = 1000 / 25,
  stringArray = ["Add more contrast", "Remove additional contrast", "Inverted mode", "Normal mode"];

function createControls() {
  var contrastButton = document.createElement('button');
    contrastButton.id = "contrast";
    contrastButton.classList.add('cont-inv');
    contrastButton.innerText = stringArray[0];
    contrastButton.tabIndex = 1;

  var nightModeButton = document.createElement('button');
    nightModeButton.id = "invmode";
    nightModeButton.classList.add('cont-inv');
    nightModeButton.innerText = stringArray[2];
    nightModeButton.tabIndex = 2;
  document.body.appendChild(contrastButton);
  document.body.appendChild(nightModeButton);
}

function doThatFuckingColorThing() {
  var color = "hsl(" + currentHue + ", 80%, 60%)",
    nextHue = currentHue + hueAddition;
  currentHue = nextHue > 360 ? 0 : nextHue;
  r.style.color = color;
  setTimeout(doThatFuckingColorThing, rainbowTiming);
}

function someControl(id, textArr, className) {
  /* You see? No fucking jQuery needed, check:
   * http://www.vanilla-js.com/
   * http://jsperf.com/getelementbyid-vs-jquery-id/44
   */
  var el = document.getElementsByTagName("html")[0];
  var acbox = document.getElementById(id),
    textNode = acbox.firstChild,
    toggled = false;
  acbox.addEventListener(
    clickEvent,
    function() {
      var selector = Number((toggled = !toggled));
      textNode.data = textArr[selector];
      el.classList[classMethods[selector]](className);
    },
    false
  );
}

function addContrastControl() {
  someControl(
    "contrast",
    [stringArray[0], stringArray[1]],
    "contrast"
  );
}

function addInvertedControl() {
  someControl("invmode", [stringArray[2], stringArray[3]], "inverted");
}

createControls();
doThatFuckingColorThing();
addContrastControl();
addInvertedControl();
