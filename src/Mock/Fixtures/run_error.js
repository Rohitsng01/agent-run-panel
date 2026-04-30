export const runError = [
  {
    type: "run_started",
    run_id: "r_002",
    query: "Analyze unexpected market failure",
    timestamp: 1700000000000
  },
  {
    type: "agent_thought",
    task_id: "coordinator",
    thought: "Spawning initial tasks",
    timestamp: 1700000001000
  },
  {
    type: "task_spawned",
    task_id: "t_001",
    label: "Fetch critical data",
    agent: "fetcher",
    spawned_by: "coordinator",
    parallel_group: null,
    depends_on: [],
    timestamp: 1700000002000
  },
  {
    type: "tool_call",
    task_id: "t_001",
    tool: "api_call",
    input_summary: "critical_endpoint",
    timestamp: 1700000003000
  },
  {
    type: "task_update",
    task_id: "t_001",
    status: "failed",
    error: "Connection timeout",
    reason: null,
    message: null,
    timestamp: 1700000005000
  },
  {
    type: "run_error",
    run_id: "r_002",
    message: "Coordinator encountered an unrecoverable error. Partial results may be available.",
    timestamp: 1700000012000
  }
];