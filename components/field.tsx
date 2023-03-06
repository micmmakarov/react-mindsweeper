import {useState, useReducer} from 'react'

export default function Filed({game}) {
    const [redCell, setRedCell] = useState('');
    const field = game.field;
    const columns: any[] = [];
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const style = {
        ['grid-template-columns']: `repeat(${game.size.width}, 30px)`
    }

    field.forEach((col, y) => {
        const newColumn = col.map((cell, x) => {
            const onClick = () => {
                game.open({x, y});
                if (game.lost) {
                    game.openAll();
                    setRedCell([x, y].join('-'));
                }
                forceUpdate();
            }
            const mark = (e) => {
                e.preventDefault();
                game.mark({x, y});
                forceUpdate();
            }
            let classes = 'cell ';
            if (cell.opened) classes += 'opened '
            classes += 'mines' + cell.mines;
            if ([x, y].join('-') === redCell) classes += ' is-red ';
            if (cell.opened && cell.hasMine) classes += ' has-mine '
            if (!cell.opened && cell.marked) classes += ' marked '

            return (<div className={classes} key={x + y * game.size.width} onContextMenu={mark} onClick={onClick}>{cell.opened && cell.mines ? cell.mines + '': ''}</div>)
        })
        columns.push(...newColumn)

    })

    return (<div style={style} className="field">{columns}</div>);
}