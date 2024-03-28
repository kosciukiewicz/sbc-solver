import { useCallback } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { solverSlice } from "../../store/slices/solver/solver.slice";
import { ClubPlayerCard } from "../../data/interfaces";

export const usePlayerTableRow = (playerCard: ClubPlayerCard) => {
  const dispatch = useAppDispatch();
  const ignoredClubPlayerCardsIds = useAppSelector(
    (rootState: RootState) => rootState.solver.ignoredClubPlayerCardsIds,
  );
  const isIgnored =
    ignoredClubPlayerCardsIds.indexOf(playerCard.asset_id) != -1;
  const onSetIgnore = useCallback(() => {
    const updatedIgnoredClubPlayerCardsIds = [...ignoredClubPlayerCardsIds];
    updatedIgnoredClubPlayerCardsIds.push(playerCard.asset_id);
    sessionStorage.setItem(
      "IGNORED_CLUB_PLAYER_CARD_IDS",
      JSON.stringify(updatedIgnoredClubPlayerCardsIds),
    );
    dispatch(
      solverSlice.actions.setIgnoredClubPlayerCardsIds(
        updatedIgnoredClubPlayerCardsIds,
      ),
    );
  }, [dispatch, ignoredClubPlayerCardsIds]);

  const onUnsetSetIgnore = useCallback(() => {
    const updatedIgnoredClubPlayerCardsIds = [...ignoredClubPlayerCardsIds];
    const index = ignoredClubPlayerCardsIds.indexOf(playerCard.asset_id);
    updatedIgnoredClubPlayerCardsIds.splice(index, 1);
    sessionStorage.setItem(
      "IGNORED_CLUB_PLAYER_CARD_IDS",
      JSON.stringify(updatedIgnoredClubPlayerCardsIds),
    );
    dispatch(
      solverSlice.actions.setIgnoredClubPlayerCardsIds(
        updatedIgnoredClubPlayerCardsIds,
      ),
    );
  }, [dispatch, ignoredClubPlayerCardsIds]);

  return {
    isIgnored,
    onSetIgnore,
    onUnsetSetIgnore,
  };
};
