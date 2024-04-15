import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import { SolverView } from "./SolverView/SolverView";
import { store } from "../store/store";

export default function App() {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <div className="container absolute left-[55%] z-50 mx-auto w-[45%] overflow-auto bg-panelBackground text-foreground dark">
          <SolverView />
        </div>
      </Provider>
    </NextUIProvider>
  );
}
