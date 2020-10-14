var currentQuestion = 0; //the question e are currently on

var score = 0; // number of correct answers

var timeleft = 30; // time left for countdown timer
var stopTimer = false;
var countdownTimer;
var showInstructions = true;
const mq = window.matchMedia("(min-width: 1000px)");


//questions is an array of question objects
var questions = [{
    "question": "Who is the player in this picture?",
    "a": "Michael Jordan",
    "b": "LeBron James",
    "c": "Hakeem Olajuwon",
    "d": "Shaquille O'Neal",
    "e": "David Robinson",
    "image": "quizimages/q1.jpg",
    "answer": "d"
  },
  {
    "question": "Who is the NBA's all-time leading scorer?",
    "a": "Kobe Bryant",
    "b": "Karl Malone",
    "c": "Kareem Abdul-Jabbar",
    "d": "Michael Jordan",
    "e": "LeBron James",
    "image": "quizimages/q2.jpg",
    "answer": "c"
  },
  {
    "question": "Who is the shortest player in NBA history?",
    "a": "Spud Webb",
    "b": "George Muresan",
    "c": "Earl Boykins",
    "d": "Muggsy Bogues",
    "e": "Fat Lever",
    "image": "quizimages/q3.jpg",
    "answer": "d"
  },
  {
    "question": "Who is the NBA's all-time steals leader?",
    "a": "John Stockton",
    "b": "Chris Paul",
    "c": "LeBron James",
    "d": "Gary Payton",
    "e": "Jason Kidd",
    "image": "quizimages/q4.jpg",
    "answer": "a"
  },
  {
    "question": "Stephen Curry holds the record for most made three-pointers in a season. How many did he score in his record-breaking year?",
    "a": "346",
    "b": "381",
    "c": "367",
    "d": "413",
    "e": "402",
    "image": "quizimages/q5.jpg",
    "answer": "e"
  },
  {
    "question": "Who has the most missed field goal attempts in their career?",
    "a": "John Havilcek",
    "b": "Kobe Bryant",
    "c": "Dirk Nowitzki",
    "d": "Carmelo Anthony",
    "e": "Allen Iverson",
    "image": "quizimages/q6.jpg",
    "answer": "b"
  },
  {
    "question": "Jose Calderon holds the record for best free-throw percentage in a single season. What was the record breaking percentage?",
    "a": "97.4%",
    "b": "98.1%",
    "c": "96.6%",
    "d": "98.9%",
    "e": "97.8%",
    "image": "quizimages/q7.jpg",
    "answer": "b"
  },
  {
    "question": "Who is the player in this picutre?",
    "a": "George Gervin",
    "b": "Shawn Marion",
    "c": "Clyde Drexler",
    "d": "Greg Oden",
    "e": "Kenny Smith",
    "image": "quizimages/q8.jpg",
    "answer": "c"
  },
  {
    "question": "Who is the winningest coach in NBA history?",
    "a": "Gregg Popovic",
    "b": "Red Auerbach",
    "c": "Pat Riley",
    "d": "Phil Jackson",
    "e": "Don Nelson",
    "image": "quizimages/q9.jpg",
    "answer": "e"
  },
  {
    "question": "Who is the only player born in the 2000's to make the conference finals?",
    "a": "Jayson Tatum",
    "b": "Kendrick Nunn",
    "c": "Kostas Antetokounmpo",
    "d": "Tyler Herro",
    "e": "Duncan Robinson",
    "image": "quizimages/q10.jpg",
    "answer": "d"
  },
  {
    "question": "Which team was the only team to ever double their opponent's score?",
    "a": "Indiana Pacers (against the Portland Trail Blazers)",
    "b": "Miami Heat (against the Charlotte Bobcats)",
    "c": "Phoenix Suns (against the Orlando Magic)",
    "d": "Los Angeles Lakers (against the Sacramento Kings)",
    "e": "Boston Celtics (against the Rochester Royals)",
    "image": "quizimages/q11.jpg",
    "answer": "a"
  },
  {
    "question": "Who holds the record for the fastest triple-double?",
    "a": "Russell Westbrook",
    "b": "Nikola Jokic",
    "c": "Oscar Robertson",
    "d": "Jim Tucker",
    "e": "Wilt Chamberlain",
    "image": "quizimages/q12.jpg",
    "answer": "b"
  }



];

