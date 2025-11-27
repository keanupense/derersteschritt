// Alle Gruppen, die im Frontend angezeigt und gefiltert werden können.
// Du kannst hier beliebig viele weitere Gruppen nach dem gleichen Muster ergänzen.
const GROUPS = [
  {
    name: "NA Online Meeting",
    topics: ["Drogen / Substanzen"], 
    districts: ["Online"], 
    types: ["Selbsthilfegruppe", "Online-Angebot"],
    description:
      "Montag, 10:00 Uhr bis 10:35 Uhr. Online-Meeting von Narcotics Anonymous Berlin. Schwerpunkt: Polytox.",
    address: "Online (Narcotics Anonymous Berlin)",
    contact: "Narcotics Anonymous Berlin"
  },
  {
    name: "Al-Anon Gruppe Charlottenburg Sekis",
    topics: ["Alkohol"],
    districts: ["Charlottenburg-Wilmersdorf"],
    types: ["Angehörige / Familiengruppe"],
    description: "Montag, 10:00 Uhr bis 11:00 Uhr. Gruppe für Angehörige von Alkoholsüchtigen.",
    address: "Bismarckstraße 101, 10625 Berlin - Charlottenburg-Wilmersdorf",
    contact: "Al-Anon Familiengruppen Alateen"
  },
  {
    name: "Anonyme Alkoholiker",
    topics: ["Alkohol"],
    districts: ["Mitte"],
    types: ["Selbsthilfegruppe"],
    description: "Montag, 10:00 Uhr bis 12:00 Uhr. Offenes Meeting der Anonymen Alkoholiker.",
    address: "Fehmarner Straße 24, 13353 Berlin - Mitte",
    contact: "Anonyme Alkoholiker"
  },
  {
    name: "Spiritual Principles",
    topics: ["Alkohol", "Cannabis", "Drogen / Substanzen", "Medikamente"],
    districts: ["Friedrichshain-Kreuzberg"],
    types: ["Selbsthilfegruppe"],
    description: "Montag, 10:30 Uhr bis 11:30 Uhr. Meeting von Narcotics Anonymous Berlin.",
    address: "Friedrichstr. 18/19, 10969 Berlin - Friedrichshain-Kreuzberg",
    contact: "Narcotics Anonymous Berlin"
  },
  {
    name: "Die Phönix-Gruppe",
    topics: [
      "Alkohol", 
      "Drogen / Substanzen", 
      "Essstörung", 
      "Kaufsucht", 
      "Computerspielsucht / Internetsucht", 
      "Medikamente",
      "Sonstige Themen"
    ],
    districts: ["Mitte"],
    types: ["Selbsthilfegruppe"],
    description: "Montag, 11:00 Uhr bis 13:00 Uhr. Gruppe für verschiedene Suchtformen (Polytox).",
    address: "Koloniestraße 76, 13359 Berlin - Mitte",
    contact: "Bitte hier den Kontakt der Phönix-Gruppe eintragen!"
  },
  {
    name: "AA Discussion In person and online (Englisch)",
    topics: ["Alkohol"],
    districts: ["Pankow", "Online"],
    types: ["Selbsthilfegruppe", "Online-Angebot", "Fremdsprache (Englisch)"],
    description: "Montag, 12:00 Uhr bis 13:00 Uhr. Diskussionstreffen der Anonymen Alkoholiker in englischer Sprache.",
    address: "Schönhauser Allee 182, 10119 Berlin - Pankow (und Online)",
    contact: "Anonyme Alkoholiker"
  },
  {
    name: "Guttempler Gemeinschaft 'Lankwitz'",
    topics: ["Alkohol", "Drogen / Substanzen", "Medikamente"],
    districts: ["Steglitz-Zehlendorf"],
    types: ["Selbsthilfegruppe"],
    description: "Montag, 12:00 Uhr bis 14:00 Uhr. Treffen der Guttempler Gemeinschaft.",
    address: "Ostpreußendamm 52, 12207 Berlin - Steglitz-Zehlendorf",
    contact: "Guttempler Landesverband Berlin-Brandenburg e.V."
  },
  {
    name: "Stille Straße",
    topics: [
      "Alkohol",
      "Cannabis",
      "Drogen / Substanzen",
      "Glücksspielsucht",
      "Medikamente",
      "Sonstige Themen" // Für die Substanzen Benzos, Heroin, Kokain, Polytox und Spielsucht
    ],
    districts: ["Pankow"],
    types: ["Selbsthilfegruppe"],
    description: "Montag, 15:00 Uhr bis 16:30 Uhr. Gruppe des Kreuzbundes. Fokus auf multiple Suchtprobleme.",
    address: "Stille Straße 10, 13156 Berlin - Pankow",
    contact: "Kreuzbund Diözesanverband Berlin e.V."
  },
  {
    name: "Anonyme Alkoholiker - Frauengruppe",
    topics: ["Alkohol"],
    districts: ["Steglitz-Zehlendorf"],
    types: ["Selbsthilfegruppe", "Zielgruppe (Frauen)"],
    description: "Montag, 16:00 Uhr bis 17:00 Uhr. Spezielle Gruppe für Frauen.",
    address: "Königstraße 42 - 43, 14163 Berlin - Steglitz-Zehlendorf",
    contact: "Anonyme Alkoholiker"
  },
  {
    name: "Alkohol 'Rückenwind'",
    topics: ["Alkohol"],
    districts: ["Marzahn-Hellersdorf"],
    types: ["Selbsthilfegruppe"],
    description: "Montag, 16:00 Uhr bis 17:30 Uhr. Gruppe der Selbsthilfekontaktstelle Marzahn-Hellersdorf.",
    address: "Altlandsberger Platz 2, 12685 Berlin - Marzahn-Hellersdorf",
    contact: "Selbsthilfekontaktstelle Marzahn-Hellersdorf"
  }
];


