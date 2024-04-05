import { connect } from "react-redux";
import { ClubPlayers } from "../../../data/interfaces";
import { RootState } from "../../../store/store";
import { Button, Chip } from "@nextui-org/react";
import { AiOutlineDownload } from "react-icons/ai";
import { appSettings } from "../../../config/appConfig";

interface PlayersProps {
  clubPlayers: ClubPlayers | null;
  ignoredClubPlayerCardsIds: number[];
}

const downloadPlayers = (clubPLayers: ClubPlayers) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(clubPLayers.club_players_cards),
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "club_players.json";

  link.click();
};

const PlayersHeaderView: React.FC<PlayersProps> = (props) => {
  const { clubPlayers } = props;
  console.log((appSettings.advancedMode as boolean) == false);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-semibold">Players</span>
      {clubPlayers != null ? (
        <>
          {appSettings.advancedMode ? (
            <Button
              isIconOnly
              color="primary"
              size="sm"
              onClick={() => downloadPlayers(clubPlayers)}
            >
              {" "}
              <AiOutlineDownload className="text-large" />
            </Button>
          ) : null}
          <Chip variant="solid" color="primary" size="sm">
            Last import: {new Date(clubPlayers.timestamp).toLocaleString()}
          </Chip>
          <Chip variant="solid" color="success" size="sm">
            Players: {clubPlayers.club_players_cards.length}
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
