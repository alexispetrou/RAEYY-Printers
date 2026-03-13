# RAAEY Printers - Free Online + Shared Updates

Αυτό το project μπορεί να τρέχει **δωρεάν online** με:
- **GitHub Pages** (hosting)
- **Supabase Free** (κοινά δεδομένα για όλους)

## 1) Γρήγορη εικόνα
- Αν το `app-config.js` έχει `enabled: false`, η εφαρμογή δουλεύει τοπικά (localStorage).
- Αν βάλεις `enabled: true` και Supabase στοιχεία, οι αλλαγές ενός χρήστη συγχρονίζονται σε όλους (polling κάθε λίγα δευτερόλεπτα).

## 2) Ρύθμιση Supabase (δωρεάν)
1. Δημιούργησε λογαριασμό στο Supabase και νέο project (Free plan).
2. Άνοιξε **SQL Editor** και τρέξε:

```sql
create table if not exists app_state (
  id int primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

insert into app_state (id, data)
values (1, '{"printerData":{"printers":[]}}'::jsonb)
on conflict (id) do nothing;

alter table app_state enable row level security;

create policy "Allow read app_state"
on app_state
for select
using (true);

create policy "Allow update app_state"
on app_state
for update
using (true)
with check (true);
```

> Σημείωση: για εσωτερική χρήση/δοκιμή αυτή η πολιτική είναι η απλούστερη. Για παραγωγή, προτείνεται αυστηρότερο auth.

## 3) Ρύθμιση app-config.js
Άνοιξε `app-config.js` και συμπλήρωσε:

```js
window.CLOUD_CONFIG = {
  enabled: true,
  supabaseUrl: 'https://YOUR_PROJECT_ID.supabase.co',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
  table: 'app_state',
  rowId: 1,
  pollIntervalMs: 5000
};
```

Μπορείς να ξεκινήσεις από το `app-config.example.js`.

## 4) Ανέβασμα στο GitHub Pages
1. Push στο GitHub repository.
2. GitHub → **Settings** → **Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` (ή το branch σου), folder `/root`.
5. Save.
6. Περίμενε 1-2 λεπτά και άνοιξε το URL που θα δώσει το GitHub Pages.

## 5) Έλεγχος ότι δουλεύει shared
1. Άνοιξε το URL σε 2 διαφορετικά browsers/συσκευές.
2. Κάνε αλλαγή στον πρώτο (προσθήκη ή επεξεργασία εκτυπωτή).
3. Σε μερικά δευτερόλεπτα (ανάλογα με `pollIntervalMs`) θα εμφανιστεί και στον δεύτερο.

## 6) Fallback χωρίς cloud
Αν απενεργοποιήσεις το cloud (`enabled: false`), έχεις ακόμα:
- `Backup JSON`
- `Εισαγωγή JSON` (μόνο δεδομένα εκτυπωτών)

ώστε να μεταφέρεις δεδομένα χειροκίνητα.
