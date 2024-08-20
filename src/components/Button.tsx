type ButtonPropsType = {
    title: string
    onCLickHandler: () => void
}

export const Button = ({title, onCLickHandler}: ButtonPropsType) => {
    return <button onClick={onCLickHandler}>{title}</button>
}

