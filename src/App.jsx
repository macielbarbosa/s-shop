import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home, Cesta, Produtos, Compras } from './Components'
import { Provider } from './Provider'

export const App = () => (
  <BrowserRouter>
    <Provider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Cesta" component={Cesta} />
        <Route exact path="/Produtos" component={Produtos} />
        <Route exact path="/Compras" component={Compras} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Provider>
  </BrowserRouter>
)
