import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FinalOutput({ output }) {
    if (!output) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden"
        >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-[50px] rounded-full"></div>

            <h2 className="font-bold text-emerald-400 text-lg flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                Final Output Generated
            </h2>
            <div className="text-slate-200 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                <p>{output.summary}</p>
            </div>
        </motion.div>
    );
}