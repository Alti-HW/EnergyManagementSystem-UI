import { Dayjs } from "dayjs"

export interface DateFilterTypes {
    onDateRangeChange: (start: string, end: string) => void
    defaultEndDate: string
    defaultStartDate: string
}
interface Option {
    label: string
    value: string
}
export interface SelectorProps {
    options: Option[],
    onChange: (value: string) => void,
    name: string
    value?: string
}

export interface DateTimeSelectorProps {
    onClose: () => void
    label: string
    onChange: (date: Dayjs | null) => void,
    value: Dayjs | null
}