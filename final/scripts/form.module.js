// Parse URL Parameters on Form Submission Page
const resultsContainer = document.getElementById('form-results');

if (resultsContainer) {
  // Use URLSearchParams to extract GET parameters
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);

  const name = urlParams.get('fullname') || 'N/A';
  const email = urlParams.get('email') || 'N/A';
  const subject = urlParams.get('subject') || 'N/A';
  const message = urlParams.get('message') || 'N/A';

  resultsContainer.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Inquiry Type:</strong> ${subject}</p>
    <p><strong>Message Submitted:</strong> ${message}</p>
  `;
}