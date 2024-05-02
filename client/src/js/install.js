const butInstall = document.getElementById("buttonInstall");

// Logic for handling PWA installation prompt

// Event listener for the 'beforeinstallprompt' event, triggered when the browser is ready to install the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default behavior of the event, which is to show the browser's default install prompt
  event.preventDefault();
  butInstall.style.visibility = "visible";
  butInstall.textContent = "Install!";
});

// Event listener for the click event on the install button
butInstall.addEventListener("click", async () => {
  // Disable the install button to prevent multiple clicks
  butInstall.setAttribute("disabled", true);
  butInstall.textContent = "Installed!";
});

// Event listener for the 'appinstalled' event, triggered when the PWA has been successfully installed
window.addEventListener("appinstalled", (event) => {
  console.log("appinstalled", event);
});
