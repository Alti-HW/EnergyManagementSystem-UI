export interface SelectedFilters {
   [key: string]: string | null
}

export interface BuildingFilters {
   buildingName: string,
   buildingId: string,
}
export interface FiltersProps {
   buildingFilters: BuildingFilters[]
   onApllyFilters?: (selectedFilters:SelectedFilters ) => void,
   onClearFilters? : () =>void
   defaultFilters: SelectedFilters
}