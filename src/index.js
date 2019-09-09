import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import HomeContainer from "./components/Home/HomeContainer";
import Search from "./components/Search/Search";
import Film from "./components/Film/Film";
import Series from "./components/Series/Series";
import Watch from "./components/Watch/Watch";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route exact path="/Search" component={Search} />
      <Route exact path="/Film/:id" render={props => <Film {...props} />} />
      <Route exact path="/Series/:id" render={props => <Series {...props} />} />
      <Route exact path="/Watch/:id" render={props => <Watch {...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
