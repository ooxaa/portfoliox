const termInput = document.getElementById("terminal-input");
const termOutput = document.getElementById("terminal-output");
const termContainer = document.getElementById("terminal-container");
const promptLabel = document.getElementById("prompt-label");
const termStatus = document.getElementById("term-status");
const canvas = document.getElementById("matrix-canvas");

let isHackerMode = false;
let matrixInterval = null;

// FUNGSI UTAMA: Print teks
async function print(text, delay = 10) {
  const div = document.createElement("div");
  div.className = "text-zinc-300 leading-relaxed";
  termOutput.appendChild(div);
  for (let char of text) {
    div.innerHTML += char;
    await new Promise((r) => setTimeout(r, delay));
  }
  termOutput.scrollTop = termOutput.scrollHeight;
}

// LOGIKA MATRIX (Disederhanakan agar tidak bentrok)
function startMatrix() {
  if (matrixInterval) clearInterval(matrixInterval);

  // Reset opacity sebelum mulai
  canvas.classList.remove("opacity-0", "opacity-30");
  canvas.classList.add("opacity-80");

  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const drops = Array(Math.floor(canvas.width / 10)).fill(1);

  matrixInterval = setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF41";
    drops.forEach((d, i) => {
      ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * 10, d * 10);
      if (d * 10 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 50);
}

// FUNGSI BOOT SEQUENCE
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runBootSequence() {
  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input");
  const audio = document.getElementById("beep-sound");
  const matrixCanvas = document.getElementById("matrix-canvas");

  // Set opacity untuk boot sequence
  matrixCanvas.classList.remove("opacity-0", "opacity-80");
  matrixCanvas.classList.add("opacity-30");

  if (output.dataset.booted === "true") return;
  output.dataset.booted = "true";

  const bootLines = ["Initializing OX-OS v2.6.0...", "Mounting kernel modules... [OK]", "Configuring network interface... [OK]", "Loading user profile data... [OK]", "System ready. Type 'help' to start."];

  input.disabled = true;
  output.innerHTML = "";

  for (let line of bootLines) {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((e) => console.log("Audio muted"));
    }
    const p = document.createElement("p");
    p.className = "text-emerald-400 font-mono";
    p.textContent = `> ${line}`;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
    await sleep(800);
  }

  input.disabled = false;
  input.focus({ preventScroll: true });
}

// LOGIKA INPUT PERINTAH
termInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const cmd = termInput.value.trim().toLowerCase();
    termInput.value = "";

    termOutput.innerHTML += `<div><span class="text-emerald-400">ox@dev:~$</span> ${cmd}</div>`;
    termOutput.scrollTop = termOutput.scrollHeight;

    switch (cmd) {
      case "help":
        await print("Commands: whoami, matrix, hacker, secret, clear, stop");
        break;
      case "whoami":
        await print("Hi, I'm Ox. I'm your baby, right?");
        break;
      case "hacker":
        if (!isHackerMode) {
          isHackerMode = true;
          document.body.classList.add("glitch-effect");
          promptLabel.className = "text-rose-500 font-bold";
          termStatus.innerText = "HACKER MODE ACTIVE";
          await print("Accessing deep system... [SECURITY BREACH]");
        }
        break;
      case "matrix":
        startMatrix();
        await print("Initializing Matrix Rain...");
        break;
      case "stop":
        let stoppedSomething = false;
        if (matrixInterval) {
          clearInterval(matrixInterval);
          matrixInterval = null;
          canvas.classList.remove("opacity-80", "opacity-30");
          canvas.classList.add("opacity-0");
          stoppedSomething = true;
        }
        if (isHackerMode) {
          isHackerMode = false;
          document.body.classList.remove("glitch-effect");
          promptLabel.className = "text-emerald-400 font-bold";
          termStatus.innerText = "system ready";
          stoppedSomething = true;
        }
        if (stoppedSomething) await print("Processes terminated.");
        else await print("No active processes to stop.");
        break;
      case "clear":
        termOutput.innerHTML = "";
        break;
      case "secret":
        await print("Hidden Path Unlocked: 🍪");
        break;
      default:
        await print(`Error: Command '${cmd}' not found.`);
    }
  }
});

// EVENT LISTENERS
termContainer.addEventListener("click", () => {
  if (window.getSelection().toString() === "") termInput.focus();
});

// OBSERVER (Untuk trigger boot)
const terminalSection = document.getElementById("terminal-container");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => runBootSequence(), 500);
        observer.unobserve(terminalSection);
      }
    });
  },
  { threshold: 0.5 },
);

if (terminalSection) observer.observe(terminalSection);
