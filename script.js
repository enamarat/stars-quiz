let score = 0;
let questionsCount = 0;
let buttonDisabled = false;

const questions = [
  "What is the name of the brightest star in the sky?",
  "What is the name of the closest star to our Solar system?",
  "What star remains in the same position in the sky during the night?",
  "Milky Way is a spiral galaxy with several arms. Which of them our Solar system belongs to?",
  "What is the closest galaxy to ours?"
];

const answers = [
  ["Altair","Sirius","Vega","Polaris"],
  ["Alpha Centauri A","Alpha Centauri B","Proxima Centauri","Barnard's star"],
  ["Deneb","Polaris","Sirius","Aldebaran"],
  ["Perseus arm","Orion","Norma","Sagittarius arm"],
  ["Andromeda galaxy","Circinus galaxy","Pinwheel galaxy","Sombrero galaxy"]
];

const correctAnswers = ["Sirius","Proxima-Centauri","Polaris","Orion","Andromeda-galaxy"];

// russian version of the quiz
let language = 'english';
const russianQuestions = [
  "Каково имя ярчайшей звезды на небе?",
  "Каково имя ближайшей к нашей Солнечной системе звезды?",
  "Какая звезда остаётся на одном и том же месте на небе в течение ночи?",
  "Млечный Путь - это спиральная галактика с несколькими рукавами. К какому из них принадлежит наша Солнечная система?",
  "Какая галатика является ближайшей по отношению к нашей?"
];

const russianAnswers = [
  ["Альтаир", "Сириус", "Вега", "Полярная звезда"],
  ["Альфа Центавра А", "Альфа Центавра Б", "Проксима Центавра", "Звезда Барнарда"],
  ["Денеб", "Полярная звезда", "Сириус", "Альдебаран"],
  ["Рукав Персея", "Орион", "Норма", "Рукав Стрельца"],
  ["Галактика Андромеда", "Галактика Циркуль", "Галактика Вертушка", "Галактика Сомбреро"]
]

const correctRussianAnswers = ["Сириус", "Проксима-Центавра", "Полярная-звезда", "Орион", "Галактика-Андромеда"];

// functions
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
  if (language === "english") {
    label.textContent = questions[numberOfQuestion];
  } else if (language === "russian") {
    label.textContent = russianQuestions[numberOfQuestion];
  }
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

    let changedFormatOfValue = null;
    if (language === "english") {
      input.setAttribute('id', answers[numberOfQuestion][i].toLowerCase());
      changedFormatOfValue = answers[numberOfQuestion][i].toLowerCase().replace(/\s/g, "-");
    } else if (language === "russian") {
      input.setAttribute('id', russianAnswers[numberOfQuestion][i].toLowerCase());
      changedFormatOfValue = russianAnswers[numberOfQuestion][i].toLowerCase().replace(/\s/g, "-");
    }
    input.setAttribute('value', changedFormatOfValue);

    const br = document.createElement('BR');

    const label = document.createElement('LABEL');
    if (language === "english") {
      label.setAttribute('for', answers[numberOfQuestion][i].toLowerCase());
      label.textContent = answers[numberOfQuestion][i];
    } else if (language === "russian") {
      label.setAttribute('for', russianAnswers[numberOfQuestion][i].toLowerCase());
      label.textContent = russianAnswers[numberOfQuestion][i];
    }

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
    if (buttonDisabled === false) {
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
  document.querySelector('#final-score-message').textContent = "";
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
    if (language === "english") {
      restartButton.textContent = 'Restart';
    } else if (language === "russian") {
      restartButton.textContent = 'Заново';
    }

    restartButton.setAttribute('id', 'restart');
    document.querySelector('#score').appendChild(restartButton);
    document.querySelector('#restart').addEventListener('click', restartQuiz);

    // reveal the summary screen
    document.querySelector('#summary').style.display = "block";
    document.querySelector('#score').style.paddingTop = "35vh";
    document.querySelector('#score-message').style.display = "none";

  if (language === "english") {
      if (score === 5) {
         document.querySelector('#final-score-message').innerHTML = `Your final score is ${score}. <br> You've scored 5 out of 5! You are the master of the Galaxy!`;
      } else if (score === 4) {
         document.querySelector('#final-score-message').innerHTML = `Your final score is ${score}. <br> You know the space quite well! From now on you will be named an experienced space traveller!`;
      } else if (score === 3) {
         document.querySelector('#final-score-message').innerHTML = `Your final score is ${score}. <br> Not bad! But you can do better!`;
      } else if (score === 2) {
         document.querySelector('#final-score-message').innerHTML = `Your final score is ${score}. <br> You know something so you have the foundation to erect your tower of knowledge on! Try again!`;
      } else if (score === 1) {
         document.querySelector('#final-score-message').innerHTML = `Your final score is ${score}. <br> At least you've got one right! With practice comes confidence. Try again!`;
      } else if (score === 0) {
         document.querySelector('#final-score-message').innerHTML = `Your final score is ${score}. <br> Don't be upset! Even the wisest knew nothing at some point! Try again!`;
      }
    } else if (language === "russian") {
      if (score === 5) {
         document.querySelector('#final-score-message').innerHTML = `Ваш итоговый результат: ${score} очков. <br> Вы набрали 5 из 5! Вы владычествуете над Галактикой!`;
      } else if (score === 4) {
         document.querySelector('#final-score-message').innerHTML = `Ваш итоговый результат: ${score} очка. <br> Вы знаете космос довольно хорошо! Отныне Вы будете именоваться опытным космическим путешественником!`;
      } else if (score === 3) {
         document.querySelector('#final-score-message').innerHTML = `Ваш итоговый результат: ${score} очка. <br> Неплохо! Но Вы можете лучше!`;
      } else if (score === 2) {
         document.querySelector('#final-score-message').innerHTML = `Ваш итоговый результат: ${score} очка. <br> Вы кое-что знаете, так что у Вас есть основание, на котором можно воздвигнуть башню Вашего знания! Попытайтесь снова!`;
      } else if (score === 1) {
         document.querySelector('#final-score-message').innerHTML = `Ваш итоговый результат: ${score} очко. <br> По крайней мере на один вопрос Вы ответили верно! С практикой приходит уверенность. Попытайтесь снова!`;
      } else if (score === 0) {
         document.querySelector('#final-score-message').innerHTML = `Ваш итоговый результат: ${score} очков. <br> Не расстраивайтесь! Даже мудрейшие ничего не знали на определённом этапе! Попытайтесь снова!`;
      }
    }
  }

  // show 'Submit' button
  document.querySelector('#submit').style.display = "inline-block";
  buttonDisabled = false;

  // hide 'Next' button and message
  document.querySelector('#message').textContent = "";
  document.querySelector('#buttons').removeChild(document.querySelector('#next'));
}

