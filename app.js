const state = {};
let currentSection = null;
let history = [];

function init() {
  buildNav();
  renderHome();
}

function buildNav() {
  const nav = document.getElementById("nav-menu");
  nav.innerHTML = "";
  settingsData.sections.forEach(sec => {
    const btn = document.createElement("button");
    btn.className = "nav-item";
    btn.id = "nav-" + sec.id;
    btn.innerHTML = `<span class="nav-icon">${sec.icon}</span><span class="nav-label">${sec.label}</span>`;
    btn.onclick = () => openSection(sec.id);
    nav.appendChild(btn);
  });
}

function renderHome() {
  currentSection = null;
  document.getElementById("page-title").textContent = "Impostazioni";
  document.getElementById("back-btn").style.display = "none";
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));

  const content = document.getElementById("content");
  content.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "home-grid";

  settingsData.sections.forEach(sec => {
    const card = document.createElement("div");
    card.className = "home-card";
    card.innerHTML = `<span class="home-card-icon">${sec.icon}</span><span class="home-card-label">${sec.label}</span>`;
    card.onclick = () => openSection(sec.id);
    grid.appendChild(card);
  });

  content.appendChild(grid);
}

function openSection(id) {
  const sec = settingsData.sections.find(s => s.id === id);
  if (!sec) return;

  history.push(currentSection);
  currentSection = id;

  document.getElementById("page-title").textContent = sec.label;
  document.getElementById("back-btn").style.display = "flex";

  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  const navBtn = document.getElementById("nav-" + id);
  if (navBtn) navBtn.classList.add("active");

  const content = document.getElementById("content");
  content.innerHTML = "";

  sec.items.forEach(item => {
    content.appendChild(renderItem(item));
  });
}

function goBack() {
  const prev = history.pop();
  if (prev) {
    openSection(prev);
    history.pop();
  } else {
    renderHome();
  }
}

function renderItem(item) {
  switch (item.type) {
    case "toggle": return renderToggle(item);
    case "slider": return renderSlider(item);
    case "select": return renderSelect(item);
    case "profile-card": return renderProfileCard(item);
    case "battery-info": return renderBatteryInfo(item);
    case "storage-info": return renderStorageInfo(item);
    case "app-list": return renderAppList(item);
    case "info-list": return renderInfoList(item);
    default: return document.createElement("div");
  }
}

function renderToggle(item) {
  if (!state.hasOwnProperty(item.id)) state[item.id] = item.value;
  const row = document.createElement("div");
  row.className = "setting-row";
  row.innerHTML = `
    <div class="setting-text">
      <span class="setting-label">${item.label}</span>
      ${item.sublabel ? `<span class="setting-sub">${item.sublabel}</span>` : ""}
    </div>
    <label class="toggle">
      <input type="checkbox" ${state[item.id] ? "checked" : ""} onchange="toggleState('${item.id}', this.checked)">
      <span class="toggle-track"><span class="toggle-thumb"></span></span>
    </label>
  `;
  return row;
}

function toggleState(id, val) {
  state[id] = val;
}

function renderSlider(item) {
  if (!state.hasOwnProperty(item.id)) state[item.id] = item.value;
  const row = document.createElement("div");
  row.className = "setting-row setting-row--column";
  row.innerHTML = `
    <div class="setting-text slider-header">
      <span class="setting-label">${item.label}</span>
      <span class="slider-value" id="val-${item.id}">${state[item.id]}${item.unit}</span>
    </div>
    <input class="slider-input" type="range" min="${item.min}" max="${item.max}" value="${state[item.id]}"
      oninput="updateSlider('${item.id}', this.value, '${item.unit}')">
  `;
  return row;
}

function updateSlider(id, val, unit) {
  state[id] = val;
  const el = document.getElementById("val-" + id);
  if (el) el.textContent = val + unit;
}

