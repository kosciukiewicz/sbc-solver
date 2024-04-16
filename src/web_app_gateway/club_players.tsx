import { DataProvider, appSettings } from "../config/appConfig";
import club_players from "../data/mockData/club_players.json";
import sbc_problem from "../data/mockData/challenges/17.json";
import {
  ClubPlayerCard,
  ClubPlayers,
  RawClubPlayerCard,
  SolverResult,
  SquadBuildingChallenge,
} from "../data/interfaces";
import { hashCode } from "../utils";
import {
  read_raw_challenge,
  read_raw_club_players,
} from "@kosciukiewicz/sbc_solver_engine";

export const initializeWebAppGateway = (
  onClubPlayersImported: (clubPlayers: ClubPlayers) => void,
  onChallengeImported: (challenge: SquadBuildingChallenge) => void,
  onChallangeSolved: (solverResult: SolverResult) => void,
) => {
  if (appSettings.dataProvider == DataProvider.Mock) {
    return addMockListeners(onClubPlayersImported, onChallengeImported);
  } else {
    if (chrome?.runtime !== undefined) {
      addListeners(
        onClubPlayersImported,
        onChallengeImported,
        onChallangeSolved,
      );
      chrome.runtime.sendMessage(chrome.runtime.id, {
        message_type: "START_DEBUGING",
        data: {},
      });
    } else {
      console.log("Chrome runtime unavailable");
    }
  }
};

const addMockListeners = (
  onClubPlayersImported: (clubPlayers: ClubPlayers) => void,
  onChallengeImported: (challenge: SquadBuildingChallenge) => void,
) => {
  onClubPlayersImported({
    club_players_cards: club_players as ClubPlayerCard[],
    id: "mockId",
    timestamp: Date.now(),
  });
  onChallengeImported(JSON.parse(JSON.stringify(sbc_problem)));
};

const addListeners = (
  onClubPlayersImported: (clubPlayers: ClubPlayers) => void,
  onChallengeImported: (challenge: SquadBuildingChallenge) => void,
  onChallangeSolved: (solverResult: SolverResult) => void,
) => {
  const handleMessage = (
    request: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    sender: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    sendResponse: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    console.log(request);
    if (request.message_type == "FUT_WEB_APP_SOLVER_RESULT") {
      onChallangeSolved(request.data.solverResult);
    } else {
      handleDataMessage(
        request,
        sender,
        sendResponse,
        onClubPlayersImported,
        onChallengeImported,
      );
    }
  };

  if (!chrome.runtime.onMessage.hasListeners()) {
    chrome.runtime.onMessage.addListener(handleMessage);
  }
};

const handleDataMessage = (
  request: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  sender: any, // eslint-disable-line
  sendResponse: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  onClubPlayersImported: (clubPlayers: ClubPlayers) => void,
  onChallengeImported: (challenge: SquadBuildingChallenge) => void,
) => {
  if (request.message_type != "FUT_WEB_APP_RESPONSE_BODY") {
    return;
  }

  const parsedData = JSON.parse(request.data.response_body);
  let challenges: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (request.data.url.includes("ut/game/fc24/club/stats/club")) {
    const expectedClubPlayersCount = parsedData.stat.filter(
      (d: { [key: string]: string }) => d.type == "players",
    )[0].typeValue;
    sessionStorage.setItem(
      "expected_club_players_count",
      expectedClubPlayersCount,
    );
    sessionStorage.removeItem("club_players");
    sessionStorage.removeItem("club_players_count");
  } else if (request.data.url.includes("ut/game/fc24/club")) {
    const rawClubPlayers = sessionStorage.getItem("club_players");
    let clubPlayers: RawClubPlayerCard[];

    if (rawClubPlayers) {
      clubPlayers = JSON.parse(rawClubPlayers);
      clubPlayers = clubPlayers.concat(parsedData.itemData);
    } else {
      clubPlayers = parsedData.itemData;
    }

    console.log(clubPlayers);
    sessionStorage.setItem("club_players", JSON.stringify(clubPlayers));
    sessionStorage.setItem("club_players_count", clubPlayers.length.toString());

    if (
      clubPlayers.length ==
      Number(sessionStorage.getItem("expected_club_players_count"))
    ) {
      setClubPlayers(
        clubPlayers,
        Date.now(),
        hashCode(JSON.stringify(clubPlayers)) + "",
        onClubPlayersImported,
      );
    }
  } else if (
    request.data.url.includes("ut/game/fc24/sbs") &&
    request.data.url.includes("challenges")
  ) {
    challenges = parsedData.challenges;
    sessionStorage.setItem("challenges", JSON.stringify(challenges));
  } else if (request.data.url.includes("ut/game/fc24/sbs/challenge")) {
    const rawChallenges = sessionStorage.getItem("challenges");
    if (parsedData.challengeId && rawChallenges) {
      challenges = JSON.parse(rawChallenges);
      const challenge = challenges.filter(
        (c) => c.challengeId.toString() == parsedData.challengeId.toString(),
      )[0];
      challenge["challengeSquad"] = parsedData;
      setChallange(challenge, parsedData, onChallengeImported);
    }
  }
  sendResponse({ status: 0 });
};

const setClubPlayers = (
  clubPlayers: { [key: string]: any }[], // eslint-disable-line @typescript-eslint/no-explicit-any
  timestamp: number,
  id: string,
  onClubPlayersImported: (clubPlayers: ClubPlayers) => void,
) => {
  const filteredClubPlayers = clubPlayers.filter(
    (raw_club_player: any) => !("loans" in raw_club_player), // eslint-disable-line @typescript-eslint/no-explicit-any
  );
  const parsedClubPlayers: ClubPlayerCard[] = JSON.parse(
    read_raw_club_players(JSON.stringify(filteredClubPlayers)),
  );
  onClubPlayersImported({
    club_players_cards: parsedClubPlayers,
    id: id,
    timestamp: timestamp,
  });
};

const setChallange = (
  readChallange: { [key: string]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
  squad: { [key: string]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
  onChallengeImported: (challenge: SquadBuildingChallenge) => void,
) => {
  const challenge_string = JSON.stringify({
    challenge: readChallange,
    squad: squad,
  });
  const challenge: SquadBuildingChallenge = JSON.parse(
    read_raw_challenge(challenge_string),
  );
  onChallengeImported(challenge);
};
