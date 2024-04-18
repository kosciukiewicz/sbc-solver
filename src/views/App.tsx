import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import { SolverView } from "./SolverView/SolverView";
import { store } from "../store/store";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <NextUIProvider>
        <Provider store={store}>
          <div className="container absolute left-[55%] z-50 mx-auto w-[45%] overflow-auto bg-panelBackground text-foreground dark">
            <SolverView />
          </div>
        </Provider>
      </NextUIProvider>
      <ToastContainer
        position="bottom-right"
        pauseOnHover
        theme="dark"
        toastClassName={() =>
          "bg-zinc-900 relative flex p-1 min-h-20 rounded-md justify-between overflow-hidden cursor-pointer"
        }
      />
    </div>
  );
}