function renderSelect(item) {
  if (!state.hasOwnProperty(item.id)) state[item.id] = item.value;
  const row = document.createElement("div");
  row.className = "setting-row";
  const options = item.options.map(o =>
    `<option value="${o.value}" ${state[item.id] === o.value ? "selected" : ""}>${o.label}</option>`
  ).join("");
  row.innerHTML = `
    <span class="setting-label">${item.label}</span>
    <select class="setting-select" onchange="state['${item.id}'] = this.value">${options}</select>
  `;
  return row;
}

function renderProfileCard(item) {
  const card = document.createElement("div");
  card.className = "profile-card";
  card.innerHTML = `
    <div class="profile-avatar">${item.name.charAt(0)}</div>
    <div class="profile-info">
      <div class="profile-name">${item.name}</div>
      <div class="profile-email">${item.email}</div>
      <div class="profile-phone">${item.phone}</div>
    </div>
  `;
  return card;
}

function renderBatteryInfo(item) {
  const wrap = document.createElement("div");
  wrap.className = "battery-card";
  const pct = item.level;
  const color = pct > 50 ? "#4CAF50" : pct > 20 ? "#FF9800" : "#F44336";
  wrap.innerHTML = `
    <div class="battery-visual">
      <div class="battery-body">
        <div class="battery-fill" style="width:${pct}%; background:${color}"></div>
      </div>
      <div class="battery-cap"></div>
    </div>
    <div class="battery-details">
      <span class="battery-pct">${pct}%</span>
      <span class="battery-sub">${item.charging ? "⚡ In carica" : "Autonomia rimasta: " + item.timeLeft}</span>
    </div>
  `;
  return wrap;
}

function renderStorageInfo(item) {
  const free = item.total - item.used;
  const wrap = document.createElement("div");
  wrap.className = "storage-card";
  const bars = item.breakdown.map(b =>
    `<div class="storage-bar-seg" style="width:${(b.value / item.total * 100).toFixed(1)}%; background:${b.color}" title="${b.label}: ${b.value} GB"></div>`
  ).join("");
  const legend = item.breakdown.map(b =>
    `<div class="storage-legend-item"><span class="legend-dot" style="background:${b.color}"></span>${b.label} <strong>${b.value} GB</strong></div>`
  ).join("");
  wrap.innerHTML = `
    <div class="storage-numbers">
      <span class="storage-used">${item.used} GB usati</span>
      <span class="storage-free">${free} GB liberi su ${item.total} GB</span>
    </div>
    <div class="storage-bar">${bars}</div>
    <div class="storage-legend">${legend}</div>
  `;
  return wrap;
}

function renderAppList(item) {
  const wrap = document.createElement("div");
  wrap.className = "app-list";
  item.apps.forEach(app => {
    const row = document.createElement("div");
    row.className = "app-row";
    const key = "app-" + app.name.replace(/\s+/g, "");
    if (!state.hasOwnProperty(key + "-notif")) state[key + "-notif"] = app.notifications;
    if (!state.hasOwnProperty(key + "-bg")) state[key + "-bg"] = app.background;
    row.innerHTML = `
      <div class="app-info">
        <span class="app-name">${app.name}</span>
        <span class="app-size">${app.size}</span>
      </div>
      <div class="app-controls">
        <label class="app-toggle-label">🔔
          <input type="checkbox" ${state[key + "-notif"] ? "checked" : ""} onchange="state['${key}-notif']=this.checked">
        </label>
        <label class="app-toggle-label">🔄
          <input type="checkbox" ${state[key + "-bg"] ? "checked" : ""} onchange="state['${key}-bg']=this.checked">
        </label>
      </div>
    `;
    wrap.appendChild(row);
  });
  return wrap;
}

function renderInfoList(item) {
  const wrap = document.createElement("div");
  wrap.className = "info-list";
  item.infos.forEach(info => {
    const row = document.createElement("div");
    row.className = "info-row";
    row.innerHTML = `<span class="info-label">${info.label}</span><span class="info-value">${info.value}</span>`;
    wrap.appendChild(row);
  });
  return wrap;
}

window.addEventListener("DOMContentLoaded", init);