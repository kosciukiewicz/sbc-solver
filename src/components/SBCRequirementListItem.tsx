import { ChallengeRequirement } from "../data/interfaces";
import SBCRequirementDescription from "./SBCRequirementDescription";

interface SBCRequirementListItemProps {
  requirement: ChallengeRequirement;
}

const SBCRequirementListItem: React.FC<SBCRequirementListItemProps> = (
  props,
) => {
  return (
    <div className="pl-3 pr-3">
      <div className="my-4 flex gap-x-2">
        <a className="font-semibold text-foreground-500">
          {props.requirement.slot}.{" "}
        </a>{" "}
        <SBCRequirementDescription requirement={props.requirement} />
      </div>
    </div>
  );
};

export default SBCRequirementListItem;
