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

const sparkleCanvas = document.createElement('canvas');
sparkleCanvas.id = 'sparkleCanvas';
document.body.appendChild(sparkleCanvas);
const ctx = sparkleCanvas.getContext('2d');

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  sparkleCanvas.width = width;
  sparkleCanvas.height = height;
}
window.addEventListener('resize', resize);
resize();

const sparkles = [];
const sparkleCount = 120;
const mouse = { x: width / 2, y: height / 2 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function createSparkle() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    a: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.6 + 0.4
  };
}

for (let i = 0; i < sparkleCount; i++) {
  sparkles.push(createSparkle());
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let s of sparkles) {
    s.x += s.dx + (mouse.x - width / 2) * 0.0002;
    s.y += s.dy + (mouse.y - height / 2) * 0.0002;

    if (s.x < 0 || s.x > width || s.y < 0 || s.y > height) {
      Object.assign(s, createSparkle());
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(218,165,32,${s.opacity})`; // doré
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();
