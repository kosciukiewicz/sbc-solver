import { useCallback, useEffect } from "react";
import default_solver_config from "../../../assets/default_solver_config.json";
import { selectSolverPlayerCards } from "../../../store/slices/solver/solver.selectors";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { solverSlice } from "../../../store/slices/solver/solver.slice";

import Worker from "worker-loader!../../../worker/solverWorker.ts";
import { SolverState } from "../../../store/slices/solver/solver.types";
import { appSettings } from "../../../config/appConfig";

let worker = new Worker();

export const useSolverBottonView = () => {
  const dispatch = useAppDispatch();
  const solverConfig = useAppSelector(
    (rootState: RootState) => rootState.solver.solverConfig,
  );
  const solverState = useAppSelector(
    (rootState: RootState) => rootState.solver.solverState,
  );
  const solverProgress = useAppSelector(
    (state: RootState) => state.solver.solverProgress,
  );

  useEffect(() => {
    if (solverState == SolverState.RUNNING) {
      setTimeout(() => {
        const maxSeconds =
          solverConfig.maxSecondsPerSolution * solverConfig.numberOfSolutions;
        const newProgress = solverProgress + 100 / maxSeconds;
        if (newProgress < 100) {
          dispatch(solverSlice.actions.setSolverProgress(newProgress), [
            dispatch,
            newProgress,
          ]);
        }
      }, 1000);
    } else {
      dispatch(solverSlice.actions.setSolverProgress(0), [dispatch]);
    }
  }, [dispatch, solverProgress, solverState]);

  const challenge = useAppSelector(
    (state: RootState) => state.solver.challenge,
  );
  const solverPlayerCards = useAppSelector(selectSolverPlayerCards);
  const isSolverRunning = useAppSelector(
    (rootState: RootState) =>
      rootState.solver.solverState == SolverState.RUNNING,
  );

  const cancelSolver = useCallback(() => {
    worker.terminate();
    worker = new Worker();
    dispatch(solverSlice.actions.setSolverResult(null));
  }, [dispatch, solverPlayerCards, solverConfig]);

  const runSolver = useCallback(() => {
    const config = {
      ...default_solver_config,
      n_runs: solverConfig.numberOfSolutions,
      method_params: {
        ...default_solver_config.method_params,
        population_size: solverConfig.populationSize,
        tournament_size: solverConfig.tournamentSize,
        crossover_prob: solverConfig.crossoverProbability,
        mutation_prob: solverConfig.mutationProbability,
        stop_criterion: {
          max_time_in_seconds: solverConfig.maxSecondsPerSolution,
        },
      },
    };

    if (appSettings.isAttachedAsChromeExtension) {
      chrome.runtime.sendMessage(
        chrome.runtime.id,
        {
          message_type: "FUT_WEB_APP_SOLVE",
          data: {
            challenge: challenge,
            clubPlayerCards: solverPlayerCards,
            solverConfig: config,
          },
        },
        function (response) {
          {
            const { solverResult } = response;
            dispatch(solverSlice.actions.setSolverResult(solverResult));
          }
        },
      );
    } else {
      worker.addEventListener("message", (e) => {
        const { solverResult } = e.data;
        console.log(solverResult);
        dispatch(solverSlice.actions.setSolverResult(solverResult));
      });
      worker.addEventListener("error", (e) => {
        console.log(e);
      });
      worker.postMessage({
        challenge: challenge,
        clubPlayerCards: solverPlayerCards,
        solverConfig: config,
      });
    }
    dispatch(solverSlice.actions.setSolverStateRunning());
  }, [dispatch, solverPlayerCards, solverConfig]);

  return {
    runSolver,
    cancelSolver,
    isSolverRunning,
    solverProgress,
  };
};
