import {
  selectChallangeRequirements,
  selectChallengeFormationName,
} from "../../../store/slices/solver/solver.selectors";
import { RootState, useAppSelector } from "../../../store/store";

export const useResultsView = () => {
  const solverResult = useAppSelector(
    (rootState: RootState) => rootState.solver.solverResult,
  );
  const challengeFormationName = useAppSelector(selectChallengeFormationName);
  const challangeRequirements = useAppSelector(selectChallangeRequirements);
  return {
    solverResult,
    challengeFormationName,
    challangeRequirements,
  };
};
