import { Chip } from "@nextui-org/react";
import { useResultsView } from "./ResultsView.hook";

const ResultsHeaderView: React.FC = () => {
  const { solverResult } = useResultsView();

  if (!solverResult || solverResult?.solutions.length == 0) {
    return <span className="text-xl font-semibold">Results</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-semibold">Results</span>
      <Chip variant="solid" color="primary" size="sm">
        {solverResult.solutions.length}
      </Chip>
    </div>
  );
};

export default ResultsHeaderView;
