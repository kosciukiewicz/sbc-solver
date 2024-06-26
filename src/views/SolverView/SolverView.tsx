import { Accordion, AccordionItem } from "@nextui-org/react";

import { SolverHeader } from "./SolverHeader";
import { SolverFooter } from "./SolverFooter";
import PlayersView from "./PlayersView/PlayersView";
import { useSolverView } from "./SolverView.hooks";
import PlayersHeaderView from "./PlayersView/PlayersHeaderView";
import { IoIosArrowDropleft } from "react-icons/io";
import SBCHeaderView from "./SBCView/SBCHeaderView";
import SBCView from "./SBCView/SBCView";
import SolverConfigView from "./SolverConfigView/SolverConfigView";
import SolverBottonView from "./SolveButtonView/SolveButtonView";
import ResultsView from "./ResultsView/ResultsView";
import ResultsHeaderView from "./ResultsView/ResultsHeaderView";

export const SolverView: React.FC = () => {
  const { disabledKeys, isSolverOpen, setIsSolverOpen } = useSolverView();
  let className;

  if (isSolverOpen) {
    className = "flex justify-items-stretch h-[calc(100vh-48px)] flex-col";
  } else {
    className = "flex flex-col";
  }

  return (
    <div className={className}>
      <SolverHeader onCollapseClick={() => setIsSolverOpen(!isSolverOpen)} />
      {isSolverOpen ? (
        <>
          <div className="flex-auto bg-panelBackground p-4">
            <Accordion variant="light" disabledKeys={disabledKeys}>
              <AccordionItem
                key="club-players"
                aria-label="Club players"
                startContent={<PlayersHeaderView />}
                indicator={
                  <IoIosArrowDropleft className="text-2xl text-secondary" />
                }
              >
                <PlayersView />
              </AccordionItem>
              <AccordionItem
                key="sbc"
                aria-label="SBC"
                startContent={<SBCHeaderView />}
                indicator={
                  <IoIosArrowDropleft className="text-2xl text-secondary" />
                }
              >
                <SBCView />
              </AccordionItem>
              <AccordionItem
                key="solver-config"
                aria-label="Solver config"
                title={
                  <span className="text-xl font-semibold">Solver config</span>
                }
                indicator={
                  <IoIosArrowDropleft className="text-2xl text-secondary" />
                }
              >
                <SolverConfigView />
              </AccordionItem>
            </Accordion>
            <SolverBottonView />
            <Accordion variant="light" disabledKeys={disabledKeys}>
              <AccordionItem
                key="solver-results"
                aria-label="Results"
                title={<ResultsHeaderView />}
                indicator={
                  <IoIosArrowDropleft className="text-2xl text-secondary" />
                }
              >
                <ResultsView />
              </AccordionItem>
            </Accordion>
          </div>
          <SolverFooter />
        </>
      ) : null}
    </div>
  );
};
