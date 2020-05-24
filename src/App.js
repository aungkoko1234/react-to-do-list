import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './container/Home/';
import About from './container/About/';
import Header from './component/Header';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <React.Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/about" component={About}/>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
