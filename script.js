function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === "hellodiary") {
    localStorage.setItem("melusine-unlocked", "true");
    document.getElementById("password-screen").classList.add("hidden");
    document.getElementById("circle").classList.remove("hidden");
  } else {
    alert("Oups");
  }
}

function openDoor(element, link) {
  element.classList.add('open');
  setTimeout(() => {
    window.location.href = link;
  }, 1000); // durée de l’animation avant redirection
}
