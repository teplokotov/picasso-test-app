import { configureStore } from "@reduxjs/toolkit";
import { topicsApi } from "./api/topics.api";

export const store = configureStore({
  reducer: {
    [topicsApi.reducerPath]: topicsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      topicsApi.middleware
    ),
  devTools: true,
});