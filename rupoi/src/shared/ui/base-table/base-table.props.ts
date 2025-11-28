import type {ColumnDef} from "@tanstack/vue-table";

export interface BaseTableProps<T> {
  columns: ColumnDef<T, unknown>[]
  data: T[]
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  emptyMessage?: string
  loadingMessage?: string
}
