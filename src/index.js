import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Home   from './components/Home/Home';
import Search from './components/Search/Search';
import Film   from './components/Film/Film';
import './index.css';

ReactDOM.render(
      <BrowserRouter>
        <Switch>
          <Route exact path="/"         render= {props => <Home />} />
          <Route exact path="/Search"   render= {props => <Search />} />
          <Route exact path="/Film/:id" render= {props => <Film {...props}/>} />
        </Switch>
      </BrowserRouter>,
	document.getElementById('root')
);
serviceWorker.unregister();
