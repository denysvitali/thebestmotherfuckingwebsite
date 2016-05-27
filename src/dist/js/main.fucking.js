'use strict';
var r = document.getElementById('rbw');
var currentHue = 0;
var hueAddition = 5;
function doThatFuckingColorThing()
{
  var color = 'hsl(' + currentHue + ',80%, 60%)';
  if(currentHue + hueAddition > 360)
  {
    currentHue = 0;
  }
  else {
    currentHue += hueAddition;
  }
  r.style.color = color;
  setTimeout(function(){doThatFuckingColorThing();}, 1000/25);
}

doThatFuckingColorThing();