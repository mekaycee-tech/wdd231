document.addEventListener("DOMContentLoaded", () => {
  const currentYearSpan = document.getElementById("currentyear");
  const lastModifiedParagraph = document.getElementById("lastModified");

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
  }
});