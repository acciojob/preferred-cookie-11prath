//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie value by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return val;
  }
  return null;
}

// Function to apply styles from cookies or defaults
function applyPreferences() {
  const fontSize = getCookie("fontsize") || "16";
  const fontColor = getCookie("fontcolor") || "#000000";

  // Apply the values as CSS variables
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  // Update the form input fields to reflect the current settings
  document.getElementById("fontsize").value = fontSize;
  document.getElementById("fontcolor").value = fontColor;
}

// Function to handle form submission
function savePreferences(event) {
  event.preventDefault();

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save in cookies for 30 days
  setCookie("fontsize", fontSize, 30);
  setCookie("fontcolor", fontColor, 30);

  // Apply immediately
  applyPreferences();
}

// Attach event listener to form submit
document.querySelector("form").addEventListener("submit", savePreferences);

// Apply preferences on page load
applyPreferences();
