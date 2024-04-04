import { useCallback, useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { getIgnoredClubPlayerCardsIds } from "../../data/dataProvider";
import { solverSlice } from "../../store/slices/solver/solver.slice";
import { initializeWebAppGateway } from "../../web_app_gateway/club_players";
import { ClubPlayers, SquadBuildingChallenge } from "../../data/interfaces";

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

  const clearState = useCallback(() => {
    dispatch(solverSlice.actions.resetState());
  }, [dispatch]);

  return {
    disabledKeys,
    clearState,
  };
};

export const useInitializeSolver = () => {
  const dispatch = useAppDispatch();
  const initializeIgnoredPlayerCards = useInitializeIgnoredPlayerCards();

  const setClubPlayers = useCallback(
    async (clubPlayers: ClubPlayers) => {
      dispatch(solverSlice.actions.setClubPlayers(clubPlayers));
    },
    [dispatch],
  );
  const setChallange = useCallback(
    async (challange: SquadBuildingChallenge) => {
      dispatch(solverSlice.actions.setChallenge(challange));
    },
    [dispatch],
  );

  const initializeSolver = useCallback(async () => {
    initializeWebAppGateway(setClubPlayers, setChallange);
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
