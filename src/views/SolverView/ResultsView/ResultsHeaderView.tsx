import { Chip } from "@nextui-org/react";
import { useResultsView } from "./ResultsView.hook";

const ResultsHeaderView: React.FC = () => {
  const { solverResult } = useResultsView();

  if (!solverResult || solverResult?.solutions.length == 0) {
    return <div className="inline items-center gap-4">Results</div>;
  }

  return (
    <div className="inline items-center gap-4">
      <span className="text-xl font-semibold">Results</span>
      <Chip variant="solid" color="primary" size="sm" className="ml-2">
        {solverResult.solutions.length}
      </Chip>
    </div>
  );
};

export default ResultsHeaderView;
