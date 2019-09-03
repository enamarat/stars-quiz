
const options = document.querySelectorAll('input[type="radio"]');


function checkAnswer(answer) {
   for (let i = 0; i < options.length; i++) {
     if (options[i].checked === true) {
       if (options[i].value === answer) {
         console.log('Correct!');
       } else {
         console.log('Wrong!');
       }
     }
   }
}


document.querySelector('#submit').addEventListener('click', (event) => {
  event.preventDefault();
  checkAnswer('sirius');
});
