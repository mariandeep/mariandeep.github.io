import './card.css';
import cn from 'classnames';

export function Card(props) {
    return (
        <div
            style={props.style}
            className={cn(
                'card',
                props.col && `col-start-${props.col}`,
                props.row && `row-start-${props.row}`,
                props.className
            )}>
            {props.children}
        </div>
    );
}
