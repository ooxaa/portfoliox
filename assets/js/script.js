// ==========================================
// 1. TEMA & ACCENT COLOR SWITCHER LOGIC
// ==========================================
const themes = {
  indigo: {
    primary: "#6366f1",
    bgClass: "bg-indigo-600",
    textClass: "text-indigo-400",
    borderClass: "border-indigo-400",
  },
  emerald: {
    primary: "#10b981",
    bgClass: "bg-emerald-600",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-400",
  },
  cyan: {
    primary: "#06b6d4",
    bgClass: "bg-cyan-500",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-400",
  },
  rose: {
    primary: "#f43f5e",
    bgClass: "bg-rose-600",
    textClass: "text-rose-400",
    borderClass: "border-rose-400",
  },
};

let currentTheme = "indigo";

function changeAccent(colorName) {
  if (!themes[colorName]) return;

  const oldT = themes[currentTheme];
  const newT = themes[colorName];

  // 1. Ganti Class Teks Aksen
  document.querySelectorAll("." + oldT.textClass).forEach((el) => {
    el.classList.remove(oldT.textClass);
    el.classList.add(newT.textClass);
  });

  // 2. Ganti Class Background Aksen
  document.querySelectorAll("." + oldT.bgClass).forEach((el) => {
    el.classList.remove(oldT.bgClass);
    el.classList.add(newT.bgClass);
  });

  // 3. Ganti Class Border Aksen
  document.querySelectorAll("." + oldT.borderClass).forEach((el) => {
    el.classList.remove(oldT.borderClass);
    el.classList.add(newT.borderClass);
  });

  currentTheme = colorName;
}

// ==========================================
// 2. SKILL FILTER LOGIC
// ==========================================
function filterSkills(category, e) {
  const items = document.querySelectorAll(".skill-item");
  const buttons = document.querySelectorAll(".skill-btn");
  const activeBg = themes[currentTheme].bgClass;

  // Reset style semua tombol filter
  buttons.forEach((btn) => {
    Object.values(themes).forEach((t) => btn.classList.remove(t.bgClass));
    btn.classList.remove("text-white", "active");
    btn.classList.add("bg-zinc-900", "border", "border-zinc-800", "text-zinc-400");
  });

  // Highlight tombol yang diklik
  if (e && e.currentTarget) {
    const currentBtn = e.currentTarget;
    currentBtn.classList.remove("bg-zinc-900", "border-zinc-800", "text-zinc-400");
    currentBtn.classList.add(activeBg, "text-white", "active");
  }

  // Animasi & Filtering Item
  items.forEach((item) => {
    const itemCat = item.getAttribute("data-category");
    if (category === "all" || itemCat === category) {
      item.style.display = "inline-block";
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      }, 10);
    } else {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";
      setTimeout(() => {
        item.style.display = "none";
      }, 200);
    }
  });
}

// ==========================================
// 3. KALKULATOR PRANK & MODAL LOGIC
// ==========================================
const wrongAnswers = ["404_LOGIC", "PEE_KAA_BOO", "ERROR_PRO", "PIRATED!", "ERROR_PAID_US", "OX_GAMES", "WHEN_YAH", "WKWKWK", "LEL.", "WHAT_?!", "DO_IT_LATER", "TOO_PRETTY", "NOPE", "TRY_AGAIN"];

function resetCalcDisplay() {
  const display = document.getElementById("calcDisplay");
  if (display) {
    display.value = "";
    display.style.color = themes[currentTheme].primary;
  }
}

function openCalcModal() {
  const modal = document.getElementById("calcModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    resetCalcDisplay();
  }
}