/*** check answer ***/
const checkAnswer = (event) => {
  event.preventDefault();
  const options = document.querySelectorAll('input[type="radio"]');
  let count = 0;

   for (let i = 0; i < options.length; i++) {
     if (options[i].checked === true) {
       const questionId = options[i].parentNode.parentNode.parentNode.parentNode.id;
       if (language === "english") {
         if (options[i].value.toLowerCase() === correctAnswers[questionId].toLowerCase()) {
            document.querySelector('#message').textContent = "Correct!";
           score++;
         } else {
           document.querySelector('#message').textContent = "Wrong!";
         }
       } else if (language === "russian") {
         if (options[i].value.toLowerCase() === correctRussianAnswers[questionId].toLowerCase()) {
           document.querySelector('#message').textContent = "Верно!";
           score++;
         } else {
           document.querySelector('#message').textContent = "Неверно!";
         }
       }
       count++;
     }
   }

   // if no option is chosen, display a message about it
   if (count === 0) {
     if (language === "english") {
       document.querySelector('#message').textContent = "You haven't chosen the answer!";
     } else if (language === "russian") {
       document.querySelector('#message').textContent = "Вы не выбрали ответ!";
     }

   } else if (count > 0) {

     document.querySelector('#score').style.display = "block";
     if (language === "english") {
       document.querySelector('#score-message').textContent = `Your current score is ${score}`;
     } else if (language === "russian") {
       document.querySelector('#score-message').textContent = `Ваш текущий балл: ${score}`;
     }

     // hide "Submit" button
     document.querySelector('#submit').style.display = "none";
     buttonDisabled = true;

     const nextButton = document.createElement('BUTTON');
     if (language === "english") {
       nextButton.textContent = "Next";
     } else if (language === "russian") {
       nextButton.textContent = "Следующий";
     }
     nextButton.setAttribute('id', 'next');
     document.querySelector('#buttons').appendChild(nextButton);
     document.querySelector('#next').addEventListener('click', changeQuestion);
   }

}

document.querySelector('#start').addEventListener('click', startTheQuiz);
document.querySelector('#submit').addEventListener('click', checkAnswer);

/*** Switch language ***/
const switchLanguage = (event) => {
  if (event.target.textContent === "Russian") {
    language = 'russian';
  } else if (event.target.textContent === "English") {
    language = 'english';
  }

  if (language === 'russian') {
    // change introduction
    document.querySelector('#switch-language').textContent = "English";
    document.querySelector('#introduction h2').textContent = "Приветствуем на звёздной викторине!";
    document.querySelector('#question-start').textContent = "Начнём?";
    document.querySelector('#start').textContent = "Старт";

    // change questions and answers
    document.querySelector('#submit').textContent = "Отправить";
  } else if (language === 'english') {
    // change introduction
    document.querySelector('#switch-language').textContent = "Russian";
    document.querySelector('#introduction h2').textContent = "Welcome to star quiz!";
    document.querySelector('#question-start').textContent = "Shall we begin?";
    document.querySelector('#start').textContent = "Start";

    // change questions and answers
    document.querySelector('#submit').textContent = "Submit";
  }
}

document.querySelector('#switch-language').addEventListener('click', switchLanguage);
