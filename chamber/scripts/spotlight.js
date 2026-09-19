document.addEventListener("DOMContentLoaded", () => {
  const spotlightContainer = document.getElementById("spotlight-container");

  async function loadSpotlights() {
    try {
      const response = await fetch("data/members.json");
      if (response.ok) {
        const members = await response.json();
        
        // Filter for Gold (level 3) and Silver (level 2) members only
        const eligibleMembers = members.filter(
          m => m.membershipLevel === 2 || m.membershipLevel === 3
        );

        // Randomly shuffle eligible members using Fisher-Yates algorithm
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

        // Select 2 or 3 members
        const selectedSpotlights = shuffled.slice(0, 3);

        displaySpotlights(selectedSpotlights);
      }
    } catch (error) {
      console.error("Error loading spotlight member data:", error);
    }
  }

  function displaySpotlights(spotlights) {
    spotlightContainer.innerHTML = "";

    spotlights.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-item");

      const levelText = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="90" height="90">
        <p class="tagline"><em>${member.tagline}</em></p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Level:</strong> ${levelText}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      `;

      spotlightContainer.appendChild(card);
    });
  }

  loadSpotlights();
});