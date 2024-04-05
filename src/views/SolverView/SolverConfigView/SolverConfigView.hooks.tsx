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

  const setConfigValue = useCallback(
    (paramName: string, value: number | number[]) => {
      if (Number(value)) {
        const newSolverConfig: {
          [k: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
        } = Object.assign([], solverConfig);
        newSolverConfig[paramName] = value;
        dispatch(
          solverSlice.actions.setSolverConfig({
            ...solverConfig,
            ...newSolverConfig,
          }),
        );
      }
    },
    [dispatch, solverConfig],
  );

  return {
    solverConfig,
    setConfigValue,
  };
};
