import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, CheckCircle2, PlayCircle, XCircle, Clock } from "lucide-react";

export default function RunHeader({ run, thoughts, elapsed }) {
  const latestThought = thoughts?.[thoughts.length - 1];

  const getStatusIcon = (status) => {
    if (status === "complete") return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    if (status === "failed") return <XCircle className="w-5 h-5 text-red-400" />;
    return <PlayCircle className="w-5 h-5 text-purple-400 animate-pulse" />;
  };

  const formatElapsed = (ms) => {
    if (!ms) return "0.0s";
    return (ms / 1000).toFixed(1) + "s";
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 border-b border-slate-800 p-6">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400"></div>

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            {run?.query}
          </h2>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-3 py-1 w-fit border border-slate-700/50 shadow-inner">
              {getStatusIcon(run?.status)}
              <span className="text-xs font-medium uppercase tracking-wider text-slate-300">
                {run?.status}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm font-mono">
              <Clock className="w-4 h-4" />
              <span>{formatElapsed(elapsed)}</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {latestThought && (
          <motion.div
            key={latestThought.thought}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-5 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex gap-3 text-sm text-purple-200/80 items-start"
          >
            <BrainCircuit className="w-5 h-5 shrink-0 text-purple-400" />
            <p className="leading-relaxed">{latestThought.thought}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}