import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Home, Cesta, Produtos, Compras } from "./Components";

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Cesta" component={Cesta} />
      <Route exact path="/Produtos" component={Produtos} />
      <Route exact path="/Compras" component={Compras} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </BrowserRouter>
);
