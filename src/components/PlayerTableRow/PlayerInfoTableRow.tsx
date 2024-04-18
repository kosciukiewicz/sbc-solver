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
    <div className="grid min-w-64 gap-0 text-start text-tiny">
      <span className="font-bold">{playerCard.name}</span>
      <div className="flex gap-2">
        <Tooltip
          className="text-gray-700"
          content={getNationalityFullName(playerCard.nationality)}
        >
          <span>{getNationalityAbbreviation(playerCard.nationality)}</span>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip
          className="text-gray-700"
          content={getLeagueFullName(playerCard.league)}
        >
          <span>{getLeagueAbbreviation(playerCard.league)}</span>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip
          className="text-gray-700"
          content={getTeamFullName(playerCard.team)}
        >
          <span>{getTeamAbbreviation(playerCard.team)}</span>
        </Tooltip>
      </div>
    </div>
  );
};
