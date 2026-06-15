// Shared calculations and variables

const avg = a => a.reduce((s,v)=>s+v,0)/a.length;
const r1  = v => Math.round(v*10)/10;

const C = {green:'#3CAC3B',blue:'#2A398D',red:'#E61D25',lgray:'#D1D4D1',dgray:'#474A4A'};
const POS_CLR  = {PO:'#856404',DF:'#1d4ed8',MC:'#15803d',DC:'#b91c1c'};
const POS_BG   = {PO:'#fff3cd',DF:'#dbeafe',MC:'#dcfce7',DC:'#fee2e2'};
const POS_LABEL= {PO:'Portero',DF:'Defensa',MC:'Mediocampista',DC:'Delantero'};

// Build processed TEAMS array
const TEAMS = RAW.map(t=>{
  const ages=t.players.map(p=>p.age), hts=t.players.map(p=>p.height);
  const caps=t.players.map(p=>p.caps), goals=t.players.map(p=>p.goals);
  return {
    ...t,
    avgAge:r1(avg(ages)),
    avgHeight:r1(avg(hts)),
    avgCaps:r1(avg(caps)),
    totalGoals:goals.reduce((a,b)=>a+b,0),
    minAge:Math.min(...ages),
    maxAge:Math.max(...ages),
    maxCaps:Math.max(...caps),
    posCounts:['PO','DF','MC','DC'].map(pos=>t.players.filter(p=>p.pos===pos).length)
  };
});

// Chart defaults configuration
const chartDefaults={
  responsive:true,
  maintainAspectRatio:false,
  plugins:{legend:{display:false}},
  scales:{
    x:{grid:{display:false},ticks:{font:{size:10}}},
    y:{grid:{color:'#f2f2f2'},ticks:{font:{size:10}}}
  }
};

// Help chart registry to avoid duplicate instances
const CH={};
const dc=(id,fn)=>{ if(CH[id]){CH[id].destroy();} CH[id]=fn(); };

// Navigation Setup
document.addEventListener("DOMContentLoaded", () => {
  // Render common header if element exists
  const header = document.getElementById("app-header");
  if (header) {
    header.innerHTML = `
      <div class="logo">
        <h1 style="cursor: pointer;" onclick="location.href='index.html'">Mundial 2026™</h1>
        <p>48 selecciones · 1,248 jugadores · 11 jun – 19 jul</p>
      </div>
      <div class="flag-dots">
        <div class="flag-dot" style="background:#3CAC3B"></div>
        <div class="flag-dot" style="background:#2A398D"></div>
        <div class="flag-dot" style="background:#E61D25"></div>
        <div class="flag-dot" style="background:#474A4A"></div>
      </div>
    `;
  }

  // Render responsive top navigation if element exists
  const topNav = document.getElementById("top-nav");
  if (topNav) {
    const currentFile = location.pathname.split("/").pop() || "index.html";
    const navItems = [
      { file: "index.html", label: "Selección", icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>` },
      { file: "edades.html", label: "Edades", icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
      { file: "alturas.html", label: "Alturas", icon: `<svg viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>` },
      { file: "clubes.html", label: "Clubes", icon: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
      { file: "partidos.html", label: "Partidos", icon: `<svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>` },
      { file: "goles.html", label: "Goles", icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>` }
    ];

    topNav.innerHTML = navItems.map(item => {
      const activeClass = currentFile === item.file ? "active" : "";
      return `
        <a href="${item.file}" class="nav-btn ${activeClass}">
          ${item.icon}
          ${item.label}
        </a>
      `;
    }).join("");
  }
});
