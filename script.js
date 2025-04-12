function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === "hellodiary") {
    document.getElementById("password-screen").style.display = "none";
    document.getElementById("circle").classList.remove("hidden");
  } else {
    alert("Mot de passe incorrect");
  }
}

function loadEntry(name) {
  fetch(`entries/${name}.txt`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("entry-content").innerText = data;
    });
}
