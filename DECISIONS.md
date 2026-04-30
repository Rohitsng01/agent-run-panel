# Agent Run Panel Decisions

## 1. Agent Thoughts
**Decision**: I decided to display the *latest* agent thought globally in the `RunHeader` (as a highlighted callout) rather than inline within individual tasks. 
**Reasoning**: The primary user is a non-technical financial analyst who needs reassurance that the system is actively working on their query. Displaying an ever-growing list of scratchpad thoughts creates cognitive overload and clutter. By showing only the "current train of thought" at the top level, it acts as a smart status indicator (like a "Currently thinking..." ticker), giving enough transparency to build trust without overwhelming the user with debugging logs.
**Reconsideration Signal**: If analysts report that they don't trust the final result because they cannot audit the step-by-step reasoning that led to it, or if developers need this UI for debugging, I would reconsider and add an expandable "Reasoning Trace" log or inline thoughts within specific tasks.

## 2. Parallel Task Layout
**Decision**: Tasks sharing a `parallel_group` ID are visually grouped inside a dedicated "Parallel Execution Block" container and rendered side-by-side using a responsive CSS grid layout (up to 3 columns on desktop).
**Reasoning**: Listing parallel tasks sequentially can be misleading, implying a chronological dependency where none exists. By explicitly wrapping them in a distinctly styled block with a pulsating indicator and placing them horizontally side-by-side, it instantly communicates to the analyst that the system is working efficiently in parallel. This makes the UI structure mirror the actual execution graph.
**Reconsideration Signal**: If a parallel group frequently contains more than 4–6 tasks, the side-by-side layout might become too cramped or require excessive horizontal scrolling. In that case, I would reconsider by switching to a condensed list view within the parallel block, or a masonry layout.

## 3. Partial Outputs (`is_final: false`)
**Decision**: Partial outputs are displayed inline as they arrive, but styled more subtly (grayed out, neutral icon) compared to the final outputs (which use emerald green text and prominent icons). I do not discard them when the final output arrives.
**Reasoning**: Analysts often wait seconds or minutes for complex LLM generations. Showing partial outputs provides crucial live feedback that the agent is actively streaming data or making progress. Keeping them visible even after completion provides a transparent history of how the agent synthesized the data. The distinct styling ensures the user knows which output is the definitive result without losing the context of the intermediate steps.
**Reconsideration Signal**: If the streaming partial outputs become too long (e.g., streaming thousands of tokens) and push the critical final output out of view, I would reconsider this by automatically collapsing partial outputs into an accordion once the `is_final: true` output is received.

## 4. Cancelled with Reason: "sufficient_data"
**Decision**: This specific cancellation state is treated neutrally/positively. It uses a slate/gray color scheme (rather than alarming red or warning orange) and an `Info` icon, explicitly labeled "Cancelled (Sufficient Data)".
**Reasoning**: The prompt specifically notes this is an intentional decision by the coordinator, not a failure. Using red or orange would falsely trigger alarm for the analyst. By styling it in a muted, informative way, it communicates that the system successfully optimized its workload and proactively stopped unnecessary work.
**Reconsideration Signal**: If user testing shows that analysts still misinterpret the word "Cancelled" as a negative event despite the neutral colors, I would reconsider the terminology—perhaps replacing the label with "Skipped (Optimized)" or "Halted (Data Met)".

## 5. Task Dependency Display
**Decision**: Task dependencies are represented via a small, unobtrusive "Waits: [count]" badge inside the task card metadata. I chose not to draw an explicit visual dependency graph (like nodes and arrows).
**Reasoning**: A non-technical analyst mostly cares about *what* is happening and *why* it's taking time, not the intricate DAG topology. By simply showing that a task is waiting on `X` dependencies, it explains why a task might sit in a "running" state without emitting tool calls. It provides just enough context without turning the UI into a complex engineering diagram. Furthermore, if a dependency was cancelled (like `t_004`), the synthesis still completes, proving the coordinator handled the gap implicitly.
**Reconsideration Signal**: If analysts frequently ask why certain tasks started out of order, or if the pipelines become incredibly complex with deep nesting where the causal chain isn't obvious, I would reconsider and explore rendering a simplified mini-map or a timeline view to explicitly show task blocking.
