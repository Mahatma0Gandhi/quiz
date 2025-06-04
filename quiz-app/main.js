const quizList = document.getElementById("quiz-list");

async function loadQuizzes() {
  const quizNames = ["quiz1", "quiz2"]; // You can automate this list if needed
  for (let name of quizNames) {
    const res = await fetch(`quizzes/${name}.json`);
    const data = await res.json();
    const li = document.createElement("li");
    li.innerHTML = `<button onclick="location.href='quiz.html?name=${name}'">${data.title}</button>`;
    quizList.appendChild(li);
  }
}

loadQuizzes();
