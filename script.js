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

function loadEntry(name) {
  fetch(`entries/${name}.txt`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("entry-content").innerText = data;
    });
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mélusine - Portes</title>
  <link rel="stylesheet" href="style.css">
  <script defer src="script.js"></script>
</head>
<body>
  <h1>Mélusine</h1>

  <div class="doors-container">
    <div class="door" onclick="openDoor(this, 'journal.html')">
      <div class="door-inner">
        <div class="door-front" style="background-image: url('assets/icons/porte1.png');"></div>
      </div>
      <div class="door-title">Pensées</div>
    </div>

    <div class="door" onclick="openDoor(this, 'saisons.html')">
      <div class="door-inner">
        <div class="door-front" style="background-image: url('assets/icons/porte2.png');"></div>
      </div>
      <div class="door-title">Photos</div>
    </div>

    <div class="door" onclick="openDoor(this, 'meteo.html')">
      <div class="door-inner">
        <div class="door-front" style="background-image: url('assets/icons/porte3.png');"></div>
      </div>
      <div class="door-title">Dessins</div>
    </div>
  </div>
</body>
</html>
