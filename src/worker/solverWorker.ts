import init, { run_optimization } from "@kosciukiewicz/sbc_solver_engine";
import { SolverResult } from "../data/interfaces";

const ctx: Worker = self as any; // eslint-disable-line @typescript-eslint/no-explicit-any

ctx.addEventListener(
  "message",
  (e) => {
    const { challenge, clubPlayerCards, solverConfig } = e.data;
    console.log(solverConfig);

    init().then(() => {
      const solverSolutions = JSON.parse(
        run_optimization(
          JSON.stringify(challenge),
          JSON.stringify(clubPlayerCards),
          JSON.stringify(solverConfig),
        ),
      );
      const results: SolverResult = {
        clubPlayerCards: clubPlayerCards,
        challenge: challenge,
        solutions: solverSolutions.map(
          (solution: {
            [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
            requirements: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
          }) => {
            solution.invalid_requirements_count = solution.requirements.reduce(
              (current, requirment) => {
                if (!requirment.is_implemented || !requirment.is_valid) {
                  current += 1;
                }
                return current;
              },
              0,
            );
            return solution;
          },
        ),
      };

      ctx.postMessage({
        solverResult: results,
      });
    });
  },
  false,
);
