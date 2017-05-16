// generate legend
//generate input for answers - radio buttons

//state objects
const Answers = [
    ["Who cares?", "Obviously.", "I'm Lame.", "It is what it is"], ["OF COURSE", "I live under a rock.", "Superman all the way", "DC is over rated"],
    ["The Browns?", "What sport is this?", "Redskins are awesome!", "Always"], ["Is there anyone greater?", "What about MJ?", "Tennis is so boring", "Who cares"],
    ["P Diddy", "Kanye","Will Smith", "Some guy?"]
];

const Question = [
  "Does it suck that the Patriots won the superbowl", "Is Wonder Woman the greatest female superhero",
  "Are the Redskins worse than the Browns", "Is Serena Williams the greatest athlete of all time",
  "Who sang Wild Wild West"
];

const rightAnswers = [1, 0, 3, 0, 2];


const appState = {
  question: Question,
  answer: Answers,
  rightAns: rightAnswers,
  userAnswer: [],
  currentQuestion: -1,
  score: -1
};

function updateCurQuestion(appState){
  appState.currentQuestion++;
  console.log(appState.currentQuestion);
}

function getQuestion(appState){
  return appState.question[appState.currentQuestion];
}

function getAnswers(appState){
  return appState.answer[appState.currentQuestion];
}

function addAnswer(appState, answer){
  appState.userAnswer.push(answer|0);
  console.log(appState.userAnswer);
}

function resetDefaults(appState){
  appState.userAnswer = [];
  appState.currentQuestion = -1;
  appState.score = -1;
}

//Current tally of right answers.
function numRightAnswers(appState){
  let numRights = 0;
  for(let i = 0; i < appState.rightAns.length; i++){
    if(appState.userAnswer[i] === appState.rightAns[i]){
      numRights++;
    }
  }
  appState.score = numRights;
  //return numRights;
  // appState.userAnswer.forEach(function(element){
  //   if(element === 0){
  //     //console.log("hellloooooooo");
  //     numRights++;
  //     //console.log(numRights);
  //   }
  // });
}

//Should be a final score.
// function calcScore(appState){
//
//   if(appState.score === -1){
//     appState.score = appState.userAnswer[0];
//     //console.log(appState.score);
//   }
//   else{
//     let currScore = appState.score;
//     appState.userAnswer.forEach(function(element){
//       currScore += element;
//       console.log(element);
//     });
//     appState.score = currScore;
//   }
// }


//Rendering function
function displayQuestion(appState){
  console.log(appState.currentQuestion);
  const question = getQuestion(appState);
  const answers = getAnswers(appState);

  let returnHTML =  `<div class="quiz-item"><legend>${question}?</legend>`;

  for(let i = 0; i < answers.length; i++){
    if(i === 0){
      returnHTML += `<div><input type="radio" name="answer" id="ans-right" value="${i}"><label for="ans-right">${answers[i]}</label></div>`;
    }
    else{
      returnHTML += `<div><input type="radio" name="answer" id="ans-wrong" value="${i}"><label for="ans-wrong">${answers[i]}</label></div>`;
    }
  }
  returnHTML; // += `</div>`;
  console.log(returnHTML);
  return returnHTML;

//   if(answers.length < 4){
//     return `<legend>${question}?</legend>
//           <input type="radio" name="answer" id="ans-right" value="0"><label for="ans-right">${answers[0]}</label>
//           <input type="radio" name="answer" id="ans-wrong" value="1"><label for="ans-wrong">${answers[1]}</label>`;
//   }else{
//     return `<legend>${question}?</legend>
//           <input type="radio" name="answer" id="ans-right" value="0" checked><label for="ans-right">${answers[0]}</label>
//           <input type="radio" name="answer" id="ans-wrong-1" value="1"><label for="ans-wrong-1">${answers[1]}</label>
//           <input type="radio" name="answer" id="ans-wrong-2" value="2"><label for="ans-wrong-2">${answers[2]}</label>
//           <input type="radio" name="answer" id="ans-wrong-3" value="2"><label for="ans-wrong-3">${answers[3]}</label>
//   `;
// }
}

