import raw_formations_data from "../assets/formations.json";

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
