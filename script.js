function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === "hellodiary") {
    localStorage.setItem("melusine-unlocked", "true");
    document.getElementById("password-screen").classList.add("hidden");
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
