import { Button, Chip } from "@nextui-org/react";
import { useSBCView } from "./SBCView.hooks";
import { SquadBuildingChallenge } from "../../../data/interfaces";
import { AiOutlineDownload } from "react-icons/ai";
import { appConfig } from "../../../config";

const downloadChallenge = (challenge: SquadBuildingChallenge) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(challenge),
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "sbc.json";

  link.click();
};

const SBCHeaderView: React.FC = () => {
  const {
    challenge,
    challangeRequirements,
    notImplementedRequirementsCount,
    isChallangeImported,
  } = useSBCView();
  return (
    <div className="flex items-center gap-2">
      <span className="self-end text-xl font-semibold">SBC</span>
      {isChallangeImported ? (
        <>
          {appConfig.advancedMode ? (
            <Button
              isIconOnly
              color="primary"
              size="sm"
              onClick={() => downloadChallenge(challenge!)}
            >
              <AiOutlineDownload className="text-large" />
            </Button>
          ) : null}
          <Chip variant="solid" color="primary" size="sm">
            {challenge?.name}
          </Chip>
          <Chip variant="solid" color="success" size="sm">
            Supported requirements:{" "}
            {challangeRequirements.length - notImplementedRequirementsCount}
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
