const navGroups = [
  { title: "", items: ["▦  NOW", "▱  Decisions", "□  Inbox"] },
  { title: "WORK", items: ["⌄  Company", "   ▥  Clienti", "   ▣  Fornitori", "   ▧  Contatti", "   ◇  Prodotti / Servizi", "   ▤  Progetti / Pratiche"] },
  { title: "", items: ["⌄  People", "   ♧  Dipendenti", "   ✈  Trasferte", "   ▦  Rapportini", "   ▣  Spese dipendenti"] },
];

const metrics = [
  { title: "Ricavi", value: "€ 428.600", delta: "+8,4%", note: "YTD vs 2025", color: "cyan" },
  { title: "Posizione di cassa", value: "€ 118.240", delta: "+€ 12.480", note: "al 7 settembre", color: "blue" },
  { title: "Profitto / margine", value: "27,6%", delta: "+2,1 pt", note: "ultimi 90 giorni", color: "violet" },
  { title: "Tax exposure stimata", value: "€ 34.900", delta: "+€ 1.240", note: "prossimi 90 giorni", color: "pink" },
  { title: "Compliance / anomalie", value: "4 aperte", delta: "1 alta", note: "controlli attivi", color: "amber" },
];

function Sparkline({ color }: { color: string }) {
  return <span className={`spark ${color}`}><i /><i /><i /><i /><i /><i /><i /></span>;
}

export default function Dashboard() {
  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="logo"><b>×</b><span><strong>KAIROS</strong><small>Admin Workspace</small></span></div>
        <div className="company"><b>AO</b><span><strong>Apertura Operations</strong><small>ORG-0001 · EUR</small></span><i>⌃⌄</i></div>
        <div className="side-scroll">
          {navGroups.map((group, groupIndex) => <div className="nav-group" key={groupIndex}>
            {group.title && <h3>▱ &nbsp; {group.title}<span>⌄</span></h3>}
            {group.items.map((item, index) => <div className={groupIndex === 0 && index === 0 ? "nav-active" : "nav-item"} key={item}>{item}</div>)}
          </div>)}
        </div>
        <div className="profile"><b>♢</b><span><strong>Giulio Cesare</strong><small>ChatGPT · accesso automatico</small></span><i>↪</i></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <span className="panel-icon">▥</span><span className="top-divider" />
          <div><strong>NOW</strong><small>Quadro operativo sintetico con indicatori tracciabili.</small></div>
          <div className="top-actions"><span className="search">⌕ &nbsp; Ask KAIROS or search...　⌘ K</span><b>DEV · FIXTURE</b><span>⌘ Admin　⌃</span><span>▱　♧</span><i>GC</i></div>
        </header>

        <div className="dashboard-content">
          <div className="welcome"><div><h1>Buonasera, Giulio.</h1><p>La tua impresa in sintesi. <b>5 elementi</b> richiedono attenzione.</p></div><div className="clock"><b>KAIROS</b><small>DECIDE AT THE RIGHT MOMENT.</small></div><div className="date">Lunedì 7 Settembre 2026<strong>18:15</strong></div></div>

          <div className="decision-row">
            <section className="attention panel">
              <header><b><span className="warning">△</span> Attention　<em>5</em></b><strong>Decisions　→</strong></header>
              <div className="attention-grid">
                <article><small><i className="dot pink-bg" /> MOV-8827</small><h2>Valuta non coerente</h2><p>MOV-8827 impedisce la riconciliazione.</p><p>Riconciliazione bancaria · € 129,40 equivalente</p><small>Entro domani</small><a>Conferma l’addebito USD e registra il cambio applicato.　→</a></article>
                <article><small><i className="dot amber-bg" /> EXP-1048</small><h2>Spesa da classificare</h2><p>EXP-1048 blocca il controllo spese.</p><p>€ 48,50 · chiusura settembre　 Da decidere oggi</p><small>La ricevuta è stata acquisita.</small><a>Approva Trasporti come categoria e collega la spesa alla trasferta TR-224.　→</a></article>
              </div>
            </section>
            <section className="why panel"><header><b><span>◷</span> WHY NOW</b><em>● FIXTURE</em></header><h2>Conferma classificazione della spesa</h2><p>La ricevuta è stata acquisita. La spesa mantiene aperto il controllo expense.</p><footer><b>Da decidere oggi</b><a>Valuta　→</a></footer></section>
            <section className="debt panel"><header><b><span>◇</span> DECISION DEBT</b></header><div><strong>1</strong> criticità accumulate</div><i /><p>Debito decisionale fixture: decisioni critiche o rinviate ancora aperte.</p></section>
          </div>

          <div className="metrics">
            {metrics.map(metric => <article className={`metric ${metric.color}`} key={metric.title}><header><b>{metric.title}</b><span>● {metric.title.startsWith("Tax") ? "FORECAST" : "ACTUAL"}</span></header><div className="metric-body"><div><strong>{metric.value}</strong><b>{metric.delta}</b><p>{metric.note}</p><small>⚒ {metric.color === "blue" ? "74 GIORNI" : metric.color === "amber" ? "controlli attivi" : "FY € 612K"}</small></div><Sparkline color={metric.color} /></div></article>)}
          </div>

          <div className="bottom panel"><section><h3>▣　NEXT</h3><div><b>Follow-up fattura FT-2026-091</b><small>Incasso atteso € 18.400</small><span>10 set　→</span></div><div><b>Risolvi i blocker di chiusura</b><span>13 set　→</span></div></section><section><h3>◴　OUTLOOK</h3><div><b>Cash</b><small>Runway previsto 74 giorni</small><span>30 set　→</span></div><div><b>Margine</b><span>30 set　→</span></div></section></div>
        </div>
      </section>
    </main>
  );
}