//register the service worker when the js loads
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}//if

// run code when the body loads
function initialize() {
  document.getElementById("inst").style.display = "none";
  document.getElementById("lightbox").style.display = "none";
  loadQuestion();
};

function instruction() {


  if (showInstructions == true) {
    showInstructions = false;
    document.getElementById("inst").style.display = "block";
  } else {
    showInstructions = true
    document.getElementById("inst").style.display = "none";
  }
}




//load the current question on the page
function loadQuestion() {

  //check for last question
  let message = "";
  stopTimer = false;

  if (currentQuestion == questions.length) {

    // media query event handler



    if (score == 12 || score == 11) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are LEBRON JAMES!" + "<br>" + "Click to start again.";
      // media query change

      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/12.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/121.jpg')";
      }

      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";

    } else if (score == 10 || score == 9) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are KEVIN DURANT!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/11.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/111.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 8) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are STEPHEN CURRY!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/10.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/101.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 7) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are ANTHONY DAVIS!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/9.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/91.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 6) {
      message = "You have finished the quiz. Not terrible but not great. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are TRAE YOUNG!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/8.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/81.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 5 || score == 4) {
      message = "You have finished the quiz. Not your best effort. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are ZION WILLIAMSON!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/7.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/71.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 3 || score == 2) {
      message = "You have finished the quiz. Quite horrendous. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are JAYLEN BROWN!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/6.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/61.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 1) {
      message = "You have finished the quiz. That was terrible. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are LONZO BALL!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/5.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/51.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 0) {
      message = "You have finished the quiz. Awful, to say the least. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are KYLE KUZMA! <br> Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/4.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/41.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    }

    message = message + "<br><br> Your percentage was " + Math.round(score / questions.length * 100) + "%.";

    //show the lightbox with feedback
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").innerHTML = "1/" + questions.length;

    document.getElementById('lifeline').style.display = 'block';
    document.getElementById('free').style.display = 'block';


  } else {
    document.getElementById("lightbox").style.backgroundImage = "";
    document.getElementById("lightbox").style.backgroundColor = "rgba(0,0,0,0.99)";
  }

  //preload the image
  var img = document.getElementById("image");
  var preLoadImg = new Image();
  preLoadImg.src = questions[currentQuestion].image;

  preLoadImg.onLoad = function() {
    img.width = this.width;
  }
  img.style.maxWidth = "500px";
  img.src = preLoadImg.src;

  //load the question
  document.getElementById("question").innerHTML = questions[currentQuestion].question;
  document.getElementById("a").innerHTML = "a) " + questions[currentQuestion].a;
  document.getElementById("b").innerHTML = "b) " + questions[currentQuestion].b;
  document.getElementById("c").innerHTML = "c) " + questions[currentQuestion].c;
  document.getElementById("d").innerHTML = "d) " + questions[currentQuestion].d;
  document.getElementById("e").innerHTML = "e) " + questions[currentQuestion].e;


  startTimer();

} // loadQuestion


function lifeLine() {
  if (currentQuestion == 0) {
    document.getElementById("a").innerHTML = "";
    document.getElementById("b").innerHTML = "";
  } else if (currentQuestion == 1) {
    document.getElementById("a").innerHTML = "";
    document.getElementById("d").innerHTML = "";
  } else if (currentQuestion == 2) {
    document.getElementById("b").innerHTML = "";
    document.getElementById("e").innerHTML = "";
  } else if (currentQuestion == 3) {
    document.getElementById("c").innerHTML = "";
    document.getElementById("e").innerHTML = "";
  } else if (currentQuestion == 4) {
    document.getElementById("a").innerHTML = "";
    document.getElementById("c").innerHTML = "";
  } else if (currentQuestion == 5) {
    document.getElementById("a").innerHTML = "";
    document.getElementById("c").innerHTML = "";
  } else if (currentQuestion == 6) {
    document.getElementById("a").innerHTML = "";
    document.getElementById("c").innerHTML = "";
  } else if (currentQuestion == 7) {
    document.getElementById("a").innerHTML = "";
    document.getElementById("b").innerHTML = "";
  } else if (currentQuestion == 8) {
    document.getElementById("b").innerHTML = "";
    document.getElementById("c").innerHTML = "";
  } else if (currentQuestion == 9) {
    document.getElementById("b").innerHTML = "";
    document.getElementById("e").innerHTML = "";
  } else if (currentQuestion == 10) {
    document.getElementById("c").innerHTML = "";
    document.getElementById("d").innerHTML = "";
  } else if (currentQuestion == 11) {
    document.getElementById("d").innerHTML = "";
    document.getElementById("e").innerHTML = "";
  }

  document.getElementById('lifeline').style.display = 'none';

}

