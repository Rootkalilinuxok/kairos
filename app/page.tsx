import Link from "next/link";

const capabilities = [
  ["Action Center", "Priorità, anomalie e decisioni raccolte in un unico flusso operativo."],
  ["AI Workspace", "Contesto aziendale e assistenza intelligente, senza perdere il controllo."],
  ["Three portals", "Esperienze dedicate per amministratori, consulenti e dipendenti."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Navigazione principale">
        <span className="brand"><i aria-hidden="true" /> KAIROS</span>
        <span className="version">Migration snapshot 0.4</span>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI-native business operating system</p>
          <h1>Decide at the<br /><em>right moment.</em></h1>
          <p className="lede">
            KAIROS trasforma segnali, documenti e attività aziendali in decisioni
            chiare, verificabili e pronte per essere eseguite.
          </p>
          <div className="actions">
            <Link className="button" href="/admin">Apri il workspace <span>→</span></Link>
            <a className="text-link" href="https://github.com/Rootkalilinuxok/kairos">Esplora il repository</a>
          </div>
        </div>
        <div className="signal-card" aria-label="Indicatore decisionale dimostrativo">
          <div className="signal-head"><span>Decision signal</span><b>LIVE</b></div>
          <div className="signal-score">87<small>/100</small></div>
          <div className="signal-label">Momento favorevole</div>
          <div className="bars" aria-hidden="true">
            {[32, 48, 43, 66, 61, 82, 76, 94].map((height, index) => (
              <i key={height} style={{ height: `${height}%`, animationDelay: `${index * 80}ms` }} />
            ))}
          </div>
          <p>La liquidità prevista copre il prossimo ciclo operativo con margine.</p>
        </div>
      </section>

      <section className="capabilities" aria-label="Funzionalità principali">
        {capabilities.map(([title, description], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
