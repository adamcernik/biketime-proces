# CLAUDE.md — BikeTime Rental Process Modeler

## O projektu

**BikeTime Rental (BTR)** je B2B SaaS platforma pro správu pronájmu elektrokol. Partneři (hotely, půjčovny, servisní obchody) využívají platformu k onboardingu zákazníků, ověření identity přes českou Bankovní identitu (BankID), digitálnímu podepisování smluv a správě rezervací.

Tento repozitář obsahuje **interaktivní procesní model** — React Flow aplikaci, ve které vizuálně modelujeme a dokumentujeme celý BTR proces. Slouží jako živý dokument pro vývoj, komunikaci s partnery a plánování implementace.

---

## Technický stack

- **React 18+** s Vite
- **React Flow** (@xyflow/react) — vizuální node/edge editor
- **TypeScript**
- **Tailwind CSS** pro styling
- Deployment: **GitHub Pages** (statický build)

---

## Architektura aplikace

```
src/
├── App.tsx                  # Hlavní layout s React Flow canvas
├── main.tsx                 # Entry point
├── nodes/                   # Vlastní typy nodů
│   ├── ProcessNode.tsx      # Standardní procesní krok
│   ├── DecisionNode.tsx     # Rozhodovací bod (diamant)
│   ├── ActorNode.tsx        # Swim-lane header pro aktéry
│   └── NoteNode.tsx         # Poznámkový/info blok
├── edges/                   # Vlastní typy hran
│   └── LabeledEdge.tsx      # Hrana s popiskem
├── data/                    # Definice procesů jako JSON/TS
│   └── btr-main-process.ts  # Hlavní BTR proces
├── components/              # UI komponenty
│   ├── Sidebar.tsx          # Panel s detaily vybraného nodu
│   ├── Legend.tsx            # Legenda barev a aktérů
│   └── Toolbar.tsx          # Ovládací prvky (zoom, export)
└── types/                   # TypeScript typy
    └── process.ts           # Typy pro nody, metadata
```

---

## Datový model nodů

Každý procesní node má tato metadata (uložená v `data`):

```typescript
interface ProcessNodeData {
  label: string;              // Název kroku (CZ)
  actor: Actor;               // Kdo provádí krok
  phase: Phase;               // Fáze procesu
  status: Status;             // Stav implementace
  description?: string;       // Detailní popis
  dependencies?: string[];    // ID závislých kroků
  notes?: string;             // Poznámky pro vývoj
}

type Actor = 'customer' | 'platform' | 'partner' | 'bankid' | 'payment';
type Phase = 'reservation' | 'validation' | 'handover';
type Status = 'planned' | 'in-progress' | 'done' | 'blocked';
```

---

## Barevné kódování aktérů

| Aktér | Barva | Hex |
|-------|-------|-----|
| Zákazník | Modrá | `#3B82F6` |
| Platforma BTR | Zelená | `#10B981` |
| Partner (hotel/půjčovna) | Oranžová | `#F59E0B` |
| BankID | Fialová | `#8B5CF6` |
| Platební brána | Červená | `#EF4444` |

---

## BTR hlavní proces — tři fáze

### FÁZE 1: Rezervace

1. Zákazník otevře odkaz/QR kód partnera
2. Platforma zobrazí dostupnou flotilu partnera
3. Zákazník vybere kolo a období pronájmu
4. Platforma zobrazí cenový souhrn a balíček
5. Zákazník potvrdí rezervaci

### FÁZE 2: Digitální validace (BankID flow)

6. **Rozhodovací bod:** Český rezident s BankID → ano/ne
7. **BankID cesta:**
   - Přesměrování na BankID bránu
   - Zákazník vybere svou banku
   - Autentizace v bankovní aplikaci (MFA)
   - BankID vrátí ověřená data (IDENTIFY): jméno, adresa, IBAN
   - Platforma validuje věk (18+)
   - Platforma generuje PDF nájemní smlouvy s ověřenými daty
   - Zákazník podepíše smlouvu přes BankID SIGN (hash-based)
   - Platforma uloží podpis + hash + timestamp
8. **Fallback cesta (turista/bez BankID):**
   - Zákazník nahraje foto dokladu
   - Ověření při fyzickém předání partnerem
   - Zvýšená kauce
9. Platba přes platební bránu
10. Platforma odešle potvrzení zákazníkovi + notifikaci partnerovi

### FÁZE 3: Fyzické předání

11. Partner obdrží notifikaci o ověřené rezervaci
12. Partner připraví kolo + příslušenství
13. Zákazník se dostaví na výdejní místo
14. Partner předá kolo (minimální administrativa — vše hotovo digitálně)
15. Zahájení pronájmu (GPS tracking aktivní)

---

## Konvence

- Jazyk UI a popisků: **čeština**
- Jazyk kódu a komentářů: **angličtina**
- Commit messages: angličtina, konvenční formát (`feat:`, `fix:`, `docs:`)
- Jeden proces = jeden soubor v `data/`
- Nody mají unikátní string ID ve formátu `{phase}-{step}` (např. `reservation-1`, `validation-bankid-auth`)

---

## Jak začít

```bash
npm install
npm run dev        # lokální dev server
npm run build      # produkční build
```
