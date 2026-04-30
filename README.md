# Agent Run Panel

A real-time UI component for visualizing orchestrated multi-agent research pipelines. Built for the JcurveIQ Frontend Engineer Take-Home Assessment.

## Running Locally

1. Ensure you have Node.js installed.
2. Clone this repository or extract the ZIP.
3. Open a terminal in the project root directory.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the provided localhost URL (typically `http://localhost:5173`) in your browser.

## Switching Between Fixtures

In the top right corner of the application interface, you will find two buttons:
- **Run Success Fixture**: Replays the standard execution flow where the agent successfully fetches data, runs tasks in parallel, recovers from a rate limit failure, and completes synthesis.
- **Run Error Fixture**: Replays a failing execution flow where a critical fetch fails permanently, resulting in a coordinator crash.

Clicking either button will instantly reset the mock engine and replay the selected event stream from the beginning.

## Technical Stack

- **React 19** (Functional components, hooks, useReducer for state machine)
- **Tailwind CSS v4** (For styling, dark mode, glassmorphism)
- **Framer Motion** (For fluid layout animations and task entrances)
- **Lucide React** (For premium iconography)
- **Vite** (Build tool)

## Known Gaps & Future Improvements

Given more time, I would address the following:

1. **Auto-scrolling**: As many events stream in, the UI grows vertically. Implementing an auto-scroll to the bottom (or to the active task) would prevent the user from having to manually scroll down.
2. **Markdown Rendering**: The final output is currently rendered as plain text. Integrating a library like `react-markdown` would allow the synthesis output to beautifully render bolding, lists, and citations.
3. **Collapsible JSON/Tool Details**: Tool calls are currently truncated if they are too long. Providing an expandable area or modal to view the raw JSON inputs/outputs would be helpful for power users.
4. **WebSocket Integration**: Replace the `MockEmitter` class with a real WebSocket provider context so it can effortlessly plug into the actual JcurveIQ Python backend.
