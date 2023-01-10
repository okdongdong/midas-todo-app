import React from 'react';
import styles from './Palette.less';
import { BOX_COLORS, useTodoStore } from '../stores/TodoStore';
import { observer } from 'mobx-react';

interface Props {
    todoId?: string | undefined;
    selectedColorIndex: number;
}

const Palette = observer((props: Props) => {
    const { paletteOpen, setColorIndex, updateColorIndex } = useTodoStore();
    const { todoId, selectedColorIndex } = props;

    const handleClick = (index: number) => {
        if (todoId === undefined) setColorIndex(index);
        else updateColorIndex(todoId, index);
    };

    return (
        <>
            {paletteOpen && (
                <div className={styles.palette}>
                    {BOX_COLORS.map((color, index) => (
                        <div
                            className={styles.paletteItem}
                            key={index}
                            style={{
                                border: `3px ${index === selectedColorIndex ? `#2f2` : `#fff`} solid`,
                                backgroundColor: `${color}`,
                            }}
                            onClick={() => handleClick(index)}></div>
                    ))}
                </div>
            )}
        </>
    );
});

export default Palette;