function closeCalcModal() {
  const modal = document.getElementById("calcModal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
}

// Fungsi memasukkan angka/operator biasa ke layar
function appendCalcValue(val) {
  const display = document.getElementById("calcDisplay");
  if (display) {
    // Jika layar berisi teks error prank, bersihkan dulu saat mengetik angka baru
    if (wrongAnswers.includes(display.value)) {
      display.value = "";
      display.style.color = themes[currentTheme].primary;
    }
    display.value += val;
  }
}

// Fungsi prank saat menekan tombol Sama Dengan (=)
function calculateResult() {
  showFakePay(); // Pemicu bayar hanya dipanggil di tombol "="
}

function sabotageCalc() {
  const display = document.getElementById("calcDisplay");
  if (display) {
    const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
    display.value = wrongAnswers[randomIndex];
    display.style.color = "#fb7185"; // Rose-400 untuk error
  }
}

function showFakePay() {
  const payModal = document.getElementById("fakePayModal");
  if (payModal) {
    payModal.classList.remove("hidden");
    payModal.classList.add("flex");
  }
}

function closeFakePay() {
  const payModal = document.getElementById("fakePayModal");
  if (payModal) {
    payModal.classList.remove("flex");
    payModal.classList.add("hidden");
    sabotageCalc();
  }
}

// Shortcut keyboard Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeFakePay();
    closeCalcModal();
    closeEbookModal();
  }
});

// ==========================================
// 4. EBOOK PREVIEW MODAL LOGIC
// ==========================================
function openEbookModal() {
  const ebookModal = document.getElementById("ebookModal");
  if (ebookModal) {
    ebookModal.classList.remove("hidden");
    ebookModal.classList.add("flex");
  }
}

function closeEbookModal() {
  const ebookModal = document.getElementById("ebookModal");
  if (ebookModal) {
    ebookModal.classList.add("hidden");
    ebookModal.classList.remove("flex");
  }
}

// ==========================================
// 5. BUY ME A COFFEE TOGGLE
// ==========================================
function toggleCoffee() {
  const box = document.getElementById("coffeeBox");
  if (box) {
    box.classList.toggle("hidden");
  }
}

// ==========================================
// 6. TERMINAL WIDGET LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const termInput = document.getElementById("terminal-input");
  const termOutput = document.getElementById("terminal-output");

  if (termInput && termOutput) {
    termInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const cmd = this.value.trim().toLowerCase();
        this.value = "";

        const userLine = document.createElement("div");
        userLine.innerHTML = `<span class="text-emerald-400 font-bold">ox@dev:~$</span> <span>${escapeHTML(cmd)}</span>`;
        termOutput.appendChild(userLine);

        if (cmd === "") return;

        const response = document.createElement("div");
        response.className = "text-zinc-400 mb-2 pl-2 border-l border-indigo-500/50";

        switch (cmd) {
          case "help":
            response.innerHTML = `Available commands:<br>
            • <span class="text-indigo-400">whoami</span> : Brief intro<br>
            • <span class="text-indigo-400">skills</span> : Tech stack summary<br>
            • <span class="text-indigo-400">contact</span> : Get my email<br>
            • <span class="text-indigo-400">clear</span>   : Clear terminal`;
            break;
          case "whoami":
            response.innerHTML = "Ox — Front-End Developer & Designer. Building clean web logic and interfaces.";
            break;
          case "skills":
            response.innerHTML = "HTML5, CSS3, Tailwind CSS, JavaScript, Git/GitHub, Graphic Design.";
            break;
          case "contact":
            response.innerHTML = "Reach me via email or social links below!";
            break;
          case "clear":
            termOutput.innerHTML = "";
            return;
          default:
            response.innerHTML = `Command not recognized: <span class="text-rose-400">'${escapeHTML(cmd)}'</span>. Type <span class="text-indigo-400">'help'</span> for list.`;
        }

        termOutput.appendChild(response);
        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }
});

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[tag] || tag);
}

// ==========================================
// 7. TYPING EFFECT LOGIC
// ==========================================
const words = ["Front-End Developer", "UI/UX Enthusiast", "Graphic Designer", "Digital Creator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const targetEl = document.getElementById("typing-text");
  if (!targetEl) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    targetEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    targetEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Menutup menu saat link diklik
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});
