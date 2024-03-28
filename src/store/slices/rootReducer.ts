import { combineReducers } from "@reduxjs/toolkit";
import { solverSlice } from "./solver/solver.slice";

export const rootReducer = combineReducers({
  solver: solverSlice.reducer,
});
