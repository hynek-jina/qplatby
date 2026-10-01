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
- `public/app.js` – přepínání jazyků, překlady CZ/EN
- `public/styles.css` – styly, včetně tmavého režimu
- `public/assets/` – loga a ikony

## Jazyky

Výchozí jazyk je čeština. Angličtinu zapne přepínač v hlavičce nebo parametr `?lang=en`.
Volba se ukládá do `localStorage`. Překlady jsou v objektu `translations` v `public/app.js`;
každý přeložený prvek má atribut `data-i18n="klíč"`.
