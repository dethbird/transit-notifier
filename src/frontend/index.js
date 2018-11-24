import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, browserHistory } from "react-router-dom";
import { Provider } from "react-redux";

// import 'semantic-ui-css/semantic.min.css';

import store from "store/store";
import Settings from 'components/pages/settings';
import Status from 'components/pages/status';

const App = () => (
    <Provider store={store}>
        <Router history={ browserHistory }>
            <Switch>
                <Route exact path="/" component={ Status } />
                <Route path="/status" component={ Status } />
                <Route path="/settings" component={ Settings } />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
