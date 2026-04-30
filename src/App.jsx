import { useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { MockEmitter } from "./Mock/emmiter";
import { runSuccess } from "./Mock/Fixtures/run_success";
import { runError } from "./Mock/Fixtures/run_error";

import RunHeader from "./Component/RunHeader";
import TaskList from "./Component/TaskList";
import FinalOutput from "./Component/FinalOutput";
import { Activity, Play, RefreshCcw } from "lucide-react";

const initialState = {
  run: null,
  tasks: {},
  thoughts: [],
  finalOutput: null,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [useErrorFixture, setUseErrorFixture] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (state.run && state.run.status === "running") {
      interval = setInterval(() => {
        setElapsed(Date.now() - state.run.startTime);
      }, 100);
    } else if (state.run && state.run.status !== "running" && state.run.duration_ms) {
      setElapsed(state.run.duration_ms);
    }
    return () => clearInterval(interval);
  }, [state.run?.status, state.run?.startTime, state.run?.duration_ms]);

  const startRun = () => {
    dispatch({ type: "RESET" }); // Need to add RESET to reducer if we want to restart, for now we just reload page or similar. But since we use initial state, we can just replace.
  };

  useEffect(() => {
    const fixture = useErrorFixture ? runError : runSuccess;

    dispatch({ type: "RESET" });
    setElapsed(0);

    const emitter = new MockEmitter(fixture, dispatch);
    emitter.start();

    return () => {
      // optional cleanup if your emitter supports it
    };
  }, [useErrorFixture]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => setUseErrorFixture(false)}
            className={`px-4 py-2 rounded text-sm font-medium border ${!useErrorFixture ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'}`}
          >
            Run Success Fixture
          </button>
          <button
            onClick={() => setUseErrorFixture(true)}
            className={`px-4 py-2 rounded text-sm font-medium border ${useErrorFixture ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'}`}
          >
            Run Error Fixture
          </button>
        </div>

        {!state.run ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-4">
            <Activity className="w-10 h-10 animate-pulse text-purple-500" />
            <p className="text-lg tracking-wide">Waiting for agent run to start...</p>
          </div>
        ) : (
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
            <RunHeader run={state.run} thoughts={state.thoughts} elapsed={elapsed} />
            <div className="p-6">
              {state.run.status === "failed" && state.run.error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                  <h3 className="font-bold mb-1">Run Failed</h3>
                  <p className="text-sm">{state.run.error}</p>
                </div>
              )}
              <TaskList tasks={state.tasks} />
              <FinalOutput output={state.finalOutput} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}