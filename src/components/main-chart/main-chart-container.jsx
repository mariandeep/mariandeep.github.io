import { createEffect, createResource, createSignal, Match, Switch } from 'solid-js';
import { Card } from '../card/card';
import { postData } from './data-helpers';
import env from './../../env.json';
import secret from './../../secrets.json';
import { getPageableBody } from './data-helpers';
import { drawChart } from './draw-chart';
import { formatISO } from 'date-fns';
import { getObservedDate } from './../params';

export function MainChartContainer() {
    const date = getObservedDate();
    const range = 7;
    const [ref, setRef] = createSignal();
    const [glucoseData] = createResource(formatISO(date), () => {
        return postData(env.Endpoints.Glucose, secret.User, getPageableBody(date, range), 'readings');
    });
    const [insulinData] = createResource(formatISO(date), () => {
        return postData(env.Endpoints.Insulin, secret.User, getPageableBody(date, range), 'readings');
    });
    createEffect(() => {
        drawChart(ref(), glucoseData(), insulinData());
    });
    return (
        <Card className="card-bg padding-base" style={{ minHeight: `30vh` }}>
            <Switch>
                <Match when={glucoseData.error || insulinData.error}>Error {glucoseData.error}</Match>
                <Match when={glucoseData.loading || insulinData.loading}>Loading...</Match>
                <Match when={!glucoseData.error && !glucoseData.loading && !insulinData.error && !insulinData.loading}>
                    <div ref={setRef} className="d-grid" data-testid="chart-container"></div>
                </Match>
            </Switch>
        </Card>
    );
}
