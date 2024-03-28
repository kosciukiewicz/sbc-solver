import * as tanslation_data from "../assets/en-US.json";
import { CardQuality, ClubPlayerCard } from "./interfaces";

const translations: { [key: string]: string } = tanslation_data;

export function getNationalityFullName(playerCard: ClubPlayerCard): string {
  const key = `search.nationName.nation` + playerCard.nationality;
  const value = translations[key];
  return (value ? value : playerCard.nationality) as string;
}

export function getNationalityAbbreviation(playerCard: ClubPlayerCard): string {
  const key = `nationAbbrvByID_` + playerCard.nationality;
  const value = translations[key];
  return (value ? value : playerCard.nationality) as string;
}

export function getTeamFullName(playerCard: ClubPlayerCard): string {
  const key = `global.teamabbr10.2024.team` + playerCard.team;
  const value = translations[key];
  return (value ? value : playerCard.team) as string;
}

export function getTeamAbbreviation(playerCard: ClubPlayerCard): string {
  const key = `global.teamabbr3.2024.team` + playerCard.team;
  const value = translations[key];
  return (value ? value : playerCard.team) as string;
}

export function getLeagueFullName(playerCard: ClubPlayerCard): string {
  const key = `global.leagueFull.2024.league` + playerCard.league;
  const value = translations[key];
  return (value ? value : playerCard.league) as string;
}

export function getLeagueAbbreviation(playerCard: ClubPlayerCard): string {
  const key = `global.leagueabbr5.2024.league` + playerCard.league;
  const value = translations[key];
  return (value ? value : playerCard.league) as string;
}

export function getCardRarityTypeFullName(playerCard: ClubPlayerCard): string {
  const key = `item.raretype` + playerCard.card_subtype_id;
  const value = translations[key];
  return (value ? value : playerCard.card_subtype_id) as string;
}

export function getCardLevelFullName(playerCard: ClubPlayerCard): string {
  let key;
  switch (playerCard.card_quality) {
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
