import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  SquadBuildingChallenge,
  SolverResult,
  ClubPlayers,
  ClubPlayerCard,
  SolverConfig,
} from "../../../data/interfaces";
import { SolverSliceState, SolverState } from "./solver.types";

const defaultSolverConfig: SolverConfig = {
  maxSecondsPerSolution: 4,
  numberOfSolutions: 2,
  populationSize: 100,
  tournamentSize: 3,
  crossoverProbability: 0.6,
  mutationProbability: 0.02,
};

const initialState: SolverSliceState = {
  clubPlayers: null,
  ignoredClubPlayerCardsIds: [],
  challenge: null,
  solverConfig: defaultSolverConfig,
  solverState: SolverState.NOT_STARTED,
  solverResult: null,
  solverProgress: 0,
};

export const solverSlice = createSlice({
  name: "SolverSlice",
  initialState,
  reducers: {
    setClubPlayers: (state, action: PayloadAction<ClubPlayers | null>) => {
      if (action.payload != null) {
        let playerCards: ClubPlayerCard[] = Object.assign(
          [],
          action.payload.club_players_cards,
        );
        playerCards = playerCards.sort((req1, req2) => {
          return req1.overall > req2.overall ? -1 : 1;
        });
        action.payload.club_players_cards = playerCards;
      }

      return {
        ...state,
        clubPlayers: action.payload,
      };
    },
    setChallenge: (
      state,
      action: PayloadAction<SquadBuildingChallenge | null>,
    ) => {
      return {
        ...state,
        challenge: action.payload,
      };
    },
    setIgnoredClubPlayerCardsIds: (state, action: PayloadAction<number[]>) => {
      return {
        ...state,
        ignoredClubPlayerCardsIds: action.payload,
      };
    },
    setSolverConfig: (state, action: PayloadAction<SolverConfig>) => {
      return {
        ...state,
        solverConfig: action.payload,
      };
    },
    setSolverStateRunning: (state) => {
      return {
        ...state,
        solverState: SolverState.RUNNING,
        solverResult: null,
      };
    },
    setSolverResult: (state, action: PayloadAction<SolverResult | null>) => {
      return {
        ...state,
        solverState: SolverState.FINISHED,
        solverResult: action.payload,
        solverProgress: 100,
      };
    },
    setSolverProgress: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        solverProgress: action.payload,
      };
    },
    resetState: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
    handleIgnoreClubPlayerCard: (
      state,
      action: PayloadAction<ClubPlayerCard>,
    ) => {
      const { ignoredClubPlayerCardsIds } = state;
      const clubPlayerCard: ClubPlayerCard = action.payload;
      sessionStorage.setItem(
        "IGNORED_CLUB_PLAYER_CARD_IDS",
        JSON.stringify(ignoredClubPlayerCardsIds),
      );

      if (ignoredClubPlayerCardsIds.includes(clubPlayerCard.asset_id)) {
        const index = ignoredClubPlayerCardsIds.indexOf(
          clubPlayerCard.asset_id,
        );
        ignoredClubPlayerCardsIds.splice(index, 1);
      } else {
        ignoredClubPlayerCardsIds.push(clubPlayerCard.asset_id);
      }
    },
  },
});
