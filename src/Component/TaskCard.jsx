import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Bot, AlertCircle, Loader2, Wrench, FileText, Info } from "lucide-react";

export default function TaskCard({ task }) {
    // Specifically handle the non-error cancellation state
    const isSufficientData = task.status === "cancelled" && task.reason === "sufficient_data";

    const statusConfig = {
        running: {
            bg: "bg-blue-500/10 border-blue-500/30",
            icon: <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />,
            text: "text-blue-400"
        },
        completed: {
            bg: "bg-emerald-500/10 border-emerald-500/30",
            icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
            text: "text-emerald-400"
        },
        failed: {
            bg: "bg-red-500/10 border-red-500/30",
            icon: <XCircle className="w-4 h-4 text-red-400" />,
            text: "text-red-400"
        },
        cancelled: isSufficientData ? {
            bg: "bg-slate-500/10 border-slate-500/30",
            icon: <Info className="w-4 h-4 text-slate-400" />,
            text: "text-slate-400",
            label: "Cancelled (Sufficient Data)"
        } : {
            bg: "bg-orange-500/10 border-orange-500/30",
            icon: <AlertCircle className="w-4 h-4 text-orange-400" />,
            text: "text-orange-400",
            label: "Cancelled"
        }
    };

    const currentStatus = statusConfig[task.status] || statusConfig.running;

    return (
        <div className={`p-4 rounded-xl border backdrop-blur-sm transition-colors ${currentStatus.bg} shadow-lg flex flex-col h-full`}>
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-slate-100 flex-1 pr-2 leading-tight">{task.label}</h3>
                <div title={currentStatus.label || task.status} className={`p-1.5 rounded-lg bg-black/20 shrink-0 ${currentStatus.text}`}>
                    {currentStatus.icon}
                </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-black/20 rounded border border-white/5 text-xs text-slate-300">
                    <Bot className="w-3.5 h-3.5" />
                    <span className="capitalize">{task.agent}</span>
                </div>
                {task.depends_on && task.depends_on.length > 0 && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                        Waits: {task.depends_on.length}
                    </span>
                )}
                {task.retries > 0 && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded border border-red-500/20">
                        Retry {task.retries}
                    </span>
                )}
            </div>

            <div className="flex-1 space-y-3">
                {task.status === "cancelled" && task.message && (
                    <p className="text-xs text-slate-400 italic border-l-2 border-slate-500 pl-2">
                        {task.message}
                    </p>
                )}

                {task.toolCalls && task.toolCalls.map((tc, idx) => (
                    <div key={idx} className="bg-black/20 border border-white/5 rounded-lg p-2 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                            <Wrench className="w-3 h-3" />
                            <span className="font-mono">{tc.tool}</span>
                        </div>
                        {tc.type === 'call' && <div className="text-slate-300 truncate">→ {tc.input_summary}</div>}
                        {tc.type === 'result' && <div className="text-emerald-400 truncate">← {tc.output_summary}</div>}
                    </div>
                ))}

                {task.outputs && task.outputs.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                        {task.outputs.map((o, i) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i} 
                                className={`text-xs p-2 rounded-lg border flex items-start gap-2 ${o.is_final ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200' : 'bg-black/20 border-white/5 text-slate-300'}`}
                            >
                                <FileText className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${o.is_final ? 'text-emerald-400' : 'text-slate-500'}`} />
                                <div className="flex-1">
                                    <span>{o.content}</span>
                                    {o.quality_score && (
                                        <span className="ml-2 px-1.5 py-0.5 bg-black/30 rounded text-[10px] text-emerald-400/80">
                                            Score: {o.quality_score}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}