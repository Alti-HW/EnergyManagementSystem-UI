export interface ChartHeadingProps {
  title: string;
  onExpandIconClick: () => void;
  FilterComponent?: any;
  chartRef?: any;
  exportOptions?: string[];
  enalbeEditDashboard?: boolean;
  onComponentDelete?: (componentIndex: number) => void;
  componentIndex: number;
}

export interface ChartProps {
  startDate: string;
  endDate?: string | null;
  buildingsAndFloorsNames?: any;
}

export interface FullViewProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement<unknown>;
}

export interface TableDataProps {
  Total_cost: number;
  units_consumed: string;
  cost_per_unit: number;
  building: string;
  floor: number;
  time_windlow: string;
}

export interface DataAPI {
  url: string;
  userFor: string;
  method: string;
  dataPathKey?: string | string[];
  payload?: any;
}

export interface DateFilter {
  filterType: "date";
  filterValues: string[];
  showFilter: string;
}

export interface Filter {
  filterType: "dropdown";
  showFilter: string;
  filterLabel: string;
  filterDataValueKey?: string;
  filterDataLabelKey?: string;
  filterId: string;
  dataPath: string;
  isParentFilter: "true" | "false";
}

export interface DetailedViewConfig {
  dataApi: string;
  payload: any;
  apiMethod: string;
  keyToBeRead: string;
  tableConfig: [{ [key: string]: string }];
  dataKey: string[];
}

export interface ComponentConfig {
  type?: string;
  chartType?: string;
  title: string;
  dataApi: DataAPI[];
  xAxisKey: string;
  xAxisLabel: string;
  yAxisKey: string;
  yAxisLabel: string;
  yAxisDataFormatter: string;
  xAxisDataFormatter: string;
  dateFilter: DateFilter;
  filters: Filter[];
  enableScrollInFullview: "true" | "false";
  color?: string;
  exportOptions?: string[];
  enableDetailedView: "true" | "false";
  detailedViewConfig: DetailedViewConfig;
  width?: string;
}

export interface ChartWrapperProps extends ComponentConfig {
  enalbeEditDashboard: boolean;
  onComponentDelete: (index: number) => void;
  componentIndex: number;
}
