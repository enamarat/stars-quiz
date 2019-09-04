
const options = document.querySelectorAll('input[type="radio"]');
let score = 0;

const startTheQuiz = () => {
  document.querySelector('#introduction').style.display = "none";
  document.querySelector('#quiz-form').style.display = "block";
  document.querySelector('.question').style.display = "block";
}

const changeQuestion = (event) => {
  event.preventDefault();
  //console.log(event.target.parentNode.parentNode.childNodes[1].id);
  let currentQuestion = event.target.parentNode.parentNode.childNodes[1].id;
  console.log(currentQuestion);
  document.querySelectorAll('.question')[currentQuestion].style.display = "none";

  currentQuestion++;
  console.log(currentQuestion);
  document.querySelectorAll('.question')[currentQuestion].style.display = "block";

}

const checkAnswer = (answer) => {
  let count = 0;
   for (let i = 0; i < options.length; i++) {
     if (options[i].checked === true) {
       if (options[i].value === answer) {
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

document.querySelector('#submit').addEventListener('click', (event) => {
  event.preventDefault();
  checkAnswer('sirius');
});
