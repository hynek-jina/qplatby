const translations = {
  cs: {
    "meta.title": "Q platby – otevřený software pro platby",
    "meta.description": "Q platby s.r.o. vyvíjí open-source aplikace, ve kterých se bankovní převod, hotovost a bitcoinový Lightning potkávají na jednom místě.",
    "lang.title": "Jazyk",
    "appearance.label": "Vzhled",
    "appearance.auto": "Automaticky",
    "appearance.light": "Světlý",
    "appearance.dark": "Tmavý",
    "hero.title": "Stavíme otevřený software pro platby.",
    "hero.lede": "Q platby je malá česká firma. Vyvíjíme aplikace, ve kterých se bankovní převod, hotovost a bitcoinový Lightning potkávají na jednom místě. Všechno zveřejňujeme jako open source.",
    "projects.title": "Na čem pracujeme",
    "linky.tag": "Kontakty, zprávy a platby",
    "linky.desc": "Linky je webová aplikace pro telefon i počítač. Spravuje kontakty, posílá soukromé zprávy přes Nostr a platby přes Lightning a Cashu. Data zůstávají v zařízení a mezi zařízeními se synchronizují šifrovaně.",
    "fazole.tag": "Platební terminál v telefonu",
    "fazole.desc": "Fazole je platební terminál pro české obchodníky. Zákazník naskenuje QR kód a zaplatí převodem rovnou na účet obchodníka, nebo bitcoinem přes Lightning či Cashu. Bez smlouvy, bez registrace a bez terminálu, stačí telefon. Tržby i historie zůstávají u obchodníka.",
    "payky.tag": "Pokladna pro malé obchodníky",
    "payky.desc": "Payky je pokladní aplikace pro české a slovenské obchodníky. Přijímá platby QR kódem na bankovní účet, hotovost i bitcoin přes Lightning, bez platebního zprostředkovatele. Funguje i bez připojení a data zůstávají u obchodníka.",
    "meta.web": "Web",
    "meta.platforms": "Platformy",
    "meta.license": "Licence",
    "meta.source": "Zdrojový kód",
    "principles.title": "Jak pracujeme",
    "p1.title": "Open source",
    "p1.text": "Zdrojové kódy všech našich projektů jsou veřejné pod svobodnými licencemi. Kdokoli si je může přečíst, upravit nebo provozovat sám.",
    "p2.title": "Data u uživatele",
    "p2.text": "Aplikace fungují především lokálně, v zařízení uživatele. Bez našich serverů se obejdou.",
    "p3.title": "Bez prostředníků",
    "p3.text": "Platba jde přímo od plátce k příjemci, ať už bankovním převodem, hotově nebo přes Lightning.",
    "footer.ico": "IČO",
    "footer.country": "Česká republika",
    "footer.linky": "Linky na GitHubu",
    "footer.fazole": "Fazole na GitHubu",
    "footer.payky": "Payky na GitHubu",
  },
  en: {
    "meta.title": "Q platby – open-source software for payments",
    "meta.description": "Q platby s.r.o. builds open-source apps where bank transfers, cash and Bitcoin Lightning meet in one place.",
    "lang.title": "Language",
    "appearance.label": "Appearance",
    "appearance.auto": "Automatic",
    "appearance.light": "Light",
    "appearance.dark": "Dark",
    "hero.title": "We build open‑source software for payments.",
    "hero.lede": "Q platby is a small Czech company. We make apps where bank transfers, cash and Bitcoin Lightning meet in one place. Everything we build is open source.",
    "projects.title": "What we're working on",
    "linky.tag": "Contacts, messages and payments",
    "linky.desc": "Linky is a web app for phone and desktop. It manages your contacts, sends private messages over Nostr and payments over Lightning and Cashu. Your data stays on your device and syncs between devices encrypted.",
    "fazole.tag": "A payment terminal in your phone",
    "fazole.desc": "Fazole is a payment terminal for Czech merchants. The customer scans a QR code and pays by bank transfer straight to the merchant's account, or in bitcoin over Lightning or Cashu. No contract, no sign-up and no terminal, a phone is enough. Sales and history stay with the merchant.",
    "payky.tag": "Point of sale for small merchants",
    "payky.desc": "Payky is a point-of-sale app for Czech and Slovak merchants. It takes payments by bank QR code, in cash and in bitcoin over Lightning, with no payment processor in between. It works offline and the merchant keeps their own data.",
    "meta.web": "Website",
    "meta.platforms": "Platforms",
    "meta.license": "Licence",
    "meta.source": "Source code",
    "principles.title": "How we work",
    "p1.title": "Open source",
    "p1.text": "The source code of every project is public under permissive licences. Anyone can read it, change it or run it themselves.",
    "p2.title": "Data stays with you",
    "p2.text": "Our apps work locally first, on the user's device. They don't depend on our servers.",
    "p3.title": "No middlemen",
    "p3.text": "A payment goes straight from payer to payee, whether by bank transfer, cash or Lightning.",
    "footer.ico": "Company ID",
    "footer.country": "Czech Republic",
    "footer.linky": "Linky on GitHub",
    "footer.fazole": "Fazole on GitHub",
    "footer.payky": "Payky on GitHub",
  },
};

