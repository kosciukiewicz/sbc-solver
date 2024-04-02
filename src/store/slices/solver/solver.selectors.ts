import { createSelector } from "@reduxjs/toolkit";
import {
  ChallengeRequirementType,
  ClubPlayerCard,
} from "../../../data/interfaces";
import { RootState } from "../../store";

export const selectChallangeName = (state: RootState) =>
  state.solver.challenge?.name;

export const selectChallengeFormationName = (state: RootState) =>
  state.solver.challenge?.formation_name;

export const selectChallangeRequirements = (state: RootState) =>
  state.solver.challenge ? state.solver.challenge!.challenge_requirements : [];

export const selectNotImplementedRequirementsCount = createSelector(
  selectChallangeRequirements,
  (requirements) =>
    requirements.filter(
      (requirement) =>
        requirement.challenge_type_name ===
        ChallengeRequirementType.NotImplementedRequirement,
    ).length,
);

export const selectClubPlayerCards = (state: RootState) =>
  state.solver.clubPlayers ? state.solver.clubPlayers.club_players_cards : [];

export const selectIgnoredPlayerCardsIds = (state: RootState) =>
  state.solver.ignoredClubPlayerCardsIds
    ? state.solver.ignoredClubPlayerCardsIds
    : [];

export const selectSolverPlayerCards = createSelector(
  selectClubPlayerCards,
  selectIgnoredPlayerCardsIds,
  (clubPlayerCards, ignoredClubPlayerCardsIds) =>
    clubPlayerCards.filter(
      (clubPlayerCard: ClubPlayerCard) =>
        !ignoredClubPlayerCardsIds.includes(clubPlayerCard.asset_id),
    ),
);

export const selectSortedChallangeRequirements = createSelector(
  selectChallangeRequirements,
  (requirements) =>
    requirements.slice().sort((req1, req2) => {
      return req1.slot > req2.slot ? 1 : -1;
    }),
);

export const selectIsChallangeImported = (state: RootState) =>
  state.solver.challenge != null;
