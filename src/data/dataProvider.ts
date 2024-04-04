import raw_formations_data from "./../assets/formations.json";
import init from "sbc_solver_engine";

export function getFormationPositions(formationName: string): string[] {
  const positionsData = raw_formations_data["positionData"].reduce(
    (
      data: { [index: number]: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
      current,
    ) => {
      data[current.uniqueId] = current;
      return data;
    },
    {},
  );
  const formationData = raw_formations_data["formationData"].filter(
    (formation) => formation["name"] == formationName,
  )[0];

  return formationData.uniquePositionSlots.map(
    (uniqueId) => positionsData[uniqueId]["typeName"],
  );
}

export function getIgnoredClubPlayerCardsIds(): Promise<number[]> {
  return init().then(() => {
    const raw_ignored_ids: string | null = sessionStorage.getItem(
      "IGNORED_CLUB_PLAYER_CARD_IDS",
    );

    if (raw_ignored_ids) {
      const ignoredClubPlayerCardsIds: number[] = JSON.parse(raw_ignored_ids);
      return ignoredClubPlayerCardsIds;
    } else {
      return [];
    }
  });
}
