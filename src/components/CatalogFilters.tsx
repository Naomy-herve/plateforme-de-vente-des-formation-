'use client';
const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé'];
type P = {
  q: string; setQ: (v: string) => void;
  levels: string[]; setLevels: (v: string[]) => void;
  maxDur: number; setMaxDur: (v: number) => void;
  maxPrice: number; setMaxPrice: (v: number) => void;
  view: 'grid' | 'timeline'; setView: (v: 'grid' | 'timeline') => void;
};
export default function CatalogFilters(p: P) {
  const toggle = (l: string) => p.setLevels(p.levels.includes(l) ? p.levels.filter(x => x !== l) : [...p.levels, l]);
  return (
    <div className="card my-6 grid gap-4 md:grid-cols-5">
      <input value={p.q} onChange={e => p.setQ(e.target.value)} placeholder="🔎 Compétence ou titre…"
        className="col-span-2 rounded-lg bg-black/40 px-3 py-2 outline-none ring-brand focus:ring-2" aria-label="Recherche" />
      <fieldset className="flex gap-2 text-sm">
        {LEVELS.map(l => (
          <label key={l} className={`cursor-pointer rounded-lg px-2 py-1 ${p.levels.includes(l) ? 'bg-brand' : 'bg-white/10'}`}>
            <input type="checkbox" checked={p.levels.includes(l)} onChange={() => toggle(l)} className="mr-1" />{l}
          </label>
        ))}
      </fieldset>
      <label className="text-sm">Durée ≤ {p.maxDur}h<input type="range" min={5} max={50} value={p.maxDur} onChange={e => p.setMaxDur(+e.target.value)} className="w-full accent-brand" /></label>
      <label className="text-sm">Prix ≤ {p.maxPrice} €<input type="range" min={0} max={200} step={10} value={p.maxPrice} onChange={e => p.setMaxPrice(+e.target.value)} className="w-full accent-brand" /></label>
      <div className="col-span-full flex justify-end gap-2">
        {(['grid', 'timeline'] as const).map(v => (
          <button key={v} onClick={() => p.setView(v)} className={`rounded-lg px-3 py-1 text-sm ${p.view === v ? 'bg-brand' : 'bg-white/10'}`}>
            {v === 'grid' ? '▦ Grid' : '⏱ Timeline'}
          </button>
        ))}
      </div>
    </div>
  );
}