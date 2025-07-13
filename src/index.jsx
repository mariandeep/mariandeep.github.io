import { render } from 'solid-js/web';
import { Login } from './routes/login';
import { App } from './routes/app';
import { Router, Route } from '@solidjs/router';
import './css/index.css';

export const RouterWrapper = (
    <Router root={App}>
        <Route path="/login" component={Login} />
    </Router>
);
render(() => RouterWrapper, document.getElementById(`app`));
