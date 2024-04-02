import { Accordion, AccordionItem, Chip } from "@nextui-org/react";
import { useResultsView } from "./ResultsView.hook";
import React from "react";
import { SolutionView } from "../../../components/SolutionView/SolutionView";
import { ChallengeRequirement } from "../../../data/interfaces";

const ResultsView: React.FC = () => {
  const { solverResult, challengeFormationName, challangeRequirements } =
    useResultsView();
  const solutions = solverResult ? solverResult.solutions : [];
  if (
    solutions.length == 0 ||
    !challengeFormationName ||
    challangeRequirements.length == 0
  ) {
    return <div>No results</div>;
  }

  const slotToRequirementMapping: { [key: string]: ChallengeRequirement } =
    Object.fromEntries(
      challangeRequirements.map((requirement) => [
        requirement.slot,
        requirement,
      ]),
    );

  return (
    <div className="rounded-large bg-zinc-900 p-4">
      <Accordion>
        {Array.from(Array(solutions.length).keys()).map((i: number) => {
          const solution = solutions[i];
          const solutionIndex = i + 1;
          const fulfilledRequirements =
            solution.requirements.length - solution.invalid_requirements_count;
          return (
            <AccordionItem
              key={solutionIndex}
              className="font-semibold"
              aria-label={"Solution " + solutionIndex}
              startContent={
                <div className="inline items-center gap-4">
                  {"Solution " + solutionIndex}
                  <Chip
                    variant="solid"
                    size="sm"
                    className="ml-2"
                    color="primary"
                  >
                    {`Overall: ${solution.overall}`}
                  </Chip>
                  <Chip
                    variant="solid"
                    size="sm"
                    className="ml-2"
                    color="primary"
                  >
                    {`Chemistry: ${solution.chemistry}`}
                  </Chip>
                  <Chip
                    variant="solid"
                    color={
                      fulfilledRequirements == solution.requirements.length
                        ? "primary"
                        : "warning"
                    }
                    size="sm"
                    className="ml-2"
                  >
                    {`Fullfilled requirements: ${fulfilledRequirements}/${solution.requirements.length}`}
                  </Chip>
                </div>
              }
            >
              <SolutionView
                challengeFormationName={challengeFormationName}
                challangeRequirements={slotToRequirementMapping}
                solution={solution}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ResultsView;
