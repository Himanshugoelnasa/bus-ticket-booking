import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../features/ticketReducer";

export const store = configureStore({
  reducer: ticketReducer,
});
