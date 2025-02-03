
export interface ChartHeadingProps{
    title: string,
    onExpandIconClick: () => void
    FilterComponent?: any
}

export interface ChartProps{
    startDate: string,
    endDate?: string | null
}

export interface FullViewProps {
    open: boolean
    onClose : () => void
    children:  React.ReactElement<unknown>
}

export interface TableDataProps {
    Total_cost: number,
    units_consumed: string,
    cost_per_unit: number,
    building: string,
    floor: number,
    time_windlow: string,
}