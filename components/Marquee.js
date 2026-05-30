const ITEMS = ["LangGraph", "RAG", "Multi-Agent", "Azure OpenAI", "PyTorch", "MLOps", "Forecasting", "MCP"];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-line bg-bg2 py-5">
      <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-[1.7rem] text-inkfaint">
            {w} <span className="text-base text-signal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
