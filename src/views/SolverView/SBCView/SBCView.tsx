import SBCRequirementListItem from "../../../components/SBCRequirementListItem";
import { useSBCView } from "./SBCView.hooks";

const SBCView: React.FC = () => {
  const { challangeName, challangeRequirements, isChallangeImported } =
    useSBCView();

  if (!isChallangeImported) {
    return (
      <div className="m-4 inline-block flex items-center text-center align-middle leading-10 ">
        No SBC imported
      </div>
    );
  }

  return (
    <div className="rounded-large	bg-zinc-900 p-4">
      <div className="rounded-small bg-zinc-800 p-2">
        <a className="ml-6 text-small font-semibold text-foreground-500">
          {challangeName}
        </a>
      </div>
      {challangeRequirements.map((requirement) => (
        <SBCRequirementListItem
          key={requirement.slot}
          requirement={requirement}
        />
      ))}
    </div>
  );
};

export default SBCView;
