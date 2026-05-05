# ⚙️ App Impostazioni Mockup - Versione Completa (Testing & Firebase)

Questo progetto è un'applicazione web interattiva che simula fedelmente l'interfaccia delle impostazioni di uno smartphone moderno. È stata progettata specificamente per permettere all'utente di eseguire **test funzionali** su componenti UI complessi e per dimostrare l'integrazione con i servizi **Firebase**.

## 🚀 Funzionalità Principali

### 1. Gestione Profili (Sistema CRUD)
Il cuore del testing dell'utente si focalizza sulla gestione degli account:
*   **Aggiunta**: Tramite un tasto dedicato e una finestra modale interattiva.
*   **Eliminazione**: Pulsanti specifici per rimuovere profili esistenti.
*   **Switch Account**: Possibilità di impostare un profilo come "Attivo", con aggiornamento dinamico dei badge e dell'interfaccia.

### 2. Sezioni di Sistema Complete
Nessuna voce è stata omessa. Ogni sezione è popolata con componenti interattivi reali:
*   **📶 Rete e Internet**: Toggle per Wi-Fi, Dati mobili, Bluetooth e Modalità aereo.
*   **☀️ Display e Luminosità**: Slider per la regolazione e selettori per il timeout schermo.
*   **🔊 Suono e Vibrazione**: Controllo volumi e feedback tattile.
*   **🔔 Notifiche**: Gestione dei badge e delle autorizzazioni.
*   **🔋 Batteria**: Visualizzazione grafica della carica e risparmio energetico.
*   **💾 Archiviazione**: Barra dinamica con segmenti colorati per App, Foto e Sistema.
*   **🔒 Privacy e Sicurezza**: Gestione permessi GPS e dati biometrici.
*   **📱 Applicazioni**: Lista simulata delle app installate con relativo peso (MB).
*   **🌐 Lingua e Tastiera**: Menu a tendina per la selezione della localizzazione.
*   **♿ Accessibilità**: Opzioni per TalkBack e assistenza.
*   **ℹ️ Info Dispositivo**: Tabella riassuntiva con Modello, Versione Android e IMEI.

### 3. Integrazione Cloud & Analytics
L'app è collegata a **Google Firebase** (versione 10.8.0):
*   **Firebase App**: Inizializzazione protetta tramite SDK ufficiale.
*   **Google Analytics**: Tracciamento delle visualizzazioni e delle interazioni per monitorare il comportamento dell'utente durante i test.

## 🛠️ Tecnologie Utilizzate
*   **HTML5 / CSS3**: Design responsivo, variabili CSS per i colori, animazioni fluide e layout Flexbox/Grid.
*   **JavaScript (ES6 Modules)**: Logica modulare, gestione dello stato tramite oggetti e rendering dinamico del DOM.
*   **Google Fonts**: 'DM Sans' per la leggibilità e 'DM Mono' per i dati tecnici.
*   **Firebase SDK**: Caricato via CDN per garantire la massima compatibilità senza installazioni locali.

## 📦 Installazione e Avvio
1.  **Copia il codice** fornito nel file `index.html`.
2.  **Esegui un Server Locale**: A causa dell'uso dei moduli JavaScript (`type="module"`), l'apertura diretta del file nel browser potrebbe bloccare le funzionalità Firebase.
    *   Usa l'estensione **Live Server** su VS Code.
    *   Oppure usa il terminale: `python -m http.server 8000` (poi vai su `localhost:8000`).
3.  **Testa**: Prova ad aggiungere nuovi profili, attivare i toggle e navigare tra le sezioni della sidebar.

---

**Nota per il tester:** Tutti i dati (nomi, percentuali, dimensioni file) sono gestiti in modo dinamico tramite JavaScript. Ogni modifica effettuata durante la sessione è immediata grazie alla gestione dello stato interno.