//free answer
function freeAnswer() {
  score++; // or score +1 or score += 1
  if (currentQuestion + 2 <= 12) {
    document.getElementById("score").innerHTML = (currentQuestion + 2) + "/" + questions.length;
  } else {
    document.getElementById("score").innerHTML = questions.length + "/" + questions.length;
  }

  let message = "";
  stopTimer = true;

  if (currentQuestion == questions.length) {




    if (score == 12 || score == 11) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are LEBRON JAMES!" + "<br>" + "Click to start again.";
      // media query change

      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/12.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/121.jpg')";
      }

      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";

    } else if (score == 10 || score == 9) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are KEVIN DURANT!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/11.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/111.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 8) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are STEPHEN CURRY!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/10.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/101.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 7) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are ANTHONY DAVIS!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/9.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/91.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 6) {
      message = "You have finished the quiz. Not terrible but not great. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are TRAE YOUNG!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/8.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/81.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 5 || score == 4) {
      message = "You have finished the quiz. Not your best effort. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are ZION WILLIAMSON!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/7.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/71.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 3 || score == 2) {
      message = "You have finished the quiz. Quite horrendous. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are JAYLEN BROWN!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/6.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/61.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 1) {
      message = "You have finished the quiz. That was terrible. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are LONZO BALL!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/5.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/51.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 0) {
      message = "You have finished the quiz. Awful, to say the least. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are KYLE KUZMA! <br> Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/4.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/41.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    }

    message = message + "<br><br> Your percentage was " + Math.round(score / questions.length * 100) + "%.";

    //show the lightbox with feedback
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").innerHTML = "1/" + questions.length;

    document.getElementById('lifeline').style.display = 'block';
    document.getElementById('free').style.display = 'block';


  } else {
    document.getElementById("lightbox").style.backgroundImage = "";
    document.getElementById("lightbox").style.backgroundColor = "rgba(0,0,0,0.99)";
  }

  //preload the image
  var img = document.getElementById("image");
  var preLoadImg = new Image();
  preLoadImg.src = questions[currentQuestion].image;

  preLoadImg.onLoad = function() {
    img.width = this.width;
  }
  img.style.maxWidth = "500px";
  img.src = preLoadImg.src;

  //load the question
  document.getElementById("question").innerHTML = questions[currentQuestion].question;
  document.getElementById("a").innerHTML = "a) " + questions[currentQuestion].a;
  document.getElementById("b").innerHTML = "b) " + questions[currentQuestion].b;
  document.getElementById("c").innerHTML = "c) " + questions[currentQuestion].c;
  document.getElementById("d").innerHTML = "d) " + questions[currentQuestion].d;
  document.getElementById("e").innerHTML = "e) " + questions[currentQuestion].e;

  document.getElementById('free').style.display = 'none';


}

//start the timer
function startTimer() {
  if (currentQuestion == 0) {
    timeleft = 120;
  } else {
    timeleft = 30;
  }
  countdownTimer = setInterval(function() {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    timeleft -= 1;
    endTimer();
  }, 1000);
} //startTimer

//end the timer
function endTimer() {
  if (timeleft < 0 || stopTimer) {
    clearInterval(countdownTimer);
    currentQuestion++; //add 1 to currentQuestion
    loadQuestion();
  }

} //endTimer

