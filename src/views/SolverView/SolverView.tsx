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

export const SolverView: React.FC = () => {
  const { disabledKeys } = useSolverView();

  return (
    <div className="flex h-screen flex-col justify-between">
      <SolverHeader />
      <div className="mb-auto bg-panelBackground p-4">
        <Accordion variant="light" disabledKeys={disabledKeys}>
          <AccordionItem
            key="club-players"
            aria-label="Club players"
            title={<PlayersHeaderView />}
            indicator={
              <IoIosArrowDropleft className="text-2xl text-secondary" />
            }
          >
            <PlayersView />
          </AccordionItem>
          <AccordionItem
            key="sbc"
            aria-label="SBC"
            title={<SBCHeaderView />}
            indicator={
              <IoIosArrowDropleft className="text-2xl text-secondary" />
            }
          >
            <SBCView />
          </AccordionItem>
          <AccordionItem
            key="solver-config"
            aria-label="Solver config"
            title="Solver config"
            indicator={
              <IoIosArrowDropleft className="text-2xl text-secondary" />
            }
          >
            <SolverConfigView />
          </AccordionItem>
        </Accordion>
        <SolverBottonView />
        <Accordion variant="light" selectionMode="multiple">
          <AccordionItem
            key="solver-results"
            aria-label="Results"
            title="Results"
            indicator={
              <IoIosArrowDropleft className="text-2xl text-secondary" />
            }
          >
            <ResultsView />
          </AccordionItem>
        </Accordion>
      </div>
      <SolverFooter />
    </div>
  );
};
