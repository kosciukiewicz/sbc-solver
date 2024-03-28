import club_players from "./mockData/club_players.json";
import sbc_problem from "./mockData/challenges/17.json";
import raw_formations_data from "./../assets/formations.json";
import {
  SquadBuildingChallenge,
  ClubPlayerCard,
  ClubPlayers,
} from "./interfaces";
import init, {
  read_raw_club_players,
  read_raw_challenge,
} from "sbc_solver_engine";
import { DataProvider, appSettings } from "../config/appConfig";

export function getFormationPositions(formationName: string): string[] {
  const positionsData = raw_formations_data["positionData"].reduce(
    (
      data: { [index: number]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
      current,
    ) => {
      data[current.uniqueId] = current;
      return data;
    },
    {},
  );
  const formationData = raw_formations_data["formationData"].filter(
    (formation) => formation["name"] == formationName,
  )[0];

  return formationData.uniquePositionSlots.map(
    (uniqueId) => positionsData[uniqueId]["typeName"],
  );
}

export function getClubPlayers(): Promise<ClubPlayers | null> {
  if (appSettings.dataProvider == DataProvider.Mock) {
    return getMockClubPlayers();
  } else {
    return getExtensionSavedClubPlayers();
  }
}

export function getChallenge(): Promise<SquadBuildingChallenge | null> {
  if (appSettings.dataProvider == DataProvider.Mock) {
    return getMockChallenge();
  } else {
    return getExtensionSavedChallenge();
  }
}

export function getIgnoredClubPlayerCardsIds(): Promise<number[]> {
  return init().then(() => {
    const raw_ignored_ids: string | null = sessionStorage.getItem(
      "IGNORED_CLUB_PLAYER_CARD_IDS",
    );

    if (raw_ignored_ids) {
      const ignoredClubPlayerCardsIds: number[] = JSON.parse(raw_ignored_ids);
      return ignoredClubPlayerCardsIds;
    } else {
      return [];
    }
  });
}

function getExtensionSavedClubPlayers(): Promise<ClubPlayers | null> {
  return init().then(() => {
    const raw_club_players_string: string | null =
      sessionStorage.getItem("CLUB_PLAYERS");

    if (raw_club_players_string) {
      let raw_club_players = JSON.parse(raw_club_players_string);
      raw_club_players = raw_club_players.club_players.filter(
        (raw_club_player: any) => !("loans" in raw_club_player), // eslint-disable-line @typescript-eslint/no-explicit-any
      );
      const club_players: ClubPlayerCard[] = JSON.parse(
        read_raw_club_players(JSON.stringify(raw_club_players)),
      );
      return {
        club_players_cards: club_players,
        id: raw_club_players["id"],
        timestamp: raw_club_players["timestamp"],
      };
    } else {
      return null;
    }
  });
}

function getExtensionSavedChallenge(): Promise<SquadBuildingChallenge | null> {
  return init().then(() => {
    const challenge_string = sessionStorage.getItem("CHALLENGE_SQUAD");
    if (challenge_string) {
      const challenge: SquadBuildingChallenge = JSON.parse(
        read_raw_challenge(challenge_string),
      );
      return challenge;
    } else {
      return null;
    }
  });
}

function getMockClubPlayers(): Promise<ClubPlayers> {
  return new Promise<ClubPlayers>((resolve) =>
    resolve({
      club_players_cards: club_players as ClubPlayerCard[],
      id: "mockId",
      timestamp: Date.now(),
    }),
  );
}

function getMockChallenge(): Promise<SquadBuildingChallenge> {
  return init().then(() => {
    const challenge: SquadBuildingChallenge = JSON.parse(
      JSON.stringify(sbc_problem),
    );
    return challenge;
  });
}