// -------------------------------
// Filter- und Render-Logik
// (ab hier nichts ändern, außer du weißt genau, was du tust)
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const resultsDiv = document.getElementById("groupResults");
  const topicCheckboxes = document.querySelectorAll('input[name="topic"]');
  const districtCheckboxes = document.querySelectorAll('input[name="district"]');
  const typeCheckboxes = document.querySelectorAll('input[name="groupType"]');
  const searchInput = document.getElementById("searchInput");
  const resetButton = document.getElementById("resetFilters");
  const noResultsDiv = document.getElementById("noResults");

  function getSelectedValues(checkboxes) {
    return Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  function filterGroups() {
    const selectedTopics = getSelectedValues(topicCheckboxes);
    const selectedDistricts = getSelectedValues(districtCheckboxes);
    const selectedTypes = getSelectedValues(typeCheckboxes);
    const searchQuery = searchInput.value.toLowerCase();

    return GROUPS.filter(group => {
      // Themen-Filter
      const matchesTopic =
        selectedTopics.length === 0 ||
        selectedTopics.some(topic => group.topics.includes(topic));

      // Bezirks-Filter
      const matchesDistrict =
        selectedDistricts.length === 0 ||
        selectedDistricts.some(district => group.districts.includes(district));

      // Gruppenform-Filter
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.some(type => group.types.includes(type));

      // Freitextsuche
      const matchesSearch =
        !searchQuery ||
        group.name.toLowerCase().includes(searchQuery) ||
        group.description.toLowerCase().includes(searchQuery) ||
        group.address.toLowerCase().includes(searchQuery);

      return matchesTopic && matchesDistrict && matchesType && matchesSearch;
    });
  }

  function renderResults(groups) {
    resultsDiv.innerHTML = "";

    if (groups.length === 0) {
      noResultsDiv.style.display = "block";
      // Hier wurde der Text korrigiert, falls du ihn noch nicht in der HTML hast:
      noResultsDiv.innerHTML = "Aktuell gibt es keine Angebote, die zu dieser Filter-Auswahl passen. Probiere eine andere Kombination aus.";
      return;
    }

    noResultsDiv.style.display = "none";

    groups.forEach(group => {
      const card = document.createElement("div");
      card.className = "group-card";

      card.innerHTML = `
        <h3>${group.name}</h3>
        <p class="group-meta">
          <strong>Themen:</strong> ${group.topics.join(", ")}<br>
          <strong>Bezirk:</strong> ${group.districts.join(", ") || "–"}<br>
          <strong>Angebotsform:</strong> ${group.types.join(", ")}
        </p>
        <p>${group.description}</p>
        <p class="group-address"><strong>Adresse:</strong> ${group.address}</p>
        <p class="group-contact"><strong>Kontakt:</strong> ${group.contact}</p>
      `;

      resultsDiv.appendChild(card);
    });
  }

  function applyFilters() {
    const filtered = filterGroups();
    renderResults(filtered);
  }

  function resetFilters() {
    topicCheckboxes.forEach(cb => (cb.checked = false));
    districtCheckboxes.forEach(cb => (cb.checked = false));
    typeCheckboxes.forEach(cb => (cb.checked = false));
    searchInput.value = "";
    renderResults(GROUPS);
  }

  // Event Listener
  topicCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  districtCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  typeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  
  // Verbindung des "Ergebnisse anzeigen" Buttons
  const applyButton = document.getElementById("apply-filters");
  applyButton.addEventListener("click", applyFilters); 

  searchInput.addEventListener("input", applyFilters);
  resetButton.addEventListener("click", resetFilters);

  // Initiales Rendern
  renderResults(GROUPS);
});