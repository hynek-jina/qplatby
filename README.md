# Q platby – web

Firemní web Q platby s.r.o. Statická stránka (HTML, CSS, trocha JS) servírovaná Bunem.

## Spuštění

```sh
bun run dev      # vývoj, restartuje se při změně server.ts
bun run start    # produkce
```

Server běží na http://localhost:3000, port lze změnit proměnnou `PORT`.

## Struktura

- `server.ts` – statický server (Bun.serve), servíruje složku `public/`
- `public/index.html` – obsah stránky (výchozí texty česky)
- `public/app.js` – přepínání jazyků a vzhledu, překlady CZ/EN
- `public/styles.css` – styly, včetně tmavého režimu
- `public/assets/` – loga a ikony

## Jazyky

Výchozí jazyk je čeština. Angličtinu zapne ikona jazyka v hlavičce (otevře výběr jazyků)
nebo parametr `?lang=en`. Volba se ukládá do `localStorage`. Překlady jsou v objektu `translations`
v `public/app.js`; každý přeložený prvek má atribut `data-i18n="klíč"`.

## Vzhled

Ikona vedle jazyka přepíná vzhled stejně jako na linky.fit: automaticky (podle systému) → světlý → tmavý.
Volba se ukládá do `localStorage` (`qplatby.color_mode`), skript v hlavičce `index.html` ji načte
ještě před prvním vykreslením. Barvy jsou v `styles.css` jako proměnné na `:root`; tmavá sada platí
pro `[data-theme="dark"]` a při automatice podle `prefers-color-scheme`.

## Nasazení na Vercel

Web se na Vercelu nasazuje jako statický – `vercel.json` říká, že se má servírovat složka `public/`
bez buildu. Soubor `server.ts` slouží jen pro lokální vývoj, Vercel ho nespouští.
Pokud byl projekt na Vercelu založen dříve, zkontrolujte v Settings → General, že
*Framework Preset* je „Other“ a *Root Directory* je prázdné, pak proveďte nový deploy.
