# Project Challenge: JS Bank Enterprise

Benvenuti nel vostro primo vero progetto di sviluppo software.
Siete stati ingaggiati per rifare il backend gestionale di una nuova banca digitale. Il vostro compito è creare un sistema robusto, sicuro e testato.

### Obiettivo Didattico

Dimostrare la padronanza della logica di programmazione utilizzando **Strutture Dati Complesse**.
Dovrete abbandonare le variabili singole e gestire tutto tramite **Array e Oggetti**.

### Vincoli Tecnici (Technical Constraints)

1.  **No DOM / No Grafica:** L'interfaccia deve essere gestita esclusivamente tramite `prompt`, `alert` e `console.log`.
2.  **Strutture Dati:** È obbligatorio usare un **Array di Oggetti** per gestire i conti correnti.
3.  **Codice Pulito:** Variabili in inglese, indentazione corretta e commenti esplicativi dove serve.

---

## Specifiche Funzionali

Il vostro software deve includere le seguenti funzionalità, divise per aree di competenza.

### 1. Database & Struttura Dati

Il sistema non deve avere un solo utente, ma deve simulare una banca dati.

- Creare un array globale (es. `accounts`) che contiene diversi oggetti "Conto Corrente".
- Ogni oggetto deve avere almeno queste proprietà:
  - `username` (stringa univoca)
  - `pin` (stringa o numero)
  - `saldo` (numero)
  - `movimenti` (array di oggetti per lo storico)

### 2. Sistema di Autenticazione (Login)

All'avvio, il programma deve chiedere **Username** e **PIN**.

- Il sistema deve cercare nell'array `accounts` se esiste un utente con quello username.
- Se esiste, deve verificare se il PIN corrisponde.
- Se entrambi sono corretti, l'utente accede al menu principale.
- Se sbagliati, mostrare un errore e riprovare.

### 3. Operazioni Bancarie Base

Una volta loggato, l'utente può effettuare azioni sul **proprio** conto:

- **Prelievo:** Controllare la disponibilità fondi. Non si può andare in rosso.
- **Versamento:** Aggiungere fondi al saldo.
- **Saldo Attuale:** Visualizzare il saldo formattato (es. due decimali).
- **Storico Movimenti:** Ogni operazione (prelievo/versamento) deve essere salvata nell'array `movimenti` dell'utente con data, tipo e importo. L'utente deve poter stampare in console la lista delle sue operazioni.

### 4. Advanced Feature: Il Bonifico

L'utente deve poter inviare soldi a un altro utente della banca.

- Chiedere all'utente lo `username` del destinatario e l'importo.
- Il sistema deve:
  1.  Verificare che il destinatario esista nell'array `accounts`.
  2.  Verificare che il mittente abbia abbastanza soldi.
  3.  **Sottrarre** l'importo al mittente e **Aggiungerlo** al destinatario.
  4.  Registrare il movimento negli storici di _entrambi_ (Uscita per chi invia, Entrata per chi riceve).

### 5. Pannello Amministratore (Admin)

Se ci si logga con credenziali speciali (es. User: `"admin"`, Pin: `"12345"`), si accede a un menu segreto:

- **Lista Conti:** Visualizzare tutti gli utenti registrati e i loro saldi attuali.
- **Banca Centrale:** Visualizzare la somma totale di tutti i soldi detenuti dalla banca (somma di tutti i saldi degli utenti).
- **Crea Utente:** Possibilità di aggiungere un nuovo conto corrente all'array `accounts` dinamicamente.

---

## Guida alla User Experience (UX)

Non avendo un'interfaccia grafica (bottoni, finestre), dovete simulare la navigazione usando sapientemente i cicli e le finestre di sistema. Ecco come ci aspettiamo che si comporti la vostra applicazione passo dopo passo.

**Il Concetto Fondamentale: Il Loop**
L'applicazione non deve mai chiudersi da sola dopo una singola operazione. Deve continuare a girare finché l'utente non sceglie esplicitamente di uscire.

### Esempio di Flusso (Walkthrough)

**1. Avvio e Login**
Appena apro la pagina (o ricarico), deve partire un ciclo di autenticazione.

