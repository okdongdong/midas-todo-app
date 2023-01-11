import React from 'react';
import styles from './Palette.less';
import { BOX_COLORS, useTodoStore } from '../stores/TodoStore';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';

interface Props {
    todoId?: string | undefined;
    selectedColorIndex: number;
}

const Palette = observer((props: Props) => {
    const { setColorIndex, updateColorIndex } = useTodoStore();
    const { todoId, selectedColorIndex } = props;
    const cx = classNames.bind(styles);
    const handleClick = (index: number) => {
        if (todoId === undefined) setColorIndex(index);
        else updateColorIndex(todoId, index);
    };

    return (
        <div className={styles.palette}>
            {Array(10)
                .fill(null)
                .map((_, index) => (
                    <div className={cx(`paletteItem`, `boxColor${index}`, index === selectedColorIndex && `selected`)} key={index} onClick={() => handleClick(index)}></div>
                ))}
        </div>
    );
});

export default Palette;
