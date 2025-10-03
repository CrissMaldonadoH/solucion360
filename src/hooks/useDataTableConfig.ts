import { useState, Dispatch, SetStateAction } from 'react';
import type { DataTableStateEvent } from 'primereact/datatable';

/** ===== TYPES ===== **/

export type TableConfig = {
  lazyLoading: boolean;
  filterDisplayType: 'input' | 'menu' | string;
  scrollable?: boolean;
  tableStyle?: React.CSSProperties;
  stripedRows?: boolean;
  className?: string;
  size?: 'small' | 'normal' | 'large' | string;
};

export type ColumnsConfig = {
  lazyLoading: boolean;
  filter: boolean;
  sortable: boolean;
};

export type PaginationConfig = {
  first: number;
  rows: number;
  page?: number;
  sortField: string | null;
  sortOrder?: 0 | 1 | -1 | null;
  filters: Record<string, unknown>;
};

export type PaginatorConfig = {
  template: string;
  rowsPerPageOptions: number[];
  rowsPerPageTemplate: string;
  currentPageReportTemplate: string;
  firstPageLabel: string;
  previousPageLabel: string;
  nextPageLabel: string;
  lastPageLabel: string;
  pageLinkSize: number;
  rowsPerPageLabel: string;
  currentPageReportLabel: string;
};

export type DataTableDefaultProps = {
  tableConfig: TableConfig;
  columnsConfig: ColumnsConfig;
  paginationConfig: PaginationConfig;
  paginatorConfig: PaginatorConfig;
};

export type DataTableProps<T> = {
  value: T;
  lazy: boolean;
  filterDisplay?: string;
  scrollable?: boolean;
  style?: React.CSSProperties;
  className?: string;
  stripedRows?: boolean;
};

export type ColumnProps = {
  lazy: boolean;
  filter: boolean;
  sortable: boolean;
};

export type InitialConfig = {
  tableConfig?: Partial<TableConfig>;
  columnsConfig?: Partial<ColumnsConfig>;
};

/** ===== DEFAULT CONFIGURATION ===== **/

export const dataTableDefaultProps: DataTableDefaultProps = {
  tableConfig: {
    lazyLoading: true,
    filterDisplayType: "input",
    stripedRows: true,
    className: "text-center",
    size: "small"
  },
  columnsConfig: {
    lazyLoading: true,
    filter: true,
    sortable: false,
  },
  paginationConfig: {
    first: 0,
    rows: 50,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {},
  },
  paginatorConfig: {
    template: "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown",
    rowsPerPageOptions: [5, 10, 20],
    rowsPerPageTemplate: "5,10,20",
    currentPageReportTemplate: "Mostrando de {first} a {last} de {totalRecords} registros",
    firstPageLabel: "Primera página",
    previousPageLabel: "Página anterior",
    nextPageLabel: "Siguiente página",
    lastPageLabel: "Última página",
    pageLinkSize: 3,
    rowsPerPageLabel: "Registros por página",
    currentPageReportLabel: "Registros"
  }
};

/** ===== HELPERS ===== **/

const generateDataTableProps = <T,>(
  data: T[],
  mergedConfig: TableConfig
): DataTableProps<T[]> => {
  return {
    value: data,
    lazy: mergedConfig.lazyLoading,
    filterDisplay: mergedConfig.filterDisplayType,
    scrollable: mergedConfig.scrollable,
    style: mergedConfig.tableStyle,
    className: mergedConfig.className,
    stripedRows: mergedConfig.stripedRows
  };
};

const generateDataColumnsProps = (
  mergedConfig: ColumnsConfig
): ColumnProps => {
  return {
    lazy: mergedConfig.lazyLoading,
    filter: mergedConfig.filter,
    sortable: mergedConfig.sortable
  };
};

/** ===== HOOK ===== **/

export const useDataTableConfig = <T,>(
  initialData: T[] = [],
  initialConfig: InitialConfig = {}
): {
  data: T[];
  setData: Dispatch<SetStateAction<T[]>>;
  dataTableProps: DataTableProps<T[]>;
  dataColumnsProps: ColumnProps;
  lazyState: PaginationConfig;
  onPage: (event: DataTableStateEvent) => void;
  onSort: (event: DataTableStateEvent) => void;
  onFilter: (event: DataTableStateEvent) => void;
} => {
  const [data, setData]: [T[], Dispatch<SetStateAction<T[]>>] = useState<T[]>(initialData);

  const mergedTableConfig: TableConfig = {
    ...dataTableDefaultProps.tableConfig,
    ...initialConfig.tableConfig
  };

  const mergedColumnsConfig: ColumnsConfig = {
    ...dataTableDefaultProps.columnsConfig,
    ...initialConfig.columnsConfig
  };

  const dataTableProps = generateDataTableProps<T>(data, mergedTableConfig);
  const dataColumnsProps = generateDataColumnsProps(mergedColumnsConfig);

  const initialLazyState: DataTableStateEvent = dataTableDefaultProps.paginationConfig as DataTableStateEvent;
  const [lazyState, setLazyState] = useState<DataTableStateEvent>(initialLazyState);

  const onPage = (event: DataTableStateEvent) => {
    setLazyState(prev => ({ ...prev, ...event }));
  };

  const onSort = (event: DataTableStateEvent) => {
    setLazyState(prev => ({ ...prev, ...event }));
  };

  const onFilter = (event: DataTableStateEvent) => {
    event['first'] = 0;
    setLazyState(prev => ({ ...prev, ...event }));
  };

  return {
    data,
    setData,
    dataTableProps,
    dataColumnsProps,
    lazyState,
    onPage,
    onSort,
    onFilter
  };
};
