import React from 'react';

type ButtonPropsType = {
    name: string
    callback: () => void
}
// универсальная кнопка:
const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
// мы будем и удалять кнопкой одной и добавлять и менять фильтр поэтому нейтральное название просто "callback":
        props.callback()
    }

    return (
        <div>
           <button onClick={onClickHandler}>{props.name}</button>
        </div>
    );
};

export default Button;