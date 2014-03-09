/**
* This project is an to acknowledge the awesome spritz reading method
*
*
* This is a very ugly (sorry) proof of concept for the awesome http://learn2spritz.com/ methode for for fast reading. 

*/


// http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=Malaysia_Airlines_Flight_370

//var element1 = document.createElement("script");element1.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js";element1.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(element1);
var text = "";


document.getElementById('getWiki').addEventListener('click', function() {
	startButton.disabled = true;
stopButton.disabled = true;
restartButton.disabled = true;
  startQueryWiki();
}, false);

function startQueryWiki(){

var wikiTi = document.getElementById('wikititle').value;

$.getJSON( "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsectionformat=plain&indexpageids=&titles="+wikiTi+"&callback=?", function( data ) {
  myData = data.query.pages[data.query.pageids[0]].extract;
  text = jQuery(myData).text();
  textArray = text.split(' ');
  //runSpritz();

  startButton.disabled = false;
restartButton.disabled = false;	

});
};



/**
 * I did this just to check the difference of my reading speed
 * between a really simple method and the algorithm that Spritz is using.
 * Play with the code and enjoy.
 * To read a different text just update the text div.
 */

var readTime = 300,
    reader = document.getElementById('reader'),
    //textElement = document.getElementById('text'),
    //text = textElement.value,
    textArray = text.split(' '),
    startButton = document.getElementById('start'),
    stopButton = document.getElementById('stop'),
    restartButton = document.getElementById('restart'),
    speedSelect = document.getElementById('read-speed'),
    play,
    pendingCall,
    readText = function() {
      var word = textArray.shift(),
          wordLength = word.length,
          split,
          leftPosition = 0,
          character,
          timeOut = readTime;
      
      // Add the red character.
      if (wordLength === 1) {
        word = '<b>' + word + '</b>';
      } else if (wordLength > 1) {
        split = Math.floor(wordLength / 2) - 1;
        // If the world is really long, move the bold more to the left so the eye doesn't need to be moved to start reading.
        if (split > 3) {
          split = 3;
        }
        word = word.slice(0, split) + '<b>' + word.slice(split, (split + 1)) + '</b>' + word.slice((split + 1), wordLength);
      }
      
      reader.innerHTML = word;
      
      if (wordLength > 0) {
        // Update the position to make it centered.
        character = reader.children[0];
        leftPosition = 100 - character.offsetLeft - (character.offsetWidth / 2);
        reader.style.left = leftPosition + 'px';
        
        // Process special characters that need a small pause.
        if (word.indexOf(',') !== -1 || word.indexOf('"') !== -1) {
          timeOut *= 2;
        } else if (word.indexOf('.') !== -1) {
          timeOut *= 4;
        }
      }
      
      if (textArray.length > 0 && play) {
        pendingCall = window.setTimeout(readText, timeOut);
      } else if (play) {
        reader.textContent = 'The end';
        reader.style.left = '0px';
        play = false;
      }
    };

startButton.addEventListener('click', function() {
	startButton.disabled = true;
stopButton.disabled = false;
  play = true;
  if (textArray.length === 0) {
    textArray = text.split(' ');
  }
  readText();
}, false);
stopButton.addEventListener('click', function() {
	startButton.disabled = false;
stopButton.disabled = true;
  play = false;
  window.clearTimeout(pendingCall);
}, false);
restartButton.addEventListener('click', function() {
  window.clearTimeout(pendingCall);
  play = true;
  textArray = text.split(' ');
  readText();
}, false);
speedSelect.addEventListener('change', function() {
  readTime = speedSelect.value;
}, false);

startButton.disabled = true;
stopButton.disabled = true;
restartButton.disabled = true;
