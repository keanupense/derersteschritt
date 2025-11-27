document.addEventListener("DOMContentLoaded", () => {
  // Wenn wir nicht auf der browse-Seite sind, einfach nichts tun
  const listEl = document.querySelector("#group-list");
  const emptyEl = document.querySelector("#group-empty");
  if (!listEl || !emptyEl || typeof GROUPS === "undefined") return;

  const nameInput = document.querySelector("#filter-name");
  const topicSelect = document.querySelector("#filter-topic");
  const typeSelect = document.querySelector("#filter-type");
  const districtCheckboxes = Array.from(
    document.querySelectorAll('input[name="district"]')
  );

  function renderGroups() {
    const nameQuery = nameInput.value.trim().toLowerCase();
    const selectedTopic = topicSelect.value; // "all", "sucht", ...
    const selectedType = typeSelect.value;   // "all" oder Typ
    const selectedDistricts = districtCheckboxes
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const filtered = GROUPS.filter((g) => {
      const matchName =
        !nameQuery || g.name.toLowerCase().includes(nameQuery);

      const matchTopic =
        selectedTopic === "all" || g.topic === selectedTopic;

      const matchType =
        selectedType === "all" || g.type === selectedType;

      const matchDistrict =
        selectedDistricts.length === 0 ||
        selectedDistricts.includes(g.district);

      return matchName && matchTopic && matchType && matchDistrict;
    });

    if (filtered.length === 0) {
      emptyEl.textContent = "Es sind noch keine Gruppen eingetragen.";
      listEl.innerHTML = "";
      return;
    }

    emptyEl.textContent = "";
    listEl.innerHTML = filtered
      .map((g) => {
        return `
          <article class="group-card">
            <h3>${g.name}</h3>
            <p><strong>Art:</strong> ${g.type}</p>
            <p><strong>Thema:</strong> ${formatTopic(g.topic)}</p>
            <p><strong>Bezirk:</strong> ${g.district}</p>
            <p><strong>Termin:</strong> ${formatSchedule(g.weekday, g.time)}</p>
            <p><strong>Adresse:</strong> ${g.address}</p>
            <p>${g.note || ""}</p>
            ${
              g.link
                ? `<a href="${g.link}" target="_blank" rel="noopener noreferrer">Mehr Infos</a>`
                : ""
            }
          </article>
        `;
      })
      .join("");
  }

  function formatTopic(topic) {
    switch (topic) {
      case "sucht":
        return "Sucht";
      case "depression":
        return "Depression";
      case "angst":
        return "Angst & Panik";
      case "sonstiges":
        return "Sonstiges";
      default:
        return topic;
    }
  }

  function formatSchedule(weekday, time) {
    if (!weekday && !time) return "nach Vereinbarung";
    if (!time) return weekday;
    return `${weekday}, ${time}`;
  }

  // Events
  nameInput.addEventListener("input", renderGroups);
  topicSelect.addEventListener("change", renderGroups);
  typeSelect.addEventListener("change", renderGroups);
  districtCheckboxes.forEach((cb) =>
    cb.addEventListener("change", renderGroups)
  );

  // Direkt einmal rendern
  renderGroups();
});
