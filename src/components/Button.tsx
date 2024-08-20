type ButtonPropsType = {
    title: string
    onCLickHandler?: (id: number) => void
    id?: number
}

export const Button = ({title, onCLickHandler, id}: ButtonPropsType) => {
    const handler = () => {
        if(!onCLickHandler || !id) {
            return
        }
        onCLickHandler(id)
    }
    return <button onClick={handler}>{title}</button>
}

