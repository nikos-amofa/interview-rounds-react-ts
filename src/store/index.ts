import createSagaMiddleware from "@redux-saga/core";
import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./features";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    preloadedState,
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
