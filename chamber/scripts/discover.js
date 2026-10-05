import discoverItems from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
  displayVisitMessage();
  renderDiscoverCards(discoverItems);
});

// 1. Calculate & Display Visit Message using localStorage
function displayVisitMessage() {
  const visitContainer = document.getElementById("visit-message");
  if (!visitContainer) return;

  const msInDay = 24 * 60 * 60 * 1000; // 86,400,000 milliseconds in a day
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisitDate");

  if (!lastVisit) {
    visitContainer.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = now - parseInt(lastVisit, 10);

    if (timeDifference < msInDay) {
      visitContainer.textContent = "Back so soon! Awesome!";
    } else {
      const daysBetween = Math.floor(timeDifference / msInDay);
      const dayWord = daysBetween === 1 ? "day" : "days";
      visitContainer.textContent = `You last visited ${daysBetween} ${dayWord} ago.`;
    }
  }

  // Update localStorage with current timestamp in milliseconds
  localStorage.setItem("lastVisitDate", now.toString());
}

// 2. Render 8 Cards with h2, figure, address, p, and learn more button
function renderDiscoverCards(items) {
  const container = document.getElementById("discover-grid");
  if (!container) return;

  container.innerHTML = "";

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    
    // Assign explicit grid-area identifier (c1, c2, c3 ... c8)
    card.style.gridArea = `c${index + 1}`;

    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button" class="learn-btn">Learn More</button>
    `;

    container.appendChild(card);
  });
}