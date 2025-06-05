function submitQuiz() {
  clearInterval(timerID);
  const result = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    details: []
  };

  quizData.questions.forEach((q, i) => {
    const correctIndex = q.correct_index;
    // Push the question text along with the result details
    if (answers[i] === null) {
      result.unanswered++;
      result.details.push({ id: i + 1, question: q.question, selected: null, correct: correctIndex });
    } else if (answers[i] === correctIndex) {
      result.correct++;
      result.details.push({ id: i + 1, question: q.question, selected: answers[i], correct: correctIndex });
    } else {
      result.incorrect++;
      result.details.push({ id: i + 1, question: q.question, selected: answers[i], correct: correctIndex });
    }
  });

  localStorage.setItem("quiz-result", JSON.stringify(result));
  location.href = "result.html";
}
