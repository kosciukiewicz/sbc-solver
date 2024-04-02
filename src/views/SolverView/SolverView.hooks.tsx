import { useCallback, useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import {
  getChallenge,
  getClubPlayers,
  getIgnoredClubPlayerCardsIds,
} from "../../data/dataProvider";
import { solverSlice } from "../../store/slices/solver/solver.slice";

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

  return {
    disabledKeys,
  };
};

export const useInitializeSolver = () => {
  const dispatch = useAppDispatch();
  const initializePlayers = useInitializeClubPlayers();
  const initializeSBC = useInitializeSBC();
  const initializeIgnoredPlayerCards = useInitializeIgnoredPlayerCards();

  const initializeSolver = useCallback(async () => {
    initializePlayers();
    initializeSBC();
    initializeIgnoredPlayerCards();
  }, [dispatch]);

  return initializeSolver;
};

const useInitializeClubPlayers = () => {
  const dispatch = useAppDispatch();
  const initializePlayers = useCallback(async () => {
    const clubPlayers = await getClubPlayers();
    dispatch(solverSlice.actions.setClubPlayers(clubPlayers));
  }, [dispatch]);

  return initializePlayers;
};

const useInitializeSBC = () => {
  const dispatch = useAppDispatch();
  const initializeSBC = useCallback(async () => {
    const squadBuildingChallange = await getChallenge();
    dispatch(solverSlice.actions.setChallenge(squadBuildingChallange));
  }, [dispatch]);

  return initializeSBC;
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
