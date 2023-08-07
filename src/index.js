import './style.css';

const addBtn = document.querySelector('.add');
const refreshBtn = document.querySelector('.ref');
const usernameInput = document.querySelector('#username');
const scoreInput = document.querySelector('#score');
const scoresList = document.querySelector('.scores');

const fetchScores = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/iTrISlBXlaWu8ZH27F85/scores/');
  const data = await response.json();
  return data.result;
};

const renderScores = async () => {
  const scores = await fetchScores();
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    if (typeof score.user !== 'object') {
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.textContent = `${score.user} - ${score.score}`;
      scoresList.appendChild(li);
    }
  });
};

const submitScore = async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const score = Number(scoreInput.value.trim());
  if (username && score) {
    await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/iTrISlBXlaWu8ZH27F85/scores', {
      method: 'POST',
      body: JSON.stringify({
        user: username,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    await renderScores();
  } else {
    renderScores();
  }
  usernameInput.value = '';
  scoreInput.value = '';
};

refreshBtn.addEventListener('click', renderScores);
addBtn.addEventListener('click', submitScore);
