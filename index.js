var dotsArea = $('.dotsArea');
var areaWidth = dotsArea.innerWidth();
var areaHeight = dotsArea.innerHeight();
var paused = true;
var count = 0;
var speed = 50;
var interval;

//get a random number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//play pause functionality
$('.button').click(function() {
  
  if(paused){
    $(".button").html("Pause");
    paused = false;
    interval=setInterval(addDot, 1000);
     
    $('.dot').each(function(index, dot){
       var currentPostion = $(dot).position('top').top;
      
      $(dot).animate({top: areaHeight}, ((areaHeight-currentPostion)/speed)*1000, 'linear', function(){
        $(this).remove();
      });
    });
  }
  
  else{
    $(".button").html("Start");
    paused = true;
    $(".dot").stop();
    clearInterval(interval);
  }
});

//adding dots to dotsArea
function addDot(){
  var dotSize = getRandomInt(10,100);
  var dotPostion = getRandomInt(0,(areaWidth-dotSize));
  var dotInt = 11- Math.round(dotSize/10);
  var animationspeed = (areaHeight/speed)*1000;
  var newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  
  var dot = $('<div>')
  .addClass('dot')
  .css("width", dotSize)
  .css("height", dotSize)
  .css("left", dotPostion)
  .css("background-color", newColor)
  .data("value", dotInt);
  
  dot.appendTo(dotsArea).animate({top: areaHeight}, animationspeed, 'linear', function(){
        $(this).remove();
    });
}

//click functionality to score points
$('body').on('click', '.dot', function() {
  count = count+$(this).data("value");
  $(this).remove();

  $(".clickCounter").html("<strong>Points: "+count+"</strong>");
  
});

//creating the slider
var rangeSlider = document.getElementById('slider-range');

noUiSlider.create(rangeSlider, {
	start: [50],
	range: {
		'min': [  10 ],
		'max': [ 100 ]
	},
  format: wNumb({
		decimals: 0,

	})
});


var rangeSliderValueElement = document.getElementById('slider-range-value');

//shows the current slide value 
rangeSlider.noUiSlider.on('update', function( values, handle ) {
	rangeSliderValueElement.innerHTML = "<strong>Speed: "+values[handle]+"px</strong>";

});

//animates the dots as the speed changes on slider
rangeSlider.noUiSlider.on('change', function( values, handle ) {
  speed = parseInt(values[handle]);
  
  if (paused === false){
      $('.dot').each(function(index, dot){
      
      $(dot).stop();
       var currentPostion = $(dot).position('top').top;

      $(dot).animate({top: areaHeight}, ((areaHeight-currentPostion)/speed)*1000, 'linear', function(){
        $(this).remove();  
      });
  }); 
  }
});