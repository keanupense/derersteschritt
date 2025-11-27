// Statische Liste von Gruppen – später kannst du die erweitern.
const GROUPS = [
  {
    name: "AA Kreuzberg",
    topics: ["Alkoholsucht"],
    districts: ["Friedrichshain-Kreuzberg"],
    types: ["Selbsthilfegruppe"],
    description:
      "Offene Gruppe für Menschen mit Alkoholproblemen. Regelmäßige Treffen in Kreuzberg.",
    address: "Kreuzberg, nahe Kottbusser Tor",
    contact: "Kontakt über die Berliner AA-Webseite"
  },
  {
    name: "Cannabis Selbsthilfe Neukölln",
    topics: ["Cannabis"],
    districts: ["Neukölln"],
    types: ["Selbsthilfegruppe"],
    description:
      "Austausch für Menschen, die ihren Cannabiskonsum reduzieren oder beenden möchten.",
    address: "Neukölln, Nähe Rathaus Neukölln",
    contact: "Über eine Selbsthilfekontaktstelle in Neukölln"
  },
  {
    name: "Depressionsgruppe Mitte",
    topics: ["Depression"],
    districts: ["Mitte"],
    types: ["Selbsthilfegruppe"],
    description:
      "Selbsthilfegruppe für Erwachsene mit Depressionen mit Fokus auf Austausch und Stabilisierung.",
    address: "Berlin-Mitte",
    contact: "Anmeldung über eine Selbsthilfekontaktstelle in Mitte"
  },
  {
    name: "Ambulante Suchtberatung Lichtenberg",
    topics: ["Alkoholsucht", "Drogen / Substanzen"],
    districts: ["Lichtenberg"],
    types: ["Beratungsstelle"],
    description:
      "Beratungsstelle für Menschen mit Suchtproblemen und deren Angehörige.",
    address: "Lichtenberg, Nähe Möllendorffstraße",
    contact: "Telefonische Anmeldung über die Beratungsstelle"
  },
  {
    name: "Online-Gruppe Glücksspiel",
    topics: ["Glücksspielsucht"],
    districts: ["Mitte"],
    types: ["Online-Angebot"],
    description:
      "Online-Selbsthilfegruppe für Menschen mit Glücksspielproblemen.",
    address: "Online",
    contact: "Zugangsdaten nach Anmeldung per E-Mail"
  },
  {
    name: "Frauen-Selbsthilfegruppe Essstörungen",
    topics: ["Essstörung"],
    districts: ["Charlottenburg-Wilmersdorf"],
    types: ["Selbsthilfegruppe"],
    description:
      "Selbsthilfegruppe für Frauen mit Anorexie, Bulimie oder Binge-Eating.",
    address: "Charlottenburg-Wilmersdorf",
    contact: "Infos über die lokale Selbsthilfekontaktstelle"
  }
];

// Hilfsfunktion: ausgewählte Werte aus Checkbox-Gruppen holen
function getSelectedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(
    (el) => el.value
  );
}

// Ergebnisse im DOM anzeigen
function renderResults(groups) {
  const listEl = document.getElementById("group-list");
  const emptyEl = document.getElementById("group-empty");

  listEl.innerHTML = "";

  if (!groups.length) {
    emptyEl.textContent =
      "Für deine Auswahl wurden noch keine Gruppen eingetragen.";
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "block";
  emptyEl.textContent = `${groups.length} Angebot(e) passen zu deiner Auswahl.`;

  groups.forEach((group) => {
    const card = document.createElement("article");
    card.className = "group-card";

    const topicsText = group.topics.join(", ");
    const districtsText = group.districts.join(", ");
    const typesText = group.types.join(", ");

    card.innerHTML = `
      <h3>${group.name}</h3>
      <p><strong>Art:</strong> ${typesText}</p>
      <p><strong>Thema:</strong> ${topicsText}</p>
      <p><strong>Bezirk:</strong> ${districtsText}</p>
      <p>${group.description}</p>
      <p><strong>Adresse / Ort:</strong> ${group.address}</p>
      <p><strong>Kontakt:</strong> ${group.contact}</p>
    `;

    listEl.appendChild(card);
  });
}

// Filter anwenden – AND / OR Logik
function applyFilters() {
  const selectedTopics = getSelectedValues("topics");
  const selectedDistricts = getSelectedValues("districts");
  const selectedTypes = getSelectedValues("types");

  const nothingSelected =
    selectedTopics.length === 0 &&
    selectedDistricts.length === 0 &&
    selectedTypes.length === 0;

  const listEl = document.getElementById("group-list");
  const emptyEl = document.getElementById("group-empty");

  // Wenn nichts ausgewählt ist: keine Gruppen anzeigen, nur Hinweis
  if (nothingSelected) {
    listEl.innerHTML = "";
    emptyEl.textContent =
      "Wähl oben Filter aus, um passende Gruppen in Berlin zu sehen.";
    emptyEl.style.display = "block";
    return;
  }

  const filtered = GROUPS.filter((group) => {
    // Themen: OR innerhalb der Themen, AND gegen andere Kategorien
    if (
      selectedTopics.length &&
      !selectedTopics.some((t) => group.topics.includes(t))
    ) {
      return false;
    }

    // Bezirke: OR innerhalb, AND gegen andere Kategorien
    if (
      selectedDistricts.length &&
      !selectedDistricts.some((d) => group.districts.includes(d))
    ) {
      return false;
    }

    // Art des Angebots: OR innerhalb, AND gegen andere Kategorien
    if (
      selectedTypes.length &&
      !selectedTypes.some((t) => group.types.includes(t))
    ) {
      return false;
    }

    return true;
  });

  renderResults(filtered);
}

// Filter zurücksetzen
function resetFilters() {
  ["topics", "districts", "types"].forEach((name) => {
    document
      .querySelectorAll(`input[name="${name}"]`)
      .forEach((el) => (el.checked = false));
  });

  const listEl = document.getElementById("group-list");
  const emptyEl = document.getElementById("group-empty");

  listEl.innerHTML = "";
  emptyEl.textContent =
    "Wähl oben Filter aus, um passende Gruppen in Berlin zu sehen.";
  emptyEl.style.display = "block";
}

// Event-Listener setzen, sobald DOM geladen ist
document.addEventListener("DOMContentLoaded", () => {
  const applyBtn = document.getElementById("apply-filters");
  const resetBtn = document.getElementById("reset-filters");

  if (!applyBtn || !resetBtn) {
    // Falls wir auf einer anderen Seite sind (z.B. Startseite), nichts tun
    return;
  }

  // Wenn du auf "Ergebnisse anzeigen" klickst → Filter anwenden
  applyBtn.addEventListener("click", () => {
    applyFilters();
  });

  // Optional: schon beim Anklicken der Chips filtern
  document
    .querySelectorAll('input[name="topics"], input[name="districts"], input[name="types"]')
    .forEach((el) => el.addEventListener("change", applyFilters));

  // Filter zurücksetzen
  resetBtn.addEventListener("click", () => {
    resetFilters();
  });

  // Initialer Zustand
  resetFilters();
});
