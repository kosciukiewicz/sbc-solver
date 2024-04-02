export interface ClubPlayers {
  club_players_cards: ClubPlayerCard[];
  id: string;
  timestamp: number;
}

export interface SquadBuildingChallenge {
  id: number;
  name: string;
  squad_slots: SquadSlot[];
  challenge_requirements: ChallengeRequirement[];
  formation_name: string;
}

export interface ChallengeRequirement {
  slot: number;
  scope: string;
  challenge_type_name: ChallengeRequirementType;
  count: number | undefined;
  player_quality: CardQuality | undefined;
  chemistry_value: number | undefined;
  overall_value: number | undefined;
  predicate_type: string | undefined;
}

export enum ChallengeRequirementType {
  PlayerQualityRequirement = "PlayerQualityRequirement",
  OverallRequirement = "OverallRequirement",
  ChemistryRequirement = "ChemistryRequirement",
  LeagueCountRequirement = "LeagueCountRequirement",
  ClubCountRequirement = "ClubCountRequirement",
  NationCountRequirement = "NationCountRequirement",
  SameNationCountRequirement = "SameNationCountRequirement",
  SameClubCountRequirement = "SameClubCountRequirement",
  SameLeagueCountRequirement = "SameLeagueCountRequirement",
  PlayersChemistryPointsRequirement = "PlayersChemistryPointsRequirement",
  PlayerCountRequirement = "PlayerCountRequirement",
  NotImplementedRequirement = "NotImplementedRequirement",
}

export interface SquadSlot {
  index: number;
  locked: boolean;
  club_id: number;
  league_id: number;
  nation_id: number;
}

export interface RawClubPlayerCard {
  [index: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ClubPlayerCard {
  id: number;
  asset_id: number;
  rare_flag: number;
  card_subtype_id: number;
  name: string;
  position: string;
  overall: number;
  is_rare: boolean;
  has_loyalty: boolean;
  card_quality: CardQuality;
  team: number;
  league: number;
  nationality: number;
}

export enum CardQuality {
  Bronze = "BRONZE",
  Silver = "SILVER",
  Gold = "GOLD",
}

export interface SolverResult {
  clubPlayerCards: ClubPlayerCard[];
  challenge: SquadBuildingChallenge;
  solutions: SolverSolution[];
}

export interface SolverSolution {
  player_cards: ClubPlayerCard[];
  chemistry: number;
  overall: number;
  invalid_requirements_count: number;
  requirements: SolverSolutionRequirement[];
}

export interface SolverSolutionRequirement {
  slot: number;
  is_valid: boolean;
  is_implemented: boolean;
}

export interface SolverConfig {
  maxSecondsPerSolution: number;
  numberOfSolutions: number;
}

export interface FormationPosition {
  uniqueId: number;
  typeId: number;
  uniqueName: string;
  typeName: string;
}

export interface Formation {
  name: string;
  uniquePositionSlots: number[];
}

export interface FormationsConfig {
  positionData: FormationPosition[];
  formationData: Formation[];
}
