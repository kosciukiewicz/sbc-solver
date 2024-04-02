import { Button, Progress } from "@nextui-org/react";
import { useSolverBottonView } from "./SolveButtonView.hook";

const SolverBottonView: React.FC = () => {
  const { runSolver, cancelSolver, isSolverRunning, solverProgress } =
    useSolverBottonView();

  const progressClassName = !isSolverRunning ? "invisible" : "";
  return (
    <div>
      <Progress
        value={solverProgress}
        color="primary"
        className={progressClassName}
      />
      {isSolverRunning ? (
        <Button
          color="danger"
          className="my-2 w-full"
          onClick={() => cancelSolver()}
        >
          Cancel
        </Button>
      ) : (
        <Button
          color="primary"
          className="my-2 w-full"
          onClick={() => runSolver()}
        >
          Solve
        </Button>
      )}
    </div>
  );
};

export default SolverBottonView;
