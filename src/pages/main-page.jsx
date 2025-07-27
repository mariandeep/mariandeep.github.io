import { Card } from '../components/card/card';
import cn from 'classnames';
import './main-page.css';
import { MainChartContainer } from '../components/main-chart/main-chart-container';
import { getObservedDate } from '../components/params';
import { formatDate } from 'date-fns';

const cardTemplate = 'padding-quarter card-bg d-flex justify-content-center';
const red = 'card-bad text-bad';
const green = 'card-good';
const blue = 'card-blue';
const norm = 'card-bg';

export function MainPage(props) {
    const date = getObservedDate();
    return (
        <div data-testid="main-page" className="main-page-surface">
            <div className="flex-column padding-base sizing-bb gap-half">
                <div className="d-flex flex-row align-items-center justify-content-between ">
                    <h3>Hello Oleg</h3>
                    <div className="x-small">{formatDate(date, 'yyyy-MM-dd')}</div>
                </div>
                <div
                    className="gap-half sizing-bb d-grid"
                    style={{
                        gridAutoColumns: 3,
                        gridAutoRows: 3,
                    }}>
                    <Card className={cn(cardTemplate, green)} col={1} row={1}>
                        -4
                    </Card>

                    <Card className={cn(cardTemplate, green)} col={2} row={1}>
                        -10
                    </Card>
                    <Card className={cn(cardTemplate, norm)} col={3} row={1}></Card>

                    <Card className={cn(cardTemplate, norm)} col={1} row={2}>
                        +2
                    </Card>
                    <Card className={cn(cardTemplate, red)} col={2} row={2}>
                        -5
                    </Card>
                    <Card className={cn(cardTemplate, green)} col={3} row={2}>
                        +4
                    </Card>

                    <Card className={cn(cardTemplate, red)} col={1} row={3}>
                        +6
                    </Card>
                    <Card className={cn(cardTemplate, red)} col={2} row={3}>
                        +5
                    </Card>
                    <Card className={cn(cardTemplate, norm)} col={3} row={3}></Card>
                </div>
                <MainChartContainer />
            </div>
        </div>
    );
}
