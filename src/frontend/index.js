import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';

import Settings from 'components/pages/settings';
import Status from 'components/pages/status';

const App = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={ Status } />
        <Route path="/status" component={ Status } />
        <Route path="/settings" component={ Settings } />
      </Switch>
  </Router>
);

ReactDOM.render(<App/>, document.getElementById('root'));
