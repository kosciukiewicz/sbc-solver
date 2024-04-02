import { connect } from "react-redux";
import { ClubPlayers } from "../../../data/interfaces";
import { RootState } from "../../../store/store";
import { Chip } from "@nextui-org/react";

interface PlayersProps {
  clubPlayers: ClubPlayers | null;
  ignoredClubPlayerCardsIds: number[];
}

const PlayersHeaderView: React.FC<PlayersProps> = (props) => {
  if (props.clubPlayers === null) {
    return (
      <div className="m-4 inline-block flex items-center text-center align-middle leading-10 ">
        No players
      </div>
    );
  }

  const date = new Date(props.clubPlayers!.timestamp);
  return (
    <div className="inline items-center gap-4">
      <span className="text-xl font-semibold">Players</span>
      <Chip variant="solid" color="primary" size="sm" className="ml-2">
        Last import: {date.toLocaleString()}
      </Chip>
      <Chip variant="solid" color="success" size="sm" className="ml-2">
        Players: {props.clubPlayers?.club_players_cards.length}
      </Chip>
      <Chip variant="solid" color="warning" size="sm" className="ml-2">
        Ignored: {props.ignoredClubPlayerCardsIds.length}
      </Chip>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    clubPlayers: state.solver.clubPlayers,
    ignoredClubPlayerCardsIds: state.solver.ignoredClubPlayerCardsIds,
  };
};

export default connect(mapStateToProps)(PlayersHeaderView);
