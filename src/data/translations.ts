import * as tanslation_data from "../assets/en-US.json";
import * as formations_config from "../assets/formations.json";
import { CardQuality, Formation, FormationsConfig } from "./interfaces";

const translations: { [key: string]: string } = tanslation_data;
const formationsConfig: FormationsConfig = formations_config;
const formationNameToFormationMapping: { [key: string]: Formation } =
  Object.fromEntries(
    formationsConfig.formationData.map((formation) => [
      formation.name,
      formation,
    ]),
  );

export function getNationalityFullName(nationality: number): string {
  const key = `search.nationName.nation` + nationality;
  const value = translations[key];
  return (value ? value : nationality) as string;
}

export function getNationalityAbbreviation(nationality: number): string {
  const key = `nationAbbrvByID_` + nationality;
  const value = translations[key];
  return (value ? value : nationality) as string;
}

export function getTeamFullName(team: number): string {
  const key = `global.teamabbr10.2024.team` + team;
  const value = translations[key];
  return (value ? value : team) as string;
}

export function getTeamAbbreviation(team: number): string {
  const key = `global.teamabbr3.2024.team` + team;
  const value = translations[key];
  return (value ? value : team) as string;
}

export function getLeagueFullName(league: number): string {
  const key = `global.leagueFull.2024.league` + league;
  const value = translations[key];
  return (value ? value : league) as string;
}

export function getLeagueAbbreviation(league: number): string {
  const key = `global.leagueabbr5.2024.league` + league;
  const value = translations[key];
  return (value ? value : league) as string;
}

export function getCardRarityTypeFullName(cardSubtypeId: number): string {
  const key = `item.raretype` + cardSubtypeId;
  const value = translations[key];
  return (value ? value : cardSubtypeId) as string;
}

export function getCardLevelFullName(card_quality: CardQuality): string {
  let key;
  switch (card_quality) {
    case CardQuality.Bronze:
      key = `search.cardLevels.cardLevel1`;
      break;
    case CardQuality.Silver:
      key = `search.cardLevels.cardLevel2`;
      break;
    case CardQuality.Gold:
      key = `search.cardLevels.cardLevel3`;
      break;
    default:
      key = `search.cardLevels.cardLevel4`;
  }
  return translations[key] as string;
}

export function getPositionName(
  formationName: string,
  position: number,
): string {
  const formation = formationNameToFormationMapping[formationName];
  return formationsConfig.positionData[formation.uniquePositionSlots[position]]
    .uniqueName;
}
