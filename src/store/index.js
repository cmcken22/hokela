import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export default function configureStore(initialState) {
  let middlewares = [thunk];

  const devTool = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devTool ? devTool({ name: 'Hokela Redux Store' }) : compose;
  middlewares.push(createLogger({ collapsed: true }));

  return createStore(reducer, initialState, composeEnhancers(applyMiddleware( ...middlewares)));
}
