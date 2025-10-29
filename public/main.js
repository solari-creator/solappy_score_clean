async function fetchLeaderboard() {
  const res = await fetch('/');
  const data = await res.json();

  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';

  data.top3.forEach((p, i) => {
    const div = document.createElement('div');
    div.classList.add('player', 'top3');
    div.innerHTML = `#${i + 1} — Wallet: <span class="wallet">${p.wallet}</span> — 
Score: ${p.score}`;
    leaderboard.appendChild(div);
  });

  data.others.forEach((p, i) => {
    const div = document.createElement('div');
    div.classList.add('player');
    div.innerHTML = `#${i + 4} — Wallet: <span class="wallet">${p.wallet}</span> — 
Score: ${p.score}`;
    leaderboard.appendChild(div);
  });
}

async function fetchRewards() {
  const res = await fetch('/rewards');
  const rewards = await res.json();

  const rewardsDiv = document.getElementById('rewards');
  rewardsDiv.innerHTML = '';

  if (!rewards.length) {
    rewardsDiv.textContent = 'No rewards distributed yet.';
    return;
  }

  rewards[0].payouts.forEach(r => {
    const p = document.createElement('p');
    p.classList.add('reward');
    p.textContent = `Wallet: ${r.wallet} — Reward: ${(r.lamports / 
1_000_000).toFixed(3)} SOL`;
    rewardsDiv.appendChild(p);
  });
}

// Auto refresh
fetchLeaderboard();
fetchRewards();
setInterval(fetchLeaderboard, 10000); // leaderboard every 10s
setInterval(fetchRewards, 15000);      // rewards every 15s
