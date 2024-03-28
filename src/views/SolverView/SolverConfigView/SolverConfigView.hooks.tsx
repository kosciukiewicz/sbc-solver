import { useCallback } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { solverSlice } from "../../../store/slices/solver/solver.slice";

export const useSolverConfigView = () => {
  const dispatch = useAppDispatch();

  const solverConfig = useAppSelector(
    (rootState: RootState) => rootState.solver.solverConfig,
  );

  const setNumberOfSolutions = useCallback(
    (numberOfSolutions: number | number[]) => {
      if (Number(numberOfSolutions)) {
        dispatch(
          solverSlice.actions.setSolverConfig({
            ...solverConfig,
            numberOfSolutions: Number(numberOfSolutions),
          }),
        );
      }
    },
    [dispatch, solverConfig],
  );

  const setMaxSecondsPerSolution = useCallback(
    (maxSecondsPerSolution: number | number[]) => {
      if (Number(maxSecondsPerSolution)) {
        dispatch(
          solverSlice.actions.setSolverConfig({
            ...solverConfig,
            maxSecondsPerSolution: Number(maxSecondsPerSolution),
          }),
        );
      }
    },
    [dispatch, solverConfig],
  );

  return {
    solverConfig,
    setNumberOfSolutions,
    setMaxSecondsPerSolution,
  };
};
