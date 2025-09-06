import { ReactNode } from "react"

interface ButtonProps extends React.ComponentProps<'button'> {
    background?: string,
    disabled?: boolean,
    label: string,
    rounded?: boolean,
    cornerRadius?: number
    loading?: {
        state: false,
        indicator: ReactNode,
        label?: string
    }
}


const Button = (props: ButtonProps) => {
    
}


export {Button}