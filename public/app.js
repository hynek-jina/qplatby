const translations = {
  cs: {
    "meta.title": "Q platby – otevřený software pro platby",
    "meta.description": "Q platby s.r.o. vyvíjí open-source aplikace, ve kterých se bankovní převod, hotovost a bitcoinový Lightning potkávají na jednom místě.",
    "lang.group": "Jazyk",
    "hero.title": "Stavíme otevřený software pro platby.",
    "hero.lede": "Q platby je malá česká firma. Vyvíjíme aplikace, ve kterých se bankovní převod, hotovost a bitcoinový Lightning potkávají na jednom místě. Všechno zveřejňujeme jako open source.",
    "projects.title": "Na čem pracujeme",
    "linky.tag": "Kontakty, zprávy a platby",
    "linky.desc": "Linky je webová aplikace pro telefon i počítač. Spravuje kontakty, posílá soukromé zprávy přes Nostr a platby přes Lightning a Cashu. Data zůstávají v zařízení a mezi zařízeními se synchronizují šifrovaně.",
    "payky.tag": "Pokladna pro malé obchodníky",
    "payky.desc": "Payky je pokladní aplikace pro české a slovenské obchodníky. Přijímá platby QR kódem na bankovní účet, hotovost i bitcoin přes Lightning, bez platebního zprostředkovatele. Funguje i bez připojení a data zůstávají u obchodníka.",
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
    "footer.payky": "Payky na GitHubu",
  },
  en: {
    "meta.title": "Q platby – open-source software for payments",
    "meta.description": "Q platby s.r.o. builds open-source apps where bank transfers, cash and Bitcoin Lightning meet in one place.",
    "lang.group": "Language",
    "hero.title": "We build open‑source software for payments.",
    "hero.lede": "Q platby is a small Czech company. We make apps where bank transfers, cash and Bitcoin Lightning meet in one place. Everything we build is open source.",
    "projects.title": "What we're working on",
    "linky.tag": "Contacts, messages and payments",
    "linky.desc": "Linky is a web app for phone and desktop. It manages your contacts, sends private messages over Nostr and payments over Lightning and Cashu. Your data stays on your device and syncs between devices encrypted.",
    "payky.tag": "Point of sale for small merchants",
    "payky.desc": "Payky is a point-of-sale app for Czech and Slovak merchants. It takes payments by bank QR code, in cash and in bitcoin over Lightning, with no payment processor in between. It works offline and the merchant keeps their own data.",
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
    "footer.payky": "Payky on GitHub",
  },
};

const STORAGE_KEY = "qplatby.lang";

function pickInitialLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl in translations) return fromUrl;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored in translations) return stored;
  } catch {}
  return "cs";
}

function applyLang(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    const key = el.dataset.i18nContent;
    if (t[key] !== undefined) el.setAttribute("content", t[key]);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (t[key] !== undefined) el.setAttribute("aria-label", t[key]);
  });

  const footerLinks = document.querySelectorAll(".footer-links a");
  if (footerLinks[0]) footerLinks[0].textContent = t["footer.linky"];
  if (footerLinks[1]) footerLinks[1].textContent = t["footer.payky"];

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

applyLang(pickInitialLang());
