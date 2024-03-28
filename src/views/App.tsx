import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import { SolverView } from "./SolverView/SolverView";
import { store } from "../store/store";

export default function App() {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <div className="z-100 container absolute left-[55%] mx-auto w-[45%] bg-panelBackground text-foreground dark">
          <SolverView />
        </div>
      </Provider>
    </NextUIProvider>
  );
}
