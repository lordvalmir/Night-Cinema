import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './Home';
import Search from './Search';
import Film from './Film';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render= {props => <Home />} />
          <Route exact path="/Search" render= {props => <Search />} />
          <Route exact path="/Film/:id" render= {props => <Film {...props}/>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
