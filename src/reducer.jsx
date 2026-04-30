export function reducer(state, event) {
    switch (event.type) {
        case "RESET":
            return {
                run: null,
                tasks: {},
                thoughts: [],
                finalOutput: null,
            };
        case "run_started":
            return {
                ...state,
                run: { ...event, status: "running", startTime: event.timestamp },
            };

        case "task_spawned":
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [event.task_id]: {
                        ...event,
                        status: "running",
                        outputs: [],
                        toolCalls: [],
                        retries: 0,
                        updates: []
                    },
                },
            };

        case "tool_call":
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [event.task_id]: {
                        ...state.tasks[event.task_id],
                        toolCalls: [...(state.tasks[event.task_id]?.toolCalls || []), { type: 'call', ...event }]
                    }
                }
            };
            
        case "tool_result":
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [event.task_id]: {
                        ...state.tasks[event.task_id],
                        toolCalls: [...(state.tasks[event.task_id]?.toolCalls || []), { type: 'result', ...event }]
                    }
                }
            };

        case "partial_output":
            const task = state.tasks[event.task_id];
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [event.task_id]: {
                        ...task,
                        outputs: [...task.outputs, event],
                        status: event.is_final ? "completed" : task.status
                    }
                }
            };

        case "task_update":
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [event.task_id]: {
                        ...state.tasks[event.task_id],
                        status: event.status,
                        retries: event.status === "running" && state.tasks[event.task_id].status === "failed" 
                            ? (state.tasks[event.task_id].retries || 0) + 1 
                            : state.tasks[event.task_id].retries,
                        updates: [...(state.tasks[event.task_id].updates || []), event]
                    }
                }
            };

        case "agent_thought":
            return {
                ...state,
                thoughts: [...state.thoughts, event],
            };

        case "run_complete":
            return {
                ...state,
                run: { ...state.run, status: "complete", duration_ms: event.duration_ms },
                finalOutput: event.output,
            };

        case "run_error":
            return {
                ...state,
                run: { ...state.run, status: "failed", error: event.message },
            };

        default:
            return state;
    }
}