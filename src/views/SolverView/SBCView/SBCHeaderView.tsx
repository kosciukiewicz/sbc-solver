import { Chip } from "@nextui-org/react";
import { useSBCView } from "./SBCView.hooks";

const SBCHeaderView: React.FC = () => {
  const {
    challangeName,
    challangeRequirements,
    notImplementedRequirementsCount,
    isChallangeImported,
  } = useSBCView();
  return (
    <div className="flex items-center gap-2">
      <span className="self-end text-xl font-semibold">SBC</span>
      {isChallangeImported ? (
        <>
          <Chip variant="solid" color="primary" size="sm">
            {challangeName}
          </Chip>
          <Chip variant="solid" color="success" size="sm">
            Supported requirements: {challangeRequirements.length}
          </Chip>
          <Chip variant="solid" color="warning" size="sm">
            Not implemented requirements: {notImplementedRequirementsCount}
          </Chip>
        </>
      ) : (
        <Chip variant="solid" color="danger" size="sm">
          Not imported
        </Chip>
      )}
    </div>
  );
};

export default SBCHeaderView;