- `PROMPT`: "Inserisci Username"
- `PROMPT`: "Inserisci PIN"
- _Logica:_ Se sbaglio, mi avvisa (`ALERT`) e mi richiede i dati. Se indovino, passo allo step 2.

**2. Il Menu Principale (Dashboard)**
Questa è la schermata centrale che deve ricomparire dopo ogni operazione.

- `PROMPT`: Deve mostrare tutte le opzioni in elenco. Usate `\n` per andare a capo nel testo del prompt.
  ```text
  Benvenuto Mario! Cosa vuoi fare?
  1. Visualizza Saldo
  2. Effettua Prelievo
  3. Effettua Bonifico
  ...
  6. Esci / Logout
  ```
- L'utente inserisce il numero (es. "2") e preme OK.

**3. Esecuzione Azione (Es. Prelievo)**

- `PROMPT`: "Quanto vuoi prelevare?" (L'utente scrive 50).
- _Logica:_ Il sistema fa i calcoli.
- `ALERT`: "Operazione riuscita! Hai prelevato 50€. Nuovo saldo: 950€".
- **IMPORTANTE:** Appena l'utente chiude l'alert, il programma deve **tornare automaticamente al Menu Principale** (Step 2).

**4. Logout**

- Se al Menu Principale scelgo l'opzione "Esci":
  - `ALERT`: "Arrivederci Mario!"
  - Il programma torna alla schermata di **Login** (Step 1) pronto per un altro utente.

### Suggerimento Tecnico per il Menu

Per creare un menu navigabile via prompt, la struttura tipica in JavaScript (pseudocodice) è questa:

```javascript
// Esempio logico (non copiare/incollare, capiscilo!)
mentre (utenteVuoleRimanere) {
    scelta = prompt("1. Saldo\n2. Prelievo\n3. Esci");

    se (scelta === "1") {
        mostraSaldo();
    }
    altrimenti se (scelta === "2") {
        faiPrelievo();
    }
    altrimenti se (scelta === "3") {
        utenteVuoleRimanere = falso; // Questo spezza il ciclo
    }
}
```

---

## Workflow di Sviluppo (Simulazione Aziendale)

Il progetto deve seguire un flusso di lavoro strutturato in 3 fasi. Siete liberi di gestirvi il tempo, ma dovete rispettare questi step.

#### FASE A: Development

Il team scrive il codice. Dividetevi i compiti (es. chi fa il login, chi fa il bonifico, chi l'admin). Il codice deve essere funzionante e privo di errori bloccanti.

#### FASE B: Quality Assurance (Peer Review)

Una volta completato lo sviluppo, scambierete il vostro progetto con un altro gruppo.

- Il Gruppo A testerà il codice del Gruppo B (e viceversa).
- L'obiettivo è provare a "rompere" il programma: inserire lettere dove vanno numeri, provare a bonificare a utenti inesistenti, tentare di loggarsi con pin errati.
- Dovete compilare un **Bug Report** (tabella sottostante) con tutti gli errori trovati nel progetto dei colleghi.

#### FASE C: Fixing & Release

Ricevuto il Bug Report dagli altri, il team originale deve correggere i bug segnalati.

Il progetto finale consegnato dovrà includere il codice corretto e il Bug Report originale ricevuto, dimostrando di aver risolto i problemi.

---

### Bug Report Template

Utilizzate questo formato per segnalare gli errori ai vostri colleghi:

| ID  |  Tipo   | Descrizione del Bug                  | Step per riprodurlo                                                   |
| :-: | :-----: | :----------------------------------- | :-------------------------------------------------------------------- |
| 01  | CRITICO | Bonifico a utente inesistente crasha | 1. Login<br>2. Bonifico -> inserire nome 'pippo'<br>3. Errore console |
| 02  | MINORE  | Saldo con troppi decimali            | Il saldo mostra 10.500000001 invece di 10.50                          |

---

### Consigli per il Team

- **Pianificate prima di scrivere:** Disegnate su carta come è fatto l'oggetto Utente e quali passaggi servono per fare un bonifico.
- **Usate le Funzioni:** Non scrivete tutto nel `main`. Create funzioni piccole come `trovaUtente(nome)`, `eseguiBonifico(da, a, quanto)`.
- **Console Log è vostro amico:** Usatelo per vedere cosa c'è dentro gli array mentre programmate.

Buon lavoro! 💻
