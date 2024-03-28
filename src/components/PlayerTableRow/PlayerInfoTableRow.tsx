import { Divider, Tooltip } from "@nextui-org/react";
import { ClubPlayerCard } from "../../data/interfaces";
import {
  getLeagueAbbreviation,
  getLeagueFullName,
  getNationalityAbbreviation,
  getNationalityFullName,
  getTeamAbbreviation,
  getTeamFullName,
} from "../../data/translations";

interface PlayerInfoTableRowProps {
  playerCard: ClubPlayerCard;
}

export const PlayerInfoTableRow: React.FC<PlayerInfoTableRowProps> = (
  props,
) => {
  const { playerCard } = props;
  return (
    <div className="grid gap-0 text-start text-small">
      <span className="text-base">{playerCard.name}</span>
      <div className="flex gap-2 text-tiny">
        <Tooltip content={getNationalityFullName(playerCard)}>
          <span>{getNationalityAbbreviation(playerCard)}</span>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip content={getLeagueFullName(playerCard)}>
          <span>{getLeagueAbbreviation(playerCard)}</span>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip content={getTeamFullName(playerCard)}>
          <span>{getTeamAbbreviation(playerCard)}</span>
        </Tooltip>
      </div>
    </div>
  );
};
