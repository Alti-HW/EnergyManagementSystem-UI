export interface Option {
    label: string
    value: string
}

export interface TripleToggleButtonProps {
    onChange: (active: string) => void
    options: Option[]
    btnWidth?: string
    variant?: string
}