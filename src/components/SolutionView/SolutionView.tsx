import {
  Button,
  Card,
  CardBody,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import {
  CardQuality,
  ChallengeRequirement,
  ClubPlayerCard,
  SolverSolution,
} from "../../data/interfaces";
import React, { Key } from "react";
import {
  getCardLevelFullName,
  getCardRarityTypeFullName,
  getLeagueAbbreviation,
  getLeagueFullName,
  getNationalityAbbreviation,
  getNationalityFullName,
  getPositionName,
  getTeamAbbreviation,
  getTeamFullName,
} from "../../data/translations";
import { PlayerInfoTableRow } from "../PlayerTableRow/PlayerInfoTableRow";
import SBCRequirementDescription from "../SBCRequirementDescription";
import { mode } from "../../utils";
import { solve } from "../../web_app_gateway/auto_solver";
import { useAppDispatch } from "../../store/store";
import { solverSlice } from "../../store/slices/solver/solver.slice";

interface SolutionViewProps {
  challengeFormationName: string;
  challangeRequirements: { [name: number]: ChallengeRequirement };
  solution: SolverSolution;
}

const columns = [
  {
    key: "squad_position",
    label: "Squad position",
  },
  {
    key: "player_info",
    label: "Player info",
  },
  {
    key: "overall",
    label: "Overall",
  },
  {
    key: "position",
    label: "Position",
  },
  {
    key: "card_quality",
    label: "Card type",
  },
];

export const SolutionView: React.FC<SolutionViewProps> = (props) => {
  const { challengeFormationName, solution } = props;

  const dispatch = useAppDispatch();
  const useSolution = React.useCallback(async (solution: SolverSolution) => {
    dispatch(solverSlice.actions.setIsOpen(false));
    solve(solution);
  }, []);

  const renderCell = React.useCallback(
    (playerIndex: number, playerCard: ClubPlayerCard, columnKey: Key) => {
      const columnKeyTyped = columnKey as keyof typeof playerCard;
      const cellValue = playerCard[columnKeyTyped];
      let quality: string;
      switch (columnKey) {
        case "squad_position":
          return (
            <span className="... truncate">
              {getPositionName(challengeFormationName, playerIndex)}
            </span>
          );
        case "player_info":
          return <PlayerInfoTableRow playerCard={playerCard} />;
        case "card_quality":
          if (
            playerCard.card_quality == CardQuality.Gold &&
            playerCard.card_subtype_id > 2
          ) {
            quality = getCardRarityTypeFullName(playerCard.card_subtype_id);
          } else {
            quality = getCardLevelFullName(playerCard.card_quality);
          }
          return (
            <Tooltip className="text-gray-700" content={quality}>
              <span className="... truncate">{quality}</span>
            </Tooltip>
          );
        default:
          return <span>{cellValue}</span>;
      }
    },
    [],
  );

  const nationalityMode = mode(
    solution.player_cards.map((player_card) => player_card.nationality),
  );
  const leagueMode = mode(
    solution.player_cards.map((player_card) => player_card.league),
  );
  const teamMode = mode(
    solution.player_cards.map((player_card) => player_card.team),
  );

  return (
    <div className="text-tiny">
      <div className="mb-4 grid grid-cols-2 items-center gap-4">
        <Card>
          <CardBody className="text-center">
            <p className="p-2	text-base">Most frequent:</p>
            <div className="inline items-center gap-4">
              <Chip variant="solid" size="sm" className="ml-2">
                <Tooltip
                  className="text-gray-700"
                  content={getNationalityFullName(nationalityMode!)}
                >
                  <span>
                    Nationality: {getNationalityAbbreviation(nationalityMode!)}
                  </span>
                </Tooltip>
              </Chip>
              <Chip variant="solid" size="sm" className="ml-2">
                <Tooltip
                  className="text-gray-700"
                  content={getLeagueFullName(leagueMode!)}
                >
                  <span>League: {getLeagueAbbreviation(leagueMode!)}</span>
                </Tooltip>
              </Chip>
              <Chip variant="solid" size="sm" className="ml-2">
                <Tooltip
                  className="text-gray-700"
                  content={getTeamFullName(teamMode!)}
                >
                  <span>Team: {getTeamAbbreviation(teamMode!)}</span>
                </Tooltip>
              </Chip>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="p-2 p-2	text-base">Requirements:</p>
            <div className="inline items-center gap-4">
              {solution.requirements.map((requirement) => {
                let color: "success" | "warning" | "danger";
                if (requirement.is_implemented) {
                  if (requirement.is_valid) {
                    color = "success";
                  } else {
                    color = "danger";
                  }
                } else {
                  color = "warning";
                }
                return (
                  <Chip
                    variant="solid"
                    size="sm"
                    className="ml-2"
                    key={requirement.slot}
                    color={color}
                  >
                    <Tooltip
                      className="text-gray-700"
                      content={
                        <SBCRequirementDescription
                          requirement={
                            props.challangeRequirements[requirement.slot]
                          }
                        />
                      }
                    >
                      <span>{requirement.slot}</span>
                    </Tooltip>
                  </Chip>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardBody>
          <Table removeWrapper aria-label="Result player cards">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn className="text-center text-tiny" key={column.key}>
                  {column.label}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {Array.from(Array(solution.player_cards.length).keys()).map(
                (playerCardIndex: number) => (
                  <TableRow key={solution.player_cards[playerCardIndex].id}>
                    {(columnKey) => (
                      <TableCell className="py-1 text-center text-tiny">
                        {renderCell(
                          playerCardIndex,
                          solution.player_cards[playerCardIndex],
                          columnKey,
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Button
        color="primary"
        className="my-4 w-full"
        onClick={() => useSolution(solution)}
      >
        Use this solution
      </Button>
    </div>
  );
};
