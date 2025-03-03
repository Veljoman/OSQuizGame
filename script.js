let questionsArray = [];
let questionElement = document.getElementById("question");

fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questionsArray = data;
    shuffleQuestions(questionsArray);
    console.log(questionsArray);
  });

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// let questionNum = 1;
// function countIncrement() {
//     let questionHTML = document.getElementById("questionNum");
//     let questionTextHTML = document.getElementById("questionNumText");
//     if(questionNum===20 || questionNum>20){
//         questionTextHTML.innerHTML=`Го завршивте тестот! Погодивте: /20 прашања!`;
//         return;
//     }else{
//         questionNum += 1;
//         questionHTML.innerHTML = questionNum;
//     }
// }
