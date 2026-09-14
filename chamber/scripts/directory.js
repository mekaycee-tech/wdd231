document.addEventListener("DOMContentLoaded", () => {
  const membersContainer = document.getElementById("members-container");
  const gridButton = document.getElementById("grid-view");
  const listButton = document.getElementById("list-view");

  async function getMembers() {
    try {
      const response = await fetch("data/members.json");
      if (response.ok) {
        const data = await response.json();
        displayMembers(data);
      } else {
        console.error("Failed to fetch member data.");
      }
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
  }

  function displayMembers(members) {
    membersContainer.innerHTML = "";
    members.forEach(member => {
      const card = document.createElement("section");
      card.classList.add("member-card");

      const membershipLabel = 
        member.membershipLevel === 3 ? "Gold Member" : 
        member.membershipLevel === 2 ? "Silver Member" : "Member";

      card.innerHTML = `
        <h3>${member.name}</h3>
        <p><em>${member.tagline}</em></p>
        <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="120" height="120">
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><strong>Tier:</strong> ${membershipLabel}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      `;

      membersContainer.appendChild(card);
    });
  }

  gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid-layout-view");
    membersContainer.classList.remove("list-layout-view");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
  });

  listButton.addEventListener("click", () => {
    membersContainer.classList.add("list-layout-view");
    membersContainer.classList.remove("grid-layout-view");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
  });

  getMembers();
});