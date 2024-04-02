import { connect } from "react-redux";
import {
  CardQuality,
  ClubPlayerCard,
  ClubPlayers,
} from "../../../data/interfaces";
import { RootState } from "../../../store/store";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { Key } from "react";
import { PlayerInfoTableRow } from "../../../components/PlayerTableRow/PlayerInfoTableRow";
import { PlayerActionsTableRow } from "../../../components/PlayerTableRow/PlayerActionsTableRow";
import {
  getCardLevelFullName,
  getCardRarityTypeFullName,
} from "../../../data/translations";

const columns = [
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
  {
    key: "actions",
    label: "Actions",
  },
];

interface PlayersProps {
  clubPlayers: ClubPlayers | null;
  ignoredClubPlayerCardsIds: number[];
}

const PlayersView: React.FC<PlayersProps> = (props) => {
  if (props.clubPlayers === null) {
    <div className="m-4 inline-block flex items-center text-center align-middle leading-10 ">
      No players
    </div>;
  }

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(
    props.clubPlayers!.club_players_cards.length / rowsPerPage,
  );

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return props.clubPlayers!.club_players_cards.slice(start, end);
  }, [page, props.clubPlayers!.club_players_cards]);

  const renderCell = React.useCallback(
    (playerCard: ClubPlayerCard, columnKey: Key) => {
      const columnKeyTyped = columnKey as keyof typeof playerCard;
      const cellValue = playerCard[columnKeyTyped];
      let quality: string;
      switch (columnKey) {
        case "player_info":
          return <PlayerInfoTableRow playerCard={playerCard} />;
        case "actions":
          return <PlayerActionsTableRow playerCard={playerCard} />;
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
            <Tooltip content={quality}>
              <span className="... truncate">{quality}</span>
            </Tooltip>
          );
        default:
          return <span>{cellValue}</span>;
      }
    },
    [],
  );

  return (
    <Table
      classNames={{
        wrapper: ["bg-zinc-900"],
      }}
      aria-label="Imported club players cards"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn className="text-center" key={column.key}>
            {column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {items.map((row) => (
          <TableRow key={row.id}>
            {(columnKey) => (
              <TableCell className="text-center">
                {renderCell(row, columnKey)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    clubPlayers: state.solver.clubPlayers,
    ignoredClubPlayerCardsIds: state.solver.ignoredClubPlayerCardsIds,
  };
};

export default connect(mapStateToProps)(PlayersView);
