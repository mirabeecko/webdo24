# Skryté bloky — index.html

Bloky jsou skryté pomocí `display:none` v inline stylu.
Chceš-li blok zobrazit, odstraň z `style="..."` část `display:none`.

---

## Aktuálně skryté

| Název bloku | id / selector | Jak zobrazit |
|---|---|---|
| **Nový typ služby** (pill label) | `<p>` uvnitř `#co-je-system` | Odstraň `display:none` z `style` toho `<p>` |
| **Vše pod kontrolou** (dashboard mockup) | `<section id="dashboard">` | Odstraň `display:none` z `style` sekce |

---

## Postup hledání v kódu

```
Ctrl+F → display:none
```

Nebo hledej konkrétní id:
- `id="dashboard"` — sekce Vše pod kontrolou
- Hledej `Nový typ služby` — pill label v sekci id="co-je-system"
