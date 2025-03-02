let questionsArray = [];

fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questionsArray = data;
    console.log(questionsArray);

    
  });

