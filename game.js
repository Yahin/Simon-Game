var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

//starting press
$(document).dblclick(function() {
    if(!started){
        $("#level").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//button click
$(".btn").click(function(){
    var userColor = $(this).attr("id");
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userPattern.length-1);
});

 //checker
 function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if(gamePattern.length === userPattern.length){
            setTimeout(function(){nextSequence()},1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level").text("Game Over, Double Click anywhere to restart!");
        setTimeout(function(){$("body").removeClass("game-over")},200);
        startover();
    }
 }

//next sequence
function nextSequence(){
    userPattern = [];
    level++;
    $("#level").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

// startover
function startover(){
    level = 0;
    gamePattern = [];
    started = false;
}

//play sound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//animate press 
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){$("#" + currentColor).removeClass("pressed")},100);
 }


