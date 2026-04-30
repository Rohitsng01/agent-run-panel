export const runSuccess = [
  {
    type: "run_started",
    run_id: "r_001",
    query: "Analyse Apple R&D intensity vs large-cap peers (2019–2023)",
    timestamp: 1700000000000
  },
  {
    type: "agent_thought",
    task_id: "coordinator",
    thought: "Breaking into: (1) Apple 10-K fetch, (2) peer identification, (3) parallel peer fetches, (4) synthesis.",
    timestamp: 1700000001000
  },
  {
    type: "task_spawned",
    task_id: "t_001",
    label: "Fetch Apple 10-K filings (2019–2023)",
    agent: "filing_fetcher",
    spawned_by: "coordinator",
    parallel_group: null,
    depends_on: [],
    timestamp: 1700000002000
  },
  {
    type: "tool_call",
    task_id: "t_001",
    tool: "sec_edgar_search",
    input_summary: "ticker=AAPL, form=10-K, years=2019–2023",
    timestamp: 1700000003000
  },
  {
    type: "tool_result",
    task_id: "t_001",
    tool: "sec_edgar_search",
    output_summary: "5 filings found. Extracting R&D line items...",
    timestamp: 1700000005000
  },
  {
    type: "partial_output",
    task_id: "t_001",
    content: "Apple R&D spend: 2019 $16.2B → 2023 $29.9B (+84%)",
    is_final: false,
    quality_score: null,
    timestamp: 1700000007000
  },
  {
    type: "task_spawned",
    task_id: "t_002",
    label: "Fetch Microsoft 10-K",
    agent: "filing_fetcher",
    spawned_by: "coordinator",
    parallel_group: "pg_peers",
    depends_on: ["t_001"],
    timestamp: 1700000008000
  },
  {
    type: "task_spawned",
    task_id: "t_003",
    label: "Fetch Alphabet 10-K",
    agent: "filing_fetcher",
    spawned_by: "coordinator",
    parallel_group: "pg_peers",
    depends_on: ["t_001"],
    timestamp: 1700000008100
  },
  {
    type: "task_spawned",
    task_id: "t_004",
    label: "Fetch Meta 10-K",
    agent: "filing_fetcher",
    spawned_by: "coordinator",
    parallel_group: "pg_peers",
    depends_on: ["t_001"],
    timestamp: 1700000008200
  },
  {
    type: "tool_call",
    task_id: "t_002",
    tool: "sec_edgar_search",
    input_summary: "ticker=MSFT, form=10-K",
    timestamp: 1700000009000
  },
  {
    type: "tool_call",
    task_id: "t_004",
    tool: "sec_edgar_search",
    input_summary: "ticker=META, form=10-K",
    timestamp: 1700000009500
  },
  {
    type: "tool_call",
    task_id: "t_003",
    tool: "sec_edgar_search",
    input_summary: "ticker=GOOGL, form=10-K",
    timestamp: 1700000010000
  },
  {
    type: "tool_result",
    task_id: "t_002",
    tool: "sec_edgar_search",
    output_summary: "Found Microsoft filings.",
    timestamp: 1700000010500
  },
  {
    type: "task_update",
    task_id: "t_004",
    status: "failed",
    error: "SEC EDGAR rate limit. Retrying in 15s.",
    reason: null,
    message: null,
    timestamp: 1700000011000
  },
  {
    type: "task_update",
    task_id: "t_004",
    status: "running",
    error: null,
    reason: null,
    message: "Retrying fetch",
    timestamp: 1700000012000
  },
  {
    type: "task_update",
    task_id: "t_004",
    status: "cancelled",
    reason: "sufficient_data",
    message: "2 of 3 peers fetched. Coordinator proceeding with available data.",
    error: null,
    timestamp: 1700000013000
  },
  {
    type: "partial_output",
    task_id: "t_002",
    content: "Microsoft R&D: 13.1% → 12.9%",
    is_final: true,
    quality_score: 0.95,
    timestamp: 1700000014000
  },
  {
    type: "partial_output",
    task_id: "t_003",
    content: "Alphabet R&D: 15.1% → 14.9%",
    is_final: true,
    quality_score: 0.92,
    timestamp: 1700000015000
  },
  {
    type: "task_spawned",
    task_id: "t_005",
    label: "Synthesize R&D intensity comparison",
    agent: "analyst",
    spawned_by: "coordinator",
    parallel_group: null,
    depends_on: ["t_001", "t_002", "t_003"],
    timestamp: 1700000016000
  },
  {
    type: "agent_thought",
    task_id: "t_005",
    thought: "Comparing Apple absolute growth vs relative intensity of peers.",
    timestamp: 1700000017000
  },
  {
    type: "partial_output",
    task_id: "t_005",
    content: "Drafting introduction...",
    is_final: false,
    quality_score: null,
    timestamp: 1700000018000
  },
  {
    type: "partial_output",
    task_id: "t_005",
    content: "Apple's R&D intensity has grown from 6.3% to 8.0%...",
    is_final: true,
    quality_score: 0.98,
    timestamp: 1700000020000
  },
  {
    type: "run_complete",
    run_id: "r_001",
    status: "complete",
    duration_ms: 21400,
    task_count: 5,
    output: {
      summary: "Apple's R&D intensity has grown from 6.3% to 8.0% of revenue (2019–2023), outpacing Microsoft (13.1%→12.9%) and Alphabet (15.1%→14.9%) in absolute dollars but lagging in intensity. Meta represents the outlier...",
      citations: [
        { ref_id: "c1", title: "Apple 10-K 2023", source: "SEC EDGAR", page: 48 },
        { ref_id: "c2", title: "Microsoft 10-K 2023", source: "SEC EDGAR", page: 51 }
      ]
    },
    timestamp: 1700000021400
  }
];