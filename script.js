let score = 0;
let questionsCount = 0;
const questions = [
  "What is the name of the brightest star in the sky?",
  "What is the name of the closest star to our Solar system?",
  "What star remains in the same position in the sky during the night?",
  "Milky Way is a spiral galaxy with several arms. Which of them our solar system belongs to?",
  "What is the closest galaxy to ours?"
];
const answers = [
  ["Altair","Sirius","Vega","Polaris"],
  ["Alpha Centauri A","Alpha Centauri B","Proxima Centauri","Barnard's star"],
  ["Deneb","Polaris","Sirius","Aldebaran"],
  ["Perseus arm","Orion","Norma","Sagittarius"],
  ["Andromeda galaxy","Circinus galaxy","Pinwheel galaxy","Sombrero galaxy"]
];
const correctAnswers = ["Sirius","Proxima-Centauri","Polaris","Orion","Andromeda-galaxy"];


/*** display a question ***/
const displayQuestion = (numberOfQuestion) => {
  // create a section
  const section = document.createElement('SECTION');
  section.setAttribute('class', 'page');
  section.setAttribute('id', numberOfQuestion);

  // create a question
  const divQuestion = document.createElement('DIV');
  divQuestion.setAttribute('class', 'question');

  const label = document.createElement('LABEL');
  label.textContent = questions[numberOfQuestion];
  const br = document.createElement('BR');
  label.appendChild(br);

  divQuestion.appendChild(label);
  section.appendChild(divQuestion);

  // create options for answers
  const divAnswers = document.createElement('DIV');
  divAnswers.setAttribute('class', 'answers');

  for (let i = 0; i < answers[numberOfQuestion].length; i++) {
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'star');
    input.setAttribute('id', answers[numberOfQuestion][i].toLowerCase());

    const changedFormatOfValue = answers[numberOfQuestion][i].toLowerCase().replace(/\s/g, "-");
    input.setAttribute('value', changedFormatOfValue);

    const br = document.createElement('BR');

    const label = document.createElement('LABEL');
    label.setAttribute('for', answers[numberOfQuestion][i].toLowerCase());
    label.textContent = answers[numberOfQuestion][i];

    label.appendChild(input);
    label.appendChild(br);
    const divOption = document.createElement('DIV');
    divOption.setAttribute('class', 'answer');
    divOption.appendChild(label);
    divAnswers.appendChild(divOption);
  }

  // append created section to the form
  section.appendChild(divAnswers);
  document.querySelector('#questionAndAnswers').appendChild(section);

  // add event listener to the 'answers' div of the created section
  document.querySelector('.answers').addEventListener('click', markAsChosen);
}


/*** start quiz ***/
const startTheQuiz = () => {
  document.querySelector('#introduction').style.display = "none";
  document.querySelector('#quiz-form').style.display = "block";
  displayQuestion(0);
}


/*** mark an option as chosen ***/
const markAsChosen = (event) => {
  const options = document.querySelectorAll('.chosen-answer');

  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove('chosen-answer');
  }

  if (event.target.tagName === "DIV" && event.target.className === "answer") {
    event.target.setAttribute('class', 'answer chosen-answer');
    event.target.firstChild.childNodes[1].checked = true;
  } else if (event.target.tagName === "INPUT") {
    event.target.parentNode.parentNode.setAttribute('class', 'answer chosen-answer');
  }
}

/** Restart the quiz **/
const restartQuiz = () => {
  score = 0;
  questionsCount = 0;
  document.querySelector('#score').style.display = "none";
  document.querySelector('#introduction').style.display = "block";

  document.querySelector('#summary').style.display = "none";
  document.querySelector('#score').style.paddingTop = "0px";

  document.querySelector('#score').removeChild(document.querySelector('#restart'));
}

/*** change question ***/
const changeQuestion = (event) => {
  event.preventDefault();
  // remove current question
  document.querySelector('#questionAndAnswers').removeChild(document.querySelector('section'));

  if (questionsCount < 4) {
    // show next question
    questionsCount++;
    displayQuestion(questionsCount);
  } else if (questionsCount === 4) {
    document.querySelector('#quiz-form').style.display = "none";

    // add a restart button
    const restartButton = document.createElement('BUTTON');
    restartButton.textContent = 'Restart';
    restartButton.setAttribute('id', 'restart');
    document.querySelector('#score').appendChild(restartButton);
    document.querySelector('#restart').addEventListener('click', restartQuiz);

    // reveal the summary screen
    document.querySelector('#summary').style.display = "block";
    document.querySelector('#score').style.paddingTop = "35vh";

    // document.querySelector('#summary').style.position = "absolute";
    // document.querySelector('#summary').style.zIndex = 0;
    //   document.querySelector('#score').style.zIndex = 2;

    if (score === 5) {
       document.querySelector('#score-message').innerHTML = `Your final score is ${score}. <br> You've scored 5 out of 5! You are the master of the Galaxy!`;
    } else if (score === 4) {
       document.querySelector('#score-message').innerHTML = `Your final score is ${score}. <br> You know the space quite well! From now on you will be named an experienced space traveller!`;
    } else if (score === 3) {
       document.querySelector('#score-message').innerHTML = `Your final score is ${score}. <br> Not bad! But you can be better!`;
    } else if (score === 2) {
       document.querySelector('#score-message').innerHTML = `Your final score is ${score}. <br> You know something so you have the foundation to erect your tower of knowledge on! Try again!`;
    } else if (score === 1) {
       document.querySelector('#score-message').innerHTML = `Your final score is ${score}. <br> At least you've got one right! With practice comes confidence. Try again!`;
    } else if (score === 0) {
       document.querySelector('#score-message').innerHTML = `Your final score is ${score}. <br> Don't be upset! Even the wisest knew nothing at some point! Try again!`;
    }
  }

  // hide 'Next' button and message
  document.querySelector('#message').textContent = "";
  document.querySelector('#buttons').removeChild(document.querySelector('#next'));

  // activate 'Submit' button
  document.querySelector('#submit').disabled = false;
}

/*** check answer ***/
const checkAnswer = (event) => {
  event.preventDefault();
  const options = document.querySelectorAll('input[type="radio"]');
  let count = 0;

   for (let i = 0; i < options.length; i++) {
     if (options[i].checked === true) {
       const questionId = options[i].parentNode.parentNode.parentNode.parentNode.id;
       if (options[i].value.toLowerCase() === correctAnswers[questionId].toLowerCase()) {
         document.querySelector('#message').textContent = "Correct!";
         score++;
       } else {
         document.querySelector('#message').textContent = "Wrong!";
       }
       count++;
     }
   }

   // if no option is chosen, display a message about it
   if (count === 0) {
     document.querySelector('#message').textContent = "You haven't chosen the answer!";
   } else if (count > 0) {

     document.querySelector('#score').style.display = "block";
     document.querySelector('#score-message').textContent = `Your current score is ${score}`;
     document.querySelector('#submit').disabled = true;

     const nextButton = document.createElement('BUTTON');
     nextButton.textContent = "Next";
     nextButton.setAttribute('id', 'next');
     document.querySelector('#buttons').appendChild(nextButton);
     document.querySelector('#next').addEventListener('click', changeQuestion);
   }

}

document.querySelector('#start').addEventListener('click', startTheQuiz);
document.querySelector('#submit').addEventListener('click', checkAnswer);
