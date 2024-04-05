import { Button, Tooltip } from "@nextui-org/react";
import { IoFootball } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useSolverView } from "./SolverView.hooks";

interface SolverHeaderProps {
  onCollapseClick: () => void;
}

export const SolverHeader: React.FC<SolverHeaderProps> = (
  props: SolverHeaderProps,
) => {
  const { clearState } = useSolverView();

  return (
    <div
      className="m-4 inline-block flex cursor-pointer items-center justify-between"
      onClick={() => props.onCollapseClick()}
    >
      <div className="flex items-center space-x-2">
        <IoFootball className="text-2xl" />{" "}
        <a className="text-2xl font-medium">SBC Solver</a>
      </div>
      <div className="flex space-x-2">
        <Tooltip content={"Clear solver state"}>
          <Button
            isIconOnly
            color="primary"
            aria-label="Clear"
            onClick={() => clearState()}
          >
            <AiOutlineClear className="text-2xl" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
