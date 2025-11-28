<script setup lang="ts" generic="T">
import { computed, ref } from 'vue'
import type { SortingState, Updater } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import type { BaseTableProps } from '@rupoi/shared/ui'

const props = withDefaults(defineProps<BaseTableProps<T>>(), {
  errorMessage: 'Произошла ошибка при загрузке данных',
  emptyMessage: 'Здесь пока ничего нет',
  loadingMessage: 'Загрузка данных...',
})

const emit = defineEmits<{
  sort: [value: string[]]
}>()

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  state: {
    get sorting() {
      return sorting.value
    },
  },
  manualSorting: true,
  enableMultiSort: true,
  enableSortingRemoval: true,
  onSortingChange: (updater: Updater<SortingState>) => {
    const nextSorting = typeof updater === 'function' ? updater(sorting.value) : updater
    sorting.value = nextSorting

    // Собираем сортировку только для колонок, которые есть в конфиге
    const sortStrings = nextSorting
      .filter((s) => props.columns.some((col) => col.id === s.id))
      .map((s) => `${s.id},${s.desc ? 'desc' : 'asc'}`)

    emit('sort', sortStrings)
  },
  getCoreRowModel: getCoreRowModel(),
  enableSorting: true,
})

const columnCount = computed(() => props.columns.length || 1)
</script>

<template>
  <div class="tw-overflow-x-auto tw-overflow-y-hidden" style="overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch;">
    <table class="table small" style="min-width: 100%; width: max-content; table-layout: auto;">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            class="text-center text-uppercase tw-px-4 tw-py-3 tw-whitespace-nowrap tw-align-middle"
            :class="{ 'cursor-pointer': header.column.getCanSort() }"
            style="vertical-align: middle;"
            @click="header.column.getCanSort() ? header.column.toggleSorting(undefined, true) : undefined"
          >
            <div class="d-flex align-items-center justify-content-center gap-2">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
              <span v-if="header.column.getCanSort()" class="sort-indicator">
                <template v-if="header.column.getIsSorted() === 'asc'">
                  <i class="fas fa-sort-up text-primary"></i>
                </template>
                <template v-else-if="header.column.getIsSorted() === 'desc'">
                  <i class="fas fa-sort-down text-primary"></i>
                </template>
                <template v-else>
                  <i class="fas fa-sort text-muted"></i>
                </template>
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Loading state -->
        <tr v-if="isLoading">
          <td :colspan="columnCount" class="text-center tw-py-12" style="vertical-align: middle;">
            <div class="d-flex flex-column align-items-center justify-content-center gap-2">
              <i class="fas fa-spinner fa-spin text-primary" style="font-size: 3rem;"></i>
              <p class="text-muted mb-0 small">{{ loadingMessage }}</p>
            </div>
          </td>
        </tr>

        <!-- Error state -->
        <tr v-else-if="isError">
          <td :colspan="columnCount" class="text-center tw-py-12" style="vertical-align: middle;">
            <div class="d-flex flex-column align-items-center justify-content-center gap-2">
              <i class="fas fa-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
              <div class="text-center">
                <p class="fw-semibold text-danger mb-2">Ошибка загрузки</p>
                <p class="text-muted small mb-0">{{ errorMessage }}</p>
              </div>
            </div>
          </td>
        </tr>

        <!-- Empty state -->
        <tr v-else-if="!table.getRowModel().rows.length">
          <td :colspan="columnCount" class="text-center tw-py-12" style="vertical-align: middle;">
            <div class="d-flex flex-column align-items-center justify-content-center gap-2">
              <div class="text-center">
                <p class="fw-semibold text-secondary mb-0">{{ emptyMessage }}</p>
              </div>
            </div>
          </td>
        </tr>

        <!-- Data rows -->
        <template v-else>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            style="vertical-align: middle;"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="text-center tw-px-4 tw-py-3 tw-whitespace-nowrap tw-align-middle"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.cursor-pointer:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.sort-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
}
</style>