function renderQuestion(appState, element){
  let Currquestion = appState.currentQuestion;
  let answered = appState.userAnswer.length;
  numRightAnswers(appState);
  //console.log(appState.currentQuestion);
  //console.log(Currquestion);
  if(Currquestion < 0){
    Currquestion = 0;
    updateCurQuestion(appState);
  }
  let printHTML = displayQuestion(appState);
  printHTML += `
  <div>Question: ${Currquestion+1} out of ${appState.question.length}</div>
  <div>Score: ${appState.score} out of ${answered}</div>
  <div><input type="button" class="ansQuest" name="submit" value="submit"></div></div>`;
  console.log(printHTML);
  element.html(printHTML);
}


//START HERE - LOOK AT MEEEEEEEEEE
function displayAnswer(appState, element){
  const current = appState.currentQuestion;
  //console.log("RIGHT HERE " + current);
  const uA = appState.userAnswer[current];
  const right = appState.rightAns[current];
  //console.log("ME ME EMEMEME " + uA);
  html = `<div class="quiz-item">`;

  if(uA != right){
    html += `You're wrong. The answer is ${appState.answer[current][right]} `;
  }
  else{
    html += `Yup, you got it. ${appState.answer[current][right]} `;
  }
  html += `<input type="button" class="nextQ" name="nextQ" value="next"></div>`;
  element.html(html);
  //element.show();
}

//1/1
//1/2
//2/3

function displayComplete(appState, element){
  const done = appState.currentQuestion;
  // calcScore(appState);
  //const total = appState.score;
  numRightAnswers(appState);
  const correct =  appState.score;
  // appState.userAnswer.forEach(function(element){
  //   if(element === 0){
  //     correct++;
  //   }
  // });
  let html = '';
  console.log("WHAT IS HAPPENING?!?!" + correct);
  if(correct === appState.rightAns.length){
    html += `<div class="quiz-item">Way to go. You know your stuff.`;
  }else if(correct >= Math.floor(appState.rightAns.length/2)){
    html += `<div class="quiz-item">You're on your way.`;
  }else{
    html += `<div class="quiz-item">Better luck next time.`;
  }
  html += ` You got ${correct} out of ${appState.question.length}. 
  Your score is ${correct/appState.question.length*100}%.
  <input type="button" class="new-quiz" name="new-quiz" value="new quiz"></div>`;
  //console.log(html);
  element.html(html);
}

function displayStart(appState, element){
  const start = `
      <div class="intro">
        <h2>Welcome to this Pop culture quiz</h2>
        <h3>May the odds be ever in your favor</h3>

      </div>
      <input type="button" class="start_quiz" name="Start" value="Start Quiz">`;

  element.html(start);
}


//Listeners - will call state mod & rendering functions
function addListeners(){

  $("form.container").ready(function(event){
    displayStart(appState, $("form.container"));
  });

  $(".container").on("click", '.start_quiz', function(event){
    event.preventDefault();
    renderQuestion(appState, $('form.container'));
  });

  $("body").on("click", '.ansQuest', function(event){
    event.preventDefault();
    const selected = ($("input[name='answer']:checked").val());
    if(selected){
      const showAns = ($("div.container"));
      addAnswer(appState, selected);
      displayAnswer(appState, showAns);
      showAns.show();
    }
    else{
      alert("Please provide an answer!");
      return;
    }
  });

  $("div.container").on("click", '.nextQ', function(event){
      event.preventDefault();
      $("div.container").hide();
      if(appState.currentQuestion < appState.question.length-1){
        updateCurQuestion(appState);
        renderQuestion(appState, $('form.container'));
      }
      else{
        //console.log(appState.currentQuestion);
        displayComplete(appState, $('form.container'));
      }

  });

  $(".container").on("click", '.new-quiz', function(event){
    event.preventDefault();
    resetDefaults(appState);
    displayStart(appState, $("form.container"));
  });

}

$(function () {

addListeners();

});


//console.log(displayQuestion(appState));
//renderQuestion(appState);
//displayComplete(appState);
