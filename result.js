const data = JSON.parse(localStorage.getItem("quiz-result"));
const totalMarks = data.correct * 2;
document.getElementById("score").innerText = `✅ ${data.correct}   ❌ ${data.incorrect}   ❓ ${data.unanswered}   |   Total Marks: ${totalMarks}`;

function renderDetails() {
  const filter = document.getElementById("filter").value;
  const container = document.getElementById("details");
  container.innerHTML = '';

  data.details.forEach(d => {
    if (filter !== "all") {
      if (filter === "correct" && d.selected !== d.correct) return;
      if (filter === "incorrect" && d.selected === d.correct) return;
      if (filter === "unanswered" && d.selected !== null) return;
    }

    const div = document.createElement("div");
    div.className = "result-box";
    // Display the question along with the selected and correct option.
    div.innerHTML = `
      <strong>Q${d.id}:</strong> ${d.question}<br>
      Your Answer: ${d.selected !== null ? d.selected + 1 : 'None'}<br>
      Correct Answer: ${d.correct !== null ? d.correct + 1 : 'N/A'}
    `;
    container.appendChild(div);
  });
}

renderDetails();
