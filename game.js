var level=0;
var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var started=false;
function nextSequence(){
    level++;
    userClickedPattern=[];
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // checkAnswer(level);
}
function startOver(){
    gamePattern=[];
    started=false;
    level=0;
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

$(".btn").on("click",function(event){
    var userChosenColour=event.target.id;        // console.log(event.target.id);
    userClickedPattern.push(userChosenColour);  // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$(document).on("keypress",function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});










// var randomChosenColour=buttonColours[randomNumber];
// gamePattern.push(randomChosenColour);
// $("button").on("click",function(){
//     $("#"+randomChosenColour).fadeIn(100).fadeOut(100);
// });
// var colour="#"+randomChosenColour;
// $(colour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
