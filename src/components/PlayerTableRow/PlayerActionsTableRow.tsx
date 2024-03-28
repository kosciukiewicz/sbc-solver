import { Tooltip } from "@nextui-org/react";
import { ClubPlayerCard } from "../../data/interfaces";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import { usePlayerTableRow } from "./PlayerTableRow.hooks";

interface PlayerActionsTableRowProps {
  playerCard: ClubPlayerCard;
}

export const PlayerActionsTableRow: React.FC<PlayerActionsTableRowProps> = (
  props,
) => {
  const { playerCard } = props;
  const { isIgnored, onSetIgnore, onUnsetSetIgnore } =
    usePlayerTableRow(playerCard);

  return (
    <div className="flex justify-center gap-2">
      {isIgnored ? (
        <Tooltip content="Include">
          <span
            className="cursor-pointer text-lg text-danger  active:opacity-50"
            onClick={onUnsetSetIgnore}
          >
            <IoLockClosed />
          </span>
        </Tooltip>
      ) : (
        <Tooltip content="Ignore">
          <span
            className="cursor-pointer text-lg active:opacity-50"
            onClick={onSetIgnore}
          >
            <IoLockOpen />
          </span>
        </Tooltip>
      )}
    </div>
  );
};
