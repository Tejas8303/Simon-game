var buttonColours=["red", "blue", "green", "yellow" ];


var gamePattern=[];
var userClickedPattern=[];

var flag=false;

var level=0;

$(document).keypress(function(){

    if(!flag){
        $("#level-title").text("Level " + level);
        nextsequence();
        flag =true;
    }
});



$(".btn").click(function() {

    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
  
    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel) {
    
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextsequence();
      }, 1000);

    }

  } else {
    gameover();
  }
}

function nextsequence(){

  userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
    
    
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}


function gameover(){

  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function (){
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  level=0;
  gamePattern=[];
  flag=false;
}
