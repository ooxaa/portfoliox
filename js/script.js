// LOGIC JS LENGKAP
function openCalcModal() {
  const modal = document.getElementById("calcModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  resetCalcDisplay();
}

function closeCalcModal() {
  const modal = document.getElementById("calcModal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

// --- SABOTASE & PRANK LOGIC ---
const display = document.getElementById("calcDisplay");

const wrongAnswers = ["404_LOGIC", "PEE_KAA_BOO", "ERROR_PRO", "PIRATED!", "ERROR_PAID_US", "OX_GAMES", "WHEN_YAH", "WKWKWK", "LEL.", "WHAT_?!", "DO_IT_LATER", "TOO_PRETTY", "NOPE", "TRY_AGAIN", "BROKEN_BY_DESIGN"];

function resetCalcDisplay() {
  display.value = ""; // Dikosongkan agar seperti kalkulator bersih
  display.style.color = "#818cf8"; // Warna default
}

function sabotageCalc() {
  const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
  display.value = wrongAnswers[randomIndex];
  display.style.color = "#fb7185"; // Color Rose/Red Error
}

// --- FAKE PAYMENT OVERLAY CONTROL ---
function showFakePay() {
  const payModal = document.getElementById("fakePayModal");
  payModal.classList.remove("hidden");
  payModal.classList.add("flex");
}

function closeFakePay() {
  const payModal = document.getElementById("fakePayModal");
  payModal.classList.remove("flex");
  payModal.classList.add("hidden");
  sabotageCalc();
}

// Close dengan tombol Escape Keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeFakePay();
    closeCalcModal();
  }
});

// --- SKILL FILTER LOGIC ---
function filterSkills(category, e) {
  const items = document.querySelectorAll(".skill-item");
  const buttons = document.querySelectorAll(".skill-btn");

  // Reset semua style tombol filter
  buttons.forEach((btn) => {
    btn.classList.remove("bg-indigo-600", "text-white", "active");
    btn.classList.add("bg-zinc-900", "border", "border-zinc-800", "text-zinc-400");
  });

  // Set highlight pada tombol yang diklik
  const currentBtn = e.currentTarget;
  currentBtn.classList.remove("bg-zinc-900", "border-zinc-800", "text-zinc-400");
  currentBtn.classList.add("bg-indigo-600", "text-white", "active");

  // Animasi Filter
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

// --- ACCENT COLOR SWITCHER LOGIC (UPDATED) ---
const themes = {
  indigo: { text: "text-indigo-400", bg: "bg-indigo-600" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-600" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-600" },
  rose: { text: "text-rose-400", bg: "bg-rose-600" },
};

let currentTheme = "indigo";

function changeAccent(colorName) {
  if (!themes[colorName]) return;

  const oldT = themes[currentTheme];
  const newT = themes[colorName];

  // 1. Ganti semua Teks Aksen (logo {codeox}, link project, dll)
  document.querySelectorAll("." + oldT.text).forEach((el) => {
    el.classList.remove(oldT.text);
    el.classList.add(newT.text);
  });

  // 2. Ganti semua Background Aksen (termasuk tombol filter aktif)
  document.querySelectorAll("." + oldT.bg).forEach((el) => {
    el.classList.remove(oldT.bg);
    el.classList.add(newT.bg);
  });

  currentTheme = colorName;
}

// --- SKILL FILTER LOGIC (UPDATED WITH DYNAMIC THEME) ---
function filterSkills(category, e) {
  const items = document.querySelectorAll(".skill-item");
  const buttons = document.querySelectorAll(".skill-btn");
  const activeBg = themes[currentTheme].bg; // Mengambil background tema yang sedang aktif

  // Reset semua style tombol filter
  buttons.forEach((btn) => {
    // Hapus semua kemungkinan warna aktif dari tema manapun
    Object.values(themes).forEach((t) => btn.classList.remove(t.bg));
    btn.classList.remove("text-white", "active");
    btn.classList.add("bg-zinc-900", "border", "border-zinc-800", "text-zinc-400");
  });

  // Set highlight pada tombol yang diklik menggunakan warna tema aktif
  const currentBtn = e.currentTarget;
  currentBtn.classList.remove("bg-zinc-900", "border-zinc-800", "text-zinc-400");
  currentBtn.classList.add(activeBg, "text-white", "active");

  // Animasi Filter
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
