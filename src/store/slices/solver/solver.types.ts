import {
  ClubPlayers,
  SolverConfig,
  SolverResult,
  SquadBuildingChallenge,
} from "../../../data/interfaces";

export enum SolverState {
  NOT_STARTED = 0,
  RUNNING = 1,
  FINISHED = 2,
}

export type SolverSliceState = {
  clubPlayers: ClubPlayers | null;
  ignoredClubPlayerCardsIds: number[];
  challenge: SquadBuildingChallenge | null;
  solverConfig: SolverConfig;
  solverState: SolverState;
  solverResult: SolverResult | null;
  solverProgress: number;
};
