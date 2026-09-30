document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("results");

  // Parse GET parameters from URL string
  const currentUrl = window.location.href;
  const formData = currentUrl.split("?")[1];

  if (formData && resultsContainer) {
    const params = new URLSearchParams(formData);

    // Retrieve required fields
    const fname = params.get("fname") || "N/A";
    const lname = params.get("lname") || "N/A";
    const email = params.get("email") || "N/A";
    const phone = params.get("phone") || "N/A";
    const organization = params.get("organization") || "N/A";
    const timestamp = params.get("timestamp") || "N/A";

    resultsContainer.innerHTML = `
      <p><strong>First Name:</strong> ${fname}</p>
      <p><strong>Last Name:</strong> ${lname}</p>
      <p><strong>Email Address:</strong> ${email}</p>
      <p><strong>Mobile Phone:</strong> ${phone}</p>
      <p><strong>Organization Name:</strong> ${organization}</p>
      <p><strong>Submission Date/Time:</strong> ${timestamp}</p>
    `;
  } else if (resultsContainer) {
    resultsContainer.innerHTML = "<p>No form submission data found.</p>";
  }
});