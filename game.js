var game_start = false;
var level = 0;
var order = [];
var player = [];
var colors = ["red","blue","yellow","green"];

function startLevel() {
    level = level + 1;
    $("h1").text("Level " + level);
    player = [];
    var nextColor = colors[Math.floor(Math.random() * 4)];
    order.push(nextColor);
    playAudio(nextColor);
    $("button." + nextColor).addClass("next");
    setTimeout(function() {
        $("button." + nextColor).removeClass("next");
    }, 500);
}

function gameOver() {
    level = 0;
    game_start = false;
    order = [];
    player = [];
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("gameover");
    setTimeout(function() {
        $("body").removeClass("gameover");
    }, 100);
    $("h1").text("Aww too bad! Press any key to retry");
}

function checkOrder(color) {
    player.push(color);
    if (player.length === order.length && arraysAreIdentical(player, order)) {
        startLevel();
    }
    else if (!arraysAreIdentical(player, order.slice(0, player.length))) {
        gameOver();
    }
}

function arraysAreIdentical(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
}

function playAudio(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

$(document).keypress(function(event) {
    if (!game_start) {
        game_start = true;
        startLevel();
    }
    else if (game_start) {
        for (var i=0;i<$("button").length;i++) {
            if ($("button").eq(i).text() === event.key) {
                var chosen = $("button").eq(i).attr("class");
                playAudio(chosen);
                checkOrder(chosen);
                $("button").eq(i).addClass("grey");
                (function(index) {
                    setTimeout(function() {
                        $("button").eq(index).removeClass("grey");
                    }, 100);
                })(i);
            }
        }
    }
});

for (var i = 0; i < $("button").length; i++) {
    (function(index) {
        $("button").eq(index).click(function() {
            if (game_start) {
                var chosen = $(this).attr("class");
                playAudio(chosen);
                checkOrder(chosen);
                $(this).addClass("grey");
                setTimeout(function() {
                    $("button").eq(index).removeClass("grey");
                }, 100);
            }
        });
    })(i);
}