//make the next question button work -- everything is the same as loadQuestion() except for stopTimer
function nextQuestion() {
  //check for last question
  let message = "";
  stopTimer = true;

  if (currentQuestion == questions.length) {




    if (score == 12 || score == 11) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are LEBRON JAMES!" + "<br>" + "Click to start again.";
      // media query change

      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/12.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/121.jpg')";
      }

      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";

    } else if (score == 10 || score == 9) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are KEVIN DURANT!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/11.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/111.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 8) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are STEPHEN CURRY!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/10.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/101.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 7) {
      message = "Congrats! You have finished the quiz. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are ANTHONY DAVIS!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/9.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/91.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 6) {
      message = "You have finished the quiz. Not terrible but not great. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are TRAE YOUNG!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/8.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/81.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 5 || score == 4) {
      message = "You have finished the quiz. Not your best effort. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are ZION WILLIAMSON!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/7.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/71.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 3 || score == 2) {
      message = "You have finished the quiz. Quite horrendous. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are JAYLEN BROWN!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/6.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/61.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 1) {
      message = "You have finished the quiz. That was terrible. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are LONZO BALL!" + "<br>" + "Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/5.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/51.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score == 0) {
      message = "You have finished the quiz. Awful, to say the least. Your score was " + score + "/" + questions.length + ". " + "<br>" + "You are KYLE KUZMA! <br> Click to start again.";
      if (mq.matches) {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/4.jpg')";
      } else {
        document.getElementById("lightbox").style.backgroundImage = "url('quizimages/41.jpg')";
      }
      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    }

    message = message + "<br><br> Your percentage was " + Math.round(score / questions.length * 100) + "%.";

    //show the lightbox with feedback
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").innerHTML = "1/" + questions.length;

    document.getElementById('lifeline').style.display = 'block';
    document.getElementById('free').style.display = 'block';

  } else {
    document.getElementById("lightbox").style.backgroundImage = "";
    document.getElementById("lightbox").style.backgroundColor = "rgba(0,0,0,0.99)";
  }

  //preload the image
  var img = document.getElementById("image");
  var preLoadImg = new Image();
  preLoadImg.src = questions[currentQuestion].image;

  preLoadImg.onLoad = function() {
    img.width = this.width;
  }
  img.style.maxWidth = "500px";
  img.src = preLoadImg.src;

  //load the question
  document.getElementById("question").innerHTML = questions[currentQuestion].question;
  document.getElementById("a").innerHTML = "a) " + questions[currentQuestion].a;
  document.getElementById("b").innerHTML = "b) " + questions[currentQuestion].b;
  document.getElementById("c").innerHTML = "c) " + questions[currentQuestion].c;
  document.getElementById("d").innerHTML = "d) " + questions[currentQuestion].d;
  document.getElementById("e").innerHTML = "e) " + questions[currentQuestion].e;

  if (currentQuestion + 2 <= 12) {
    document.getElementById("score").innerHTML = (currentQuestion + 2) + "/" + questions.length;
  } else {
    document.getElementById("score").innerHTML = questions.length + "/" + questions.length;
  }
}

//mark the current question
function markIt(ans) {
  let message = "";


  //if the answer is correct
  if (ans == questions[currentQuestion].answer) {
    // alert("Correct"); //don't use this in real web design

    //add to score and move to next question
    score++; // or score +1 or score += 1
    document.getElementById("score").innerHTML = (currentQuestion + 2) + "/" + questions.length;


    message = "Correct answer! Your score is " + score + "/" + (currentQuestion + 1) + ".";
    message = message + "<br><br> Your percentage is " + Math.round(score / (currentQuestion + 1) * 100) + "%.";




  } //if

  //otherwise notify user the answer is incorrect
  else {
    if (currentQuestion + 2 <= 12) {
      document.getElementById("score").innerHTML = (currentQuestion + 2) + "/" + questions.length;
    } else {
      document.getElementById("score").innerHTML = questions.length + "/" + questions.length;
    }
    message = "Incorrect answer! Your score is " + score + "/" + (currentQuestion + 1) + ".";
    message = message + "<br><br> Your percentage is " + Math.round(score / (currentQuestion + 1) * 100) + "%.";
  } //else

  //show the lightbox with feedback
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").innerHTML = message;
  /*
  	 //move to the next quesiton
  	 currentQuestion++; //add 1 to currentQuestion
  	 loadQuestion();*/
  stopTimer = true;
  endTimer();
} // markIt

// close the lightbox 
function closeLightBox() {
  document.getElementById("lightbox").style.display = "none";
} //closeLightBox