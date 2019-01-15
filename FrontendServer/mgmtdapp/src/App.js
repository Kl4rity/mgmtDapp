import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './components/mainContainer/MainContainer';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={MainContainer}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;