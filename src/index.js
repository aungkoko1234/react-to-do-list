import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import {rootEpic} from './epic';
import {rootReducer} from './reducer';
import * as serviceWorker from './serviceWorker';

const epicMiddleware = createEpicMiddleware();
const actionSanitizer = () => { console.log( 'action')}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionSanitizer,
      stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
    }) : compose; 

var enhancer = null;
if(process.env.NODE_ENV === 'production'){  
  enhancer = compose(applyMiddleware(epicMiddleware));
}else{
  enhancer = composeEnhancers(
    applyMiddleware(epicMiddleware)  
  );
}
const store = createStore(rootReducer,enhancer);

ReactDOM.render(
<Provider store={store}>    
        <App />      
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
