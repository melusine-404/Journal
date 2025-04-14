// == MELUSINE WIDGET ==

document.addEventListener("DOMContentLoaded", () => {
  const proxyURL = "https://velvety-fox-68a2ba.netlify.app/.netlify/functions/proxy"; // ← à modifier

  // Injection HTML du widget
  const melusineHTML = `
    <style>
      #melusine-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        background: #fffafc;
        border-radius: 20px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        font-family: "Comic Sans MS", cursive, sans-serif;
        padding: 15px;
        z-index: 9999;
      }
      .melusine-svg {
        width: 80px;
        display: block;
        margin: 0 auto;
      }
      .melu-bubble, .melu-thought, .melu-reply {
        background: #ffe6f0;
        border: 2px solid #ff99c8;
        border-radius: 15px;
        padding: 10px;
        margin: 10px 0;
        font-size: 14px;
        animation: melu-pop 0.6s ease-out;
      }
      .melu-thought {
        background: #e6f0ff;
        border-color: #99c8ff;
        font-style: italic;
      }
      @keyframes melu-pop {
        0% { transform: scale(0.8); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      #melusine-chat { max-height: 200px; overflow-y: auto; }
      #melusine-input { display: flex; gap: 10px; }
      #melusine-message {
        flex: 1;
        padding: 8px;
        border-radius: 10px;
        border: 1px solid #ccc;
      }
      #melusine-send {
        background: #ff99c8;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 10px;
        cursor: pointer;
      }
    </style>

    <div id="melusine-container">
      <svg class="melusine-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="90" fill="#ffe6f0" />
        <ellipse class="eye" cx="70" cy="80" rx="8" ry="12" fill="#000" />
        <ellipse class="eye" cx="130" cy="80" rx="8" ry="12" fill="#000" />
        <path d="M60,130 Q100,160 140,130" stroke="#000" stroke-width="3" fill="none" />
      </svg>
      <div id="melusine-chat">
        <div class="melu-bubble" id="melusine-bubble"></div>
        <div class="melu-thought" id="melusine-thought"></div>
      </div>
      <div id="melusine-input">
        <input type="text" id="melusine-message" placeholder="Écris ici...">
        <button id="melusine-send">➤</button>
      </div>
    </div>
  `;

  const widget = document.createElement("div");
  widget.innerHTML = melusineHTML;
  document.body.appendChild(widget);

  const phrases = [
    "Hey toi, on va écrire un peu ? 😏",
    "Tu sais que je t'attendais ? Allez, on s'y met.",
    "T’as pas oublié de respirer au moins ? Parce que moi j’suis prête.",
    "On papote ou on bosse ? Ou un peu des deux ?",
    "Je sens que ça va être une belle entrée de journal…",
    "Trop contente que tu sois là. Même si t’es là pour te plaindre 😌",
    "Mood du jour ? Allez vas-y, je te regarde taper."
  ];

  const thoughts = [
    "Tu procrastines ou tu fuis un truc, là ?",
    "J’ai l’impression que t’es pas 100% honnête avec toi-même 👀",
    "Tu sais que je t’observe avec beaucoup de bienveillance hein.",
    "Mmmh... t’as pas déjà écrit ça trois fois cette semaine ?",
    "Et tu crois vraiment que c’est pas lié à ce que t’as ressenti hier soir ?"
  ];

  const bubble = document.getElementById('melusine-bubble');
  const thought = document.getElementById('melusine-thought');
  const chatBox = document.getElementById('melusine-chat');
  const input = document.getElementById('melusine-message');
  const sendBtn = document.getElementById('melusine-send');

  // Répliques d'accueil
  bubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  thought.textContent = thoughts[Math.floor(Math.random() * thoughts.length)];

  sendBtn.addEventListener('click', async () => {
    const msg = input.value.trim();
    if (!msg) return;
    const userDiv = document.createElement('div');
    userDiv.className = 'melu-bubble';
    userDiv.textContent = msg;
    chatBox.appendChild(userDiv);
    input.value = '';

    const thinking = document.createElement('div');
    thinking.className = 'melu-reply';
    thinking.textContent = "(Mélusine réfléchit...)";
    chatBox.appendChild(thinking);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const res = await fetch(proxyURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });
      const data = await res.json();
      thinking.textContent = data.reply || "Hmm... pas inspirée là.";
    } catch (err) {
      thinking.textContent = "Oups, j’ai buggé 🧠";
    }
  });
});
