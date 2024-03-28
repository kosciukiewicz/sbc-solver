import { RootState, useAppSelector } from "../../../store/store";

export const useResultsView = () => {
  const solverResult = useAppSelector(
    (rootState: RootState) => rootState.solver.solverResult,
  );

  return {
    solverResult,
  };
};
