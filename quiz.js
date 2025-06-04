let quizData = null, current = 0, answers = [], timerID;
const urlParams = new URLSearchParams(window.location.search);
const quizName = urlParams.get('name');

async function startQuiz() {
  const res = await fetch(`quizzes/${quizName}.json`);
  quizData = await res.json();
  answers = Array(quizData.questions.length).fill(null);
  document.getElementById("quiz-title").innerText = quizData.title;
  // Use the corrected key "duration_minutes"
  startTimer(quizData.duration_minutes * 60);
  renderQuestion();
  renderNavGrid();
}

function renderQuestion() {
  const q = quizData.questions[current];
  // Display a full question with a "Question:" prefix for clarity
  document.getElementById("question-text").innerText = `Question ${current + 1}: ${q.question}`;
  // Wrap each option in a div for vertical stacking
  const options = q.options.map((opt, i) => `
    <div>
      <label>
        <input type="radio" name="option" ${answers[current] === i ? 'checked' : ''} onclick="selectAnswer(${i})">
        ${opt}
      </label>
    </div>
  `).join('');
  document.getElementById("options").innerHTML = options;
  updateNavStatus();
}

function selectAnswer(i) {
  answers[current] = i;
  updateNavStatus();
}

function nextQ() {
  if (current < quizData.questions.length - 1) current++;
  renderQuestion();
}

function prevQ() {
  if (current > 0) current--;
  renderQuestion();
}

function renderNavGrid() {
  const nav = document.getElementById("nav-grid");
  nav.innerHTML = quizData.questions.map((_, i) => `
    <button id="nav-${i}" onclick="jumpTo(${i})">${i + 1}</button>
  `).join('');
}

function jumpTo(i) {
  current = i;
  renderQuestion();
}

function updateNavStatus() {
  quizData.questions.forEach((_, i) => {
    const btn = document.getElementById(`nav-${i}`);
    if (answers[i] === null) btn.className = i === current ? 'nav-current' : 'nav-unseen';
    else btn.className = i === current ? 'nav-current' : 'nav-answered';
  });
}

function startTimer(seconds) {
  const timer = document.getElementById("timer");
  timerID = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(timerID);
      submitQuiz();
      return;
    }
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    timer.innerText = `${h}:${m}:${s}`;
    seconds--;
  }, 1000);
}

function submitQuiz() {
  clearInterval(timerID);
  const result = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    details: []
  };

  quizData.questions.forEach((q, i) => {
    // Use bracket notation to support the key "correct_index" as fixed in quiz1.json
    const correctIndex = q.correct_index;
    if (answers[i] === null) {
      result.unanswered++;
      result.details.push({ id: i + 1, selected: null, correct: correctIndex });
    } else if (answers[i] === correctIndex) {
      result.correct++;
      result.details.push({ id: i + 1, selected: answers[i], correct: correctIndex });
    } else {
      result.incorrect++;
      result.details.push({ id: i + 1, selected: answers[i], correct: correctIndex });
    }
  });

  localStorage.setItem("quiz-result", JSON.stringify(result));
  location.href = "result.html";
}

startQuiz();
