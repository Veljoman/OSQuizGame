let questionsArray = [];

fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
        questionsArray = data;
        console.log(questionsArray);


    });

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
