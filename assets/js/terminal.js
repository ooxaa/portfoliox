const termInput = document.getElementById("terminal-input");
const termOutput = document.getElementById("terminal-output");
const termContainer = document.getElementById("terminal-container");
const promptLabel = document.getElementById("prompt-label");
const termStatus = document.getElementById("term-status");
const canvas = document.getElementById("matrix-canvas");

let isHackerMode = false;
let matrixInterval = null;
let secretNum = null;

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

  const bootLines = ["Initializing Ox-OS v2.6.0...", "Mounting kernel modules... [OK]", "Configuring network interface... [OK]", "Loading user profile data... [OK]", "System ready. Type 'help' to start."];

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

termInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const fullCmd = termInput.value.trim();
    const lowerCmd = fullCmd.toLowerCase();
    termInput.value = "";

    termOutput.innerHTML += `<div><span class="text-emerald-400">botby@ox:</span> ${fullCmd}</div>`;
    termOutput.scrollTop = termOutput.scrollHeight;

    const args = lowerCmd.split(" ");
    const cmd = args[0];

    switch (cmd) {
      case "help":
        await print("--- SYSTEM COMMANDS ---");
        await sleep(200);
        await print("  about    - for About Me");
        await print("  light    - for Switch Light Mode");
        await print("  hacker   - for Hack Mode");
        await print("  date     - for Show Current Date/Time");
        await print("  matrix   - for Matrix Mode");
        await print("  secret   - for Secret");
        await print("  stop     - for Stop Commands");
        await print("  clear    - for Clear Terminal Screen");
        await print("  reboot   - for Restart the Terminal System");
        await print("  say      - for Send a Message");
        await print("----------------");
        break;

      case "about":
        await print("--- SYSTEM INFO ---");
        await print("User     : Ox");
        await print("Based In : Bandung, Indonesia 🇮🇩");
        await print("Stack    : HTML, CSS, Tailwind, JS");
        await print("Focus    : Web Dev & Graphic Design");
        await print("Status   : Open for new projects!");
        await print("-------------------");
        break;

      case "light":
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000";
        await print("Switched to Light Mode!");
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

      case "date":
        const now = new Date();
        await print(`Current date & time: ${now.toLocaleString()}`);
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
        await print("Hidden Path Unlocked: Cookies for you 🍪");
        break;

      case "reboot":
        await print("System reboot initiated...");
        await sleep(800);
        await print("Shutting down services...");
        await sleep(600);
        await print("Restarting kernel...");
        await sleep(1000);
        await print("Done 🗸");
        await sleep(500);
        location.reload();
        break;

      case "say":
        const messageContent = args.slice(1).join(" ");
        if (!messageContent) {
          await print(i18n[currentLang].invalid_format);
        } else {
          try {
            // Panggil API kita sendiri (Vercel akan otomatis mengarahkannya)
            const response = await fetch("/api/send-message", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: `New visitor message (${currentLang}): ${messageContent}` }),
            });

            if (response.ok) {
              await print(i18n[currentLang].msg_sent);
            } else {
              await print(i18n[currentLang].err_failed);
            }
          } catch (error) {
            await print(i18n[currentLang].err_failed);
          }
        }
        break;

      default:
        await print(`Error: Command '${cmd}' not found. Did you mean 'help'?`);
    } // Ini penutup switch
  } // Ini penutup if(e.key === "Enter")
}); // Ini penutup event listener

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
