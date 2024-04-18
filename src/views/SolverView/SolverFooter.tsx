export const SolverFooter: React.FC = () => (
  <div className="flex  w-full flex-row  content-center	 justify-center gap-x-4 place-self-end bg-panelBackground p-12 text-center">
    <div className="content-center text-center text-xl">
      {"Created by "}
      <a
        target="_blank"
        className="cursor-pointer font-bold"
        href="https://github.com/kosciukiewicz"
        rel="noreferrer"
      >
        kosciukiewicz
      </a>
    </div>
    <a href="https://www.buymeacoffee.com/kosciukiewicz">
      <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=kosciukiewicz&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
    </a>
  </div>
);
