import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks }) {
    const taskArray = Object.values(tasks);
    
    // Group tasks by parallel_group
    const groupedTasks = [];
    let currentGroup = null;
    let groupItems = [];

    taskArray.forEach(task => {
        if (task.parallel_group) {
            if (currentGroup !== task.parallel_group) {
                if (groupItems.length > 0) groupedTasks.push(groupItems);
                currentGroup = task.parallel_group;
                groupItems = [task];
            } else {
                groupItems.push(task);
            }
        } else {
            if (groupItems.length > 0) {
                groupedTasks.push(groupItems);
                groupItems = [];
                currentGroup = null;
            }
            groupedTasks.push([task]);
        }
    });
    if (groupItems.length > 0) groupedTasks.push(groupItems);

    return (
        <div className="space-y-6">
            {groupedTasks.length > 0 && (
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                    Execution Graph
                </h3>
            )}
            
            <AnimatePresence>
                {groupedTasks.map((group, groupIdx) => {
                    const isParallel = group.length > 1;
                    return (
                        <motion.div 
                            key={`group-${groupIdx}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={isParallel ? "p-4 rounded-xl bg-slate-800/30 border border-slate-700/50" : ""}
                        >
                            {isParallel && (
                                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                                    Parallel Execution Block ({group[0].parallel_group})
                                </div>
                            )}
                            <div className={`grid gap-4 ${isParallel ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
                                {group.map(t => (
                                    <TaskCard key={t.task_id} task={t} />
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}