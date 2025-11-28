<script setup lang="ts">
import { computed, useSlots, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { OrderOttobockDTO } from '@rupoi/entities/order-ottobock/model/types.ts'
import { personFormatters } from '@rupoi/entities/person/lib/formatters'
import { BaseTable, BaseStatusTag } from '@rupoi/shared/ui'
import { formatDate } from '@rupoi/shared/lib'

interface OrderOttobockTableProps {
  data: OrderOttobockDTO[]
  isLoading?: boolean
  isError?: boolean
}

const props = withDefaults(defineProps<OrderOttobockTableProps>(), {
  isLoading: false,
  isError: false,
})

const slots = useSlots()

const columns = computed<ColumnDef<OrderOttobockDTO, unknown>[]>(() => [
  {
    id: 'orderNumber',
    header: '№ заказа',
    enableSorting: true,
    accessorKey: 'orderNumber',
  },
  {
    id: 'createdAt',
    header: 'Дата',
    accessorKey: 'createdAt',
    enableSorting: true,
    cell: (ctx) => formatDate(ctx.getValue() as string),
  },
  {
    id: 'person',
    header: 'Клиент',
    enableSorting: false,
    cell: (ctx) => ctx.row.original.person ? personFormatters.formatPersonFullName(ctx.row.original.person) : '—',
  },
  { id: 'productType', header: 'Изделие', accessorKey: 'productTypeRef.nameRu', enableSorting: true },
  { id: 'diagnosisId', header: 'Диагноз', accessorKey: 'diagnosisRef.nameRu', enableSorting: true },
  {
    id: 'priority',
    header: 'Приоритет',
    accessorKey: 'priority',
    enableSorting: true,
    cell: (ctx) => {
      const priority = ctx.getValue() as string
      return h(BaseStatusTag, { status: priority, size: 'sm' })
    },
  },
  {
    id: 'orderStatus',
    header: 'Статус',
    accessorKey: 'orderStatus',
    enableSorting: true,
    cell: (ctx) => {
      const status = ctx.getValue() as string
      return h(BaseStatusTag, { status, size: 'sm' })
    },
  },
  {
    id: 'workshop',
    header: 'Цех',
    accessorKey: 'workshopRegistry',
    enableSorting: false,
    cell: (ctx) => ctx.row.original.workshop?.nameRu ? ctx.row.original.workshop.nameKg : '—',
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
