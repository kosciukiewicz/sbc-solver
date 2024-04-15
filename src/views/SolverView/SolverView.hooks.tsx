import { useCallback, useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getIgnoredClubPlayerCardsIds } from "../../data/dataProvider";
import { solverSlice } from "../../store/slices/solver/solver.slice";
import { initializeWebAppGateway } from "../../web_app_gateway/club_players";
import {
  ClubPlayers,
  SolverResult,
  SquadBuildingChallenge,
} from "../../data/interfaces";

export const useSolverView = () => {
  const dispatch = useAppDispatch();
  const initializeResult = useInitializeSolver();
  useEffect(() => {
    initializeResult();
  }, [dispatch]);

  const clubPlayers = useAppSelector(
    (rootState: RootState) => rootState.solver.clubPlayers,
  );
  const challange = useAppSelector(
    (rootState: RootState) => rootState.solver.challenge,
  );
  const solverResult = useAppSelector(
    (rootState: RootState) => rootState.solver.solverResult,
  );
  const isSolverOpen = useAppSelector(
    (rootState: RootState) => rootState.solver.isOpen,
  );
  const setIsSolverOpen = useCallback(
    async (isOpen: boolean) => {
      dispatch(solverSlice.actions.setIsOpen(isOpen));
    },
    [dispatch],
  );

  const disabledKeys = [];

  if (clubPlayers == null) {
    disabledKeys.push("club-players");
  }

  if (challange == null) {
    disabledKeys.push("sbc");
  }

  if (!solverResult) {
    disabledKeys.push("solver-results");
  }

  const clearState = useCallback(() => {
    localStorage.removeItem("CLUB_PLAYERS");
    localStorage.removeItem("SQUAD_BUILDING_CHALLANGE");
    dispatch(solverSlice.actions.resetState());
  }, [dispatch]);

  return {
    disabledKeys,
    isSolverOpen,
    setIsSolverOpen,
    clearState,
  };
};

export const useInitializeSolver = () => {
  const dispatch = useAppDispatch();
  const initializeIgnoredPlayerCards = useInitializeIgnoredPlayerCards();

  useEffect(() => {
    const rawClubPlayers = localStorage.getItem("CLUB_PLAYERS");
    if (rawClubPlayers) {
      dispatch(solverSlice.actions.setClubPlayers(JSON.parse(rawClubPlayers)));
    }

    const rawChallange = localStorage.getItem("SQUAD_BUILDING_CHALLANGE");
    if (rawChallange) {
      dispatch(solverSlice.actions.setChallenge(JSON.parse(rawChallange)));
    }
  }, [dispatch]);

  const setSolverResult = useCallback(
    async (solverResult: SolverResult) => {
      dispatch(solverSlice.actions.setSolverResult(solverResult));
    },
    [dispatch],
  );
  const setClubPlayers = useCallback(
    async (clubPlayers: ClubPlayers) => {
      localStorage.setItem("CLUB_PLAYERS", JSON.stringify(clubPlayers));
      dispatch(solverSlice.actions.setClubPlayers(clubPlayers));
    },
    [dispatch],
  );
  const setChallange = useCallback(
    async (challange: SquadBuildingChallenge) => {
      localStorage.setItem(
        "SQUAD_BUILDING_CHALLANGE",
        JSON.stringify(challange),
      );
      dispatch(solverSlice.actions.setChallenge(challange));
    },
    [dispatch],
  );

  const initializeSolver = useCallback(async () => {
    initializeWebAppGateway(setClubPlayers, setChallange, setSolverResult);
    initializeIgnoredPlayerCards();
  }, [dispatch]);

  return initializeSolver;
};

const useInitializeIgnoredPlayerCards = () => {
  const dispatch = useAppDispatch();
  const initializeIgnoredPlayerCards = useCallback(async () => {
    const ignoredPlayerCards = await getIgnoredClubPlayerCardsIds();
    dispatch(
      solverSlice.actions.setIgnoredClubPlayerCardsIds(ignoredPlayerCards),
    );
  }, [dispatch]);

  return initializeIgnoredPlayerCards;
};
