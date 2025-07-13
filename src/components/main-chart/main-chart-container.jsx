import { createEffect, createResource, createSignal, Match, Show, Switch } from 'solid-js';
import { Card } from '../card/card';
import { postData } from './data-helpers';
import env from './../../env.json';
import secret from './../../secrets.json';

function drawChart(ref, data) {
    console.log('ref', ref, 'data', data);
    if (!data) {
        data = {};
    }
}

export function MainChartContainer(props) {
    const [ref, setRef] = createSignal();
    const [data] = createResource('/data/data.json', () =>
        postData(env.Endpoints.Glucose, secret.User, {
            startDate: new Date().toUTCString(),
            endDate: new Date().toUTCString(),
            pageNumber: 1,
            pageSize: 10,
        })
    );
    createEffect(() => {
        drawChart(ref(), data());
    });
    return (
        <Card className="card-bg padding-base" style={{ minHeight: `30vh` }}>
            <Switch>
                <Match when={data.error}>Error {data.error}</Match>
                <Match when={data.loading}>Loading...</Match>
            </Switch>
            <div ref={setRef} className="d-grid"></div>
        </Card>
    );
}
