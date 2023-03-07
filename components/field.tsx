import {useState, useReducer, CSSProperties} from 'react'
import { useRouter } from "next/router"

export interface Styles {
    [Key: string]: CSSProperties
  }

export default function Filed({game}: { game: any }) {
    const navigator = useRouter()
    const alwaysLose = navigator.query.hardcore !== undefined;
    const [redCell, setRedCell] = useState('');
    const field = game.field;
    const columns: any[] = [];
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    field.forEach((col: any[], y: number) => {
        const newColumn = col.map((cell: any, x: number) => {
            const onClick = () => {
                if (game.lost) return;
                if (alwaysLose && !cell.hasMine) {
                    cell.hasMine = true;
                    cell.mines = 0;
                    game.addNumbersAroudMine({x, y});
                }

                game.open({x, y});
                if (game.lost) {
                    game.openAll();
                    setRedCell([x, y].join('-'));
                }
                forceUpdate();
            }
            const mark = (e: any) => {
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

    return (<div style={{gridTemplateColumns: `repeat(${game.size.width}, 30px)`}} className="field">{columns}</div>);
}
