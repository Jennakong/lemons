// Lemon Counter Placeholder
let lemonCount = 0;
const lemonCountEl = document.getElementById("lemonCount");

function updateCounter() {
  lemonCountEl.textContent = lemonCount;
}

// Simulate fetch count (we connect Supabase next)
window.addEventListener("load", () => {
  lemonCount = 1284; // temporary placeholder
  updateCounter();
});

// Form Submission
const form = document.getElementById("lemonForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Normally here we'd send to Supabase

  lemonCount++;
  updateCounter();

  form.reset();

  alert("Your lemon has been planted 🌿");
});