/* ---------- Language ---------- */

const LANG_KEY = "qplatby.lang";
let currentLang = "cs";

function pickInitialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl in translations) return fromUrl;
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored in translations) return stored;
  } catch {}
  return "cs";
}

function applyLang(lang) {
  const t = translations[lang];
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    const key = el.dataset.i18nContent;
    if (t[key] !== undefined) el.setAttribute("content", t[key]);
  });

  document.querySelectorAll(".sheet-row[data-lang]").forEach((row) => {
    row.setAttribute("aria-selected", String(row.dataset.lang === lang));
  });

  const langToggle = document.getElementById("lang-toggle");
  langToggle.setAttribute("aria-label", t["lang.title"]);
  langToggle.title = t["lang.title"];

  renderColorModeToggle();

  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

const langSheet = document.getElementById("lang-sheet");

document.getElementById("lang-toggle").addEventListener("click", () => {
  langSheet.showModal();
});

langSheet.querySelectorAll(".sheet-row[data-lang]").forEach((row) => {
  row.addEventListener("click", () => {
    applyLang(row.dataset.lang);
    langSheet.close();
  });
});

// A click on the backdrop lands on the dialog element itself, not on its content.
langSheet.addEventListener("click", (event) => {
  if (event.target === langSheet) langSheet.close();
});

/* ---------- Color mode ---------- */
// Same behavior as linky.fit: one button cycles auto → light → dark; auto follows the system.

const COLOR_MODE_KEY = "qplatby.color_mode";
const COLOR_MODE_PREFERENCES = ["auto", "light", "dark"];
const BACKGROUND = { light: "#FFFFFF", dark: "#0B1E3F" };
const darkQuery = matchMedia("(prefers-color-scheme: dark)");

function readColorModePreference() {
  try {
    const stored = localStorage.getItem(COLOR_MODE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return "auto";
}

let colorModePreference = readColorModePreference();

function currentColorMode() {
  if (colorModePreference === "auto") return darkQuery.matches ? "dark" : "light";
  return colorModePreference;
}

function applyColorMode() {
  const mode = currentColorMode();
  const root = document.documentElement;
  if (colorModePreference === "auto") delete root.dataset.theme;
  else root.dataset.theme = colorModePreference;
  root.style.colorScheme = mode;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", BACKGROUND[mode]);
  renderColorModeToggle();
}

function renderColorModeToggle() {
  const t = translations[currentLang];
  const toggle = document.getElementById("theme-toggle");
  const label = `${t["appearance.label"]}: ${t[`appearance.${colorModePreference}`]}`;
  toggle.setAttribute("aria-label", label);
  toggle.title = label;
  toggle.querySelectorAll(".icon[data-mode]").forEach((icon) => {
    icon.hidden = icon.dataset.mode !== colorModePreference;
  });
}

function setColorModePreference(next) {
  colorModePreference = next;
  try {
    if (next === "auto") localStorage.removeItem(COLOR_MODE_KEY);
    else localStorage.setItem(COLOR_MODE_KEY, next);
  } catch {}
  applyColorMode();
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const index = COLOR_MODE_PREFERENCES.indexOf(colorModePreference);
  setColorModePreference(COLOR_MODE_PREFERENCES[(index + 1) % COLOR_MODE_PREFERENCES.length]);
});

darkQuery.addEventListener("change", applyColorMode);

/* ---------- Boot ---------- */

applyLang(pickInitialLang());
applyColorMode();
