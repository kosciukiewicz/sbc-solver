import { Slider } from "@nextui-org/react";
import { useSolverConfigView } from "./SolverConfigView.hooks";
import { appSettings } from "../../../config/appConfig";

const SolverConfigView: React.FC = () => {
  const { solverConfig, setConfigValue } = useSolverConfigView();

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
        onChangeEnd={(newValue) =>
          setConfigValue("numberOfSolutions", newValue)
        }
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
        onChangeEnd={(newValue) =>
          setConfigValue("maxSecondsPerSolution", newValue)
        }
        className="m-auto mt-4"
      />
      {appSettings.advancedMode ? (
        <>
          <Slider
            size="sm"
            step={10}
            color="primary"
            label="Population size"
            maxValue={1000}
            minValue={0}
            defaultValue={solverConfig.populationSize}
            onChangeEnd={(newValue) =>
              setConfigValue("populationSize", newValue)
            }
            className="m-auto mt-4"
          />
          <Slider
            size="sm"
            step={1}
            color="primary"
            label="Tournament size"
            maxValue={15}
            minValue={2}
            defaultValue={solverConfig.tournamentSize}
            onChangeEnd={(newValue) =>
              setConfigValue("tournamentSize", newValue)
            }
            className="m-auto mt-4"
          />
          <Slider
            size="sm"
            step={0.05}
            color="primary"
            label="Crossover probability"
            maxValue={1.0}
            minValue={0.0}
            defaultValue={solverConfig.crossoverProbability}
            onChangeEnd={(newValue) =>
              setConfigValue("crossoverProbability", newValue)
            }
            className="m-auto mt-4"
          />
          <Slider
            size="sm"
            step={0.01}
            color="primary"
            label="Mutation probability"
            maxValue={1.0}
            minValue={0.0}
            defaultValue={solverConfig.mutationProbability}
            onChangeEnd={(newValue) =>
              setConfigValue("mutationProbability", newValue)
            }
            className="m-auto mt-4"
          />
        </>
      ) : null}
    </div>
  );
};

export default SolverConfigView;
