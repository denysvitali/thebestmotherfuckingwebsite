'use strict';
// I wish I could have used ES6 extravaganza, but not everyone supports it :(
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

function someControl(id, textArr, className){
  // You see? No fucking jQuery needed, check http://jsperf.com/getelementbyid-vs-jquery-id/44
  var acbox = document.getElementById(id);
  var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');
  var el = document.getElementsByTagName('html')[0];
  acbox.addEventListener(clickEvent, function(){
    if(acbox.innerHTML === textArr[0]){
      el.classList.add(className);
      acbox.innerHTML = textArr[1];
    }
    else{
      el.classList.remove(className);
      acbox.innerHTML = textArr[0];
    }
  });
}

function addContrastControl(){
  someControl('contrast', ['Add more contrast', 'Remove additional contrast'], 'contrast');
}

function addInvertedControl(){
  someControl('invmode', ['Inverted mode', 'Normal mode'], 'inverted');
}

doThatFuckingColorThing();
addContrastControl();
addInvertedControl();
