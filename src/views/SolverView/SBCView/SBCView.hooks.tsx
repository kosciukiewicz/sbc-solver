import {
  selectSortedChallangeRequirements,
  selectIsChallangeImported,
  selectNotImplementedRequirementsCount,
} from "../../../store/slices/solver/solver.selectors";
import { RootState, useAppSelector } from "../../../store/store";

export const useSBCView = () => {
  const challenge = useAppSelector(
    (state: RootState) => state.solver.challenge,
  );
  const isChallangeImported = useAppSelector(selectIsChallangeImported);
  const notImplementedRequirementsCount = useAppSelector(
    selectNotImplementedRequirementsCount,
  );
  const challangeRequirements = useAppSelector(
    selectSortedChallangeRequirements,
  );

  return {
    challenge,
    isChallangeImported,
    notImplementedRequirementsCount,
    challangeRequirements,
  };
};
