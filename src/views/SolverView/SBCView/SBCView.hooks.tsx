import {
  selectChallangeName,
  selectSortedChallangeRequirements,
  selectIsChallangeImported,
  selectNotImplementedRequirementsCount,
} from "../../../store/slices/solver/solver.selectors";
import { useAppSelector } from "../../../store/store";

export const useSBCView = () => {
  const isChallangeImported = useAppSelector(selectIsChallangeImported);
  const notImplementedRequirementsCount = useAppSelector(
    selectNotImplementedRequirementsCount,
  );
  const challangeRequirements = useAppSelector(
    selectSortedChallangeRequirements,
  );
  const challangeName = useAppSelector(selectChallangeName);

  return {
    isChallangeImported,
    notImplementedRequirementsCount,
    challangeRequirements,
    challangeName,
  };
};
