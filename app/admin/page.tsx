import Link from "next/link";

export default function AdminIndex() {
  return (
    <main className="admin-page">
      <p className="eyebrow">KAIROS workspace</p>
      <h1>Area amministrativa in migrazione</h1>
      <p>
        La shell completa verrà collegata in una fase successiva. Lo snapshot 0.4
        resta disponibile nel repository come riferimento di handoff.
      </p>
      <Link className="button button-secondary" href="/">
        Torna alla panoramica
      </Link>
    </main>
  );
}
