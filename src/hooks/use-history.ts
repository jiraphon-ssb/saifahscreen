"use client";

import { useState, useCallback, useMemo } from "react";

export const useHistory = <T>(initialState: T) => {
  const [state, setStateInternal] = useState({
    history: [initialState],
    index: 0,
  });

  const currentState = state.history[state.index];

  const setState = useCallback(
    (action: T | ((prevState: T) => T), overwrite = false) => {
      setStateInternal((prevState) => {
        const currentHistoryState = prevState.history[prevState.index];
        const newState =
          typeof action === "function"
            ? (action as (prevState: T) => T)(currentHistoryState)
            : action;

        if (!overwrite && newState === currentHistoryState) {
          return prevState;
        }

        if (overwrite) {
          const historyCopy = [...prevState.history];
          historyCopy[prevState.index] = newState;
          return { ...prevState, history: historyCopy };
        } else {
          const newHistory = prevState.history.slice(0, prevState.index + 1);
          newHistory.push(newState);
          return {
            history: newHistory,
            index: newHistory.length - 1,
          };
        }
      });
    },
    [],
  );

  const undo = useCallback(() => {
    setStateInternal((prevState) => {
      if (prevState.index > 0) {
        return { ...prevState, index: prevState.index - 1 };
      }
      return prevState;
    });
  }, []);

  const redo = useCallback(() => {
    setStateInternal((prevState) => {
      if (prevState.index < prevState.history.length - 1) {
        return { ...prevState, index: prevState.index + 1 };
      }
      return prevState;
    });
  }, []);

  const canUndo = useMemo(() => state.index > 0, [state.index]);
  const canRedo = useMemo(
    () => state.index < state.history.length - 1,
    [state.index, state.history.length],
  );

  return [currentState, setState, undo, redo, canUndo, canRedo] as const;
};
