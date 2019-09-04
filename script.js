
const options = document.querySelectorAll('input[type="radio"]');

const startTheQuiz = () => {
  document.querySelector('#introduction').style.display = "none";
  document.querySelector('#quiz-form').style.display = "block";
  document.querySelector('.question').style.display = "block";
}

const checkAnswer = (answer) => {
  let count = 0;
   for (let i = 0; i < options.length; i++) {
     if (options[i].checked === true) {
       if (options[i].value === answer) {
         document.querySelector('#message').textContent = "Correct!";
       } else {
         document.querySelector('#message').textContent = "Wrong!";
       }

       count++;
       document.querySelector('#submit').disabled = true;
       const nextButton = document.createElement('BUTTON');
       nextButton.textContent = "Next";
       nextButton.setAttribute('id', 'next');
       document.querySelector('#buttons').appendChild(nextButton);
     }
   }

   // if no option is chosen, display a message about it
   if (count === 0) {
     document.querySelector('#message').textContent = "You haven't chosen the answer!";
   }
}

document.querySelector('#start').addEventListener('click', startTheQuiz);

document.querySelector('#submit').addEventListener('click', (event) => {
  event.preventDefault();
  checkAnswer('sirius');
});
