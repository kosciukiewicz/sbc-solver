import { useResultsView } from "./ResultsView.hook";

const ResultsView: React.FC = () => {
  const { solverResult } = useResultsView();

  return (
    <div className="rounded-large bg-zinc-900 p-4">
      {solverResult?.solutions.length}
    </div>
  );
};

export default ResultsView;
