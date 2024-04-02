import { connect } from "react-redux";
import { ClubPlayers } from "../../../data/interfaces";
import { RootState } from "../../../store/store";
import { Chip } from "@nextui-org/react";

interface PlayersProps {
  clubPlayers: ClubPlayers | null;
  ignoredClubPlayerCardsIds: number[];
}

const PlayersHeaderView: React.FC<PlayersProps> = (props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-semibold">Players</span>
      {props.clubPlayers != null ? (
        <>
          <Chip variant="solid" color="primary" size="sm">
            Last import:{" "}
            {new Date(props.clubPlayers?.timestamp).toLocaleString()}
          </Chip>
          <Chip variant="solid" color="success" size="sm">
            Players: {props.clubPlayers?.club_players_cards.length}
          </Chip>
          <Chip variant="solid" color="warning" size="sm">
            Ignored: {props.ignoredClubPlayerCardsIds.length}
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

const mapStateToProps = (state: RootState) => {
  return {
    clubPlayers: state.solver.clubPlayers,
    ignoredClubPlayerCardsIds: state.solver.ignoredClubPlayerCardsIds,
  };
};

export default connect(mapStateToProps)(PlayersHeaderView);
