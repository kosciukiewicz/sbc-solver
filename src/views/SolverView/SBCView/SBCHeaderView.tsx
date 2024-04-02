import { Chip } from "@nextui-org/react";
import { useSBCView } from "./SBCView.hooks";

const SBCHeaderView: React.FC = () => {
  const {
    challangeName,
    challangeRequirements,
    notImplementedRequirementsCount,
    isChallangeImported,
  } = useSBCView();

  if (!isChallangeImported) {
    return (
      <div className="m-4 inline-block flex items-center text-center align-middle leading-10 ">
        No SBC imported
      </div>
    );
  }

  return (
    <div className="inline items-center gap-4">
      <span className="text-xl font-semibold">SBC</span>{" "}
      <Chip variant="solid" color="primary" size="sm" className="ml-2">
        {challangeName}
      </Chip>
      <Chip variant="solid" color="success" size="sm" className="ml-2">
        Supported requirements: {challangeRequirements.length}
      </Chip>
      <Chip variant="solid" color="warning" size="sm" className="ml-2">
        Not implemented requirements: {notImplementedRequirementsCount}
      </Chip>
    </div>
  );
};

export default SBCHeaderView;
