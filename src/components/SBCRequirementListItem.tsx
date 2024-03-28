import {
  ChallengeRequirement,
  ChallengeRequirementType,
} from "../data/interfaces";

const SCOPE_NAME_DESCRIPTIONS: { [name: string]: string } = {
  MORE: "min.",
  LESS: "max.",
  SAME: "exactly",
};

const TYPE_NAME_DESCRIPTIONS: { [name: string]: string } = {
  PlayerCountRequirement: "Player Count of Type",
  PlayerQualityRequirement: "Player Quality",
  OverallRequirement: "Squad rating",
  ChemistryRequirement: "Squad chemistry points",
  LeagueCountRequirement: "Leagues",
  ClubCountRequirement: "Clubs",
  NationCountRequirement: "Nationalities",
  SameNationCountRequirement: "Same Nation Count",
  SameClubCountRequirement: "Same Club Count",
  SameLeagueCountRequirement: "Same League Count",
  PlayersChemistryPointsRequirement: "Chemistry points on Each Player",
};

interface SBCViewProps {
  requirement: ChallengeRequirement;
}

const SBCRequirementListItem: React.FC<SBCViewProps> = (props) => {
  let description =
    TYPE_NAME_DESCRIPTIONS[props.requirement.challenge_type_name];

  if (description === undefined) {
    description = props.requirement.challenge_type_name;
  }

  let value;
  switch (props.requirement.challenge_type_name) {
    case ChallengeRequirementType.OverallRequirement:
      value = props.requirement.overall_value;
      break;
    case ChallengeRequirementType.ChemistryRequirement:
      value = props.requirement.chemistry_value;
      break;
    case ChallengeRequirementType.PlayersChemistryPointsRequirement:
      value = props.requirement.chemistry_value;
      break;
    case ChallengeRequirementType.PlayerQualityRequirement:
      value = props.requirement.player_quality;
      break;
    default:
      value = props.requirement.count;
  }

  return (
    <div className="pl-3 pr-3">
      <div className="my-4 flex gap-x-2">
        <a className="font-semibold text-foreground-500">
          {props.requirement.slot}.{" "}
        </a>{" "}
        <div className="text-foreground">
          <a>
            {description} {SCOPE_NAME_DESCRIPTIONS[props.requirement.scope]}
          </a>
          <a className="font-semibold"> {value}</a>
        </div>
      </div>
    </div>
  );
};

export default SBCRequirementListItem;
