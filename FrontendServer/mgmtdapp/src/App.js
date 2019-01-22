import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './components/mainContainer/MainContainer';

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

import fetchDataServiceSingleton from './services/fetchDataService';
import postDataServiceSingleton from './services/postService';


class App extends Component {

  constructor(){
    super();
    this.store = configureStore();
    let dataServiceSingleton = fetchDataServiceSingleton.getFetchDataService(this.store);
    let postDataSingleton = postDataServiceSingleton.getPostServiceInstance(this.store);
  }
  render() {
    return (
      <Provider store = {this.store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={MainContainer}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;