import { Sparkles } from "lucide-react";

export function Badge({ type }) {
  if (type === "ai") return (
    <span className="flex items-center gap-1 bg-white text-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-black/5">
      <Sparkles className="h-2.5 w-2.5" style={{ color: 'var(--brand-accent)' }} />
      AI Pick
    </span>
  );
  if (type === "sale") return (
    <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
      Sale
    </span>
  );
  return (
    <span className="bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
      New
    </span>
  );
}