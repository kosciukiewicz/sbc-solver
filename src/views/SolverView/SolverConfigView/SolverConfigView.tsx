import { Slider } from "@nextui-org/react";
import { useSolverConfigView } from "./SolverConfigView.hooks";

const SolverConfigView: React.FC = () => {
  const { solverConfig, setNumberOfSolutions, setMaxSecondsPerSolution } =
    useSolverConfigView();

  return (
    <div className="rounded-large bg-zinc-900 p-4">
      <Slider
        size="sm"
        step={1}
        color="primary"
        label="Number of solutions"
        maxValue={10}
        minValue={0}
        defaultValue={solverConfig.numberOfSolutions}
        onChangeEnd={setNumberOfSolutions}
        className="m-auto"
      />
      <Slider
        size="sm"
        step={1}
        color="primary"
        label="Max seconds per solution"
        maxValue={60}
        minValue={0}
        defaultValue={solverConfig.maxSecondsPerSolution}
        onChangeEnd={setMaxSecondsPerSolution}
        className="m-auto mt-4"
      />
    </div>
  );
};

export default SolverConfigView;
