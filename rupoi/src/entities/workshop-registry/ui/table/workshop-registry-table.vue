<script setup lang="ts">
import { computed, useSlots, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { WorkshopRegistryDTO } from '@rupoi/entities/workshop-registry/model/types'
import { BaseTable } from '@rupoi/shared/ui'

interface WorkshopRegistryTableProps {
  data: WorkshopRegistryDTO[]
  isLoading?: boolean
  isError?: boolean
}

const props = withDefaults(defineProps<WorkshopRegistryTableProps>(), {
  isLoading: false,
  isError: false,
})

const slots = useSlots()

const columns = computed<ColumnDef<WorkshopRegistryDTO, unknown>[]>(() => [
  {
    id: 'id',
    header: 'ID',
    enableSorting: true,
    accessorKey: 'id',
  },
  {
    id: 'nameRu',
    header: 'Название (RU)',
    accessorKey: 'nameRu',
    enableSorting: true,
  },
  {
    id: 'nameKg',
    header: 'Название (KG)',
    accessorKey: 'nameKg',
    enableSorting: true,
  },
  {
    id: 'representative',
    header: 'Представитель',
    accessorKey: 'representative',
    enableSorting: true,
  },
  {
    id: 'address',
    header: 'Адрес',
    accessorKey: 'address',
    enableSorting: false,
  },
  {
    id: 'otherInfo',
    header: 'Доп. информация',
    accessorKey: 'otherInfo',
    enableSorting: false,
    cell: (ctx) => ctx.getValue() || '—',
  },
  {
    id: 'actions',
    header: 'Действия',
    enableSorting: false,
    cell: (ctx) => {
      if (slots.actions) {
        return slots.actions({ row: ctx.row, item: ctx.row.original })
      }
      return null
    },
  },
])
</script>

<template>
  <BaseTable
    :columns="columns"
    :data="data"
    :is-loading="props.isLoading"
    :is-error="props.isError"
  />
</template>

