const data = JSON.parse(localStorage.getItem("quiz-result"));
document.getElementById("score").innerText = `✅ ${data.correct}  ❌ ${data.incorrect}  ❓ ${data.unanswered}`;

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
    div.innerHTML = `
      <strong>Q${d.id}:</strong> You chose ${d.selected !== null ? d.selected + 1 : 'None'}, Correct is ${d.correct !== null ? d.correct + 1 : 'N/A'}
    `;
    container.appendChild(div);
  });
}

renderDetails();
