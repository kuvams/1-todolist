import {KeyboardEvent} from "react";

export type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
}

export const Button = (props: ButtonPropsType) => {
    const {title, isDisabled, onClickHandler} = props

    return <button
        disabled={isDisabled}
        onClick={onClickHandler}>
        {title}
    </button>
}