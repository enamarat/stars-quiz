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
  section.setAttribute('class', 'question');
  section.setAttribute('id', numberOfQuestion);

  const label = document.createElement('LABEL');
  label.textContent = questions[numberOfQuestion];
  const br = document.createElement('BR');

  label.appendChild(br);
  section.appendChild(label);

  // append created section to the form
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
    section.appendChild(label);
  }
  document.querySelector('#questionAndAnswers').appendChild(section);
}


/*** start quiz ***/
const startTheQuiz = () => {
  document.querySelector('#introduction').style.display = "none";
  document.querySelector('#quiz-form').style.display = "block";
  displayQuestion(0);
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
       const questionId = options[i].parentNode.parentNode.id;
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
