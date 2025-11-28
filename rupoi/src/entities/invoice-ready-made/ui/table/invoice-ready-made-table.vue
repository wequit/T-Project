<script setup lang="ts">
import { computed, useSlots, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { InvoiceReadyMadeDTO } from '@rupoi/entities/invoice-ready-made/model/types.ts'
import { personFormatters } from '@rupoi/entities/person/lib/formatters'
import { BaseTable, BaseStatusTag } from '@rupoi/shared/ui'
import { formatDate } from '@rupoi/shared/lib'

interface InvoiceReadyMadeTableProps {
  data: InvoiceReadyMadeDTO[]
  isLoading?: boolean
  isError?: boolean
}

const props = withDefaults(defineProps<InvoiceReadyMadeTableProps>(), {
  isLoading: false,
  isError: false,
})

const slots = useSlots()

const columns = computed<ColumnDef<InvoiceReadyMadeDTO, unknown>[]>(() => [
  {
    id: 'number',
    header: '№ накладной',
    enableSorting: true,
    accessorKey: 'number',
  },
  {
    id: 'createdAt',
    header: 'Дата',
    accessorKey: 'createdAt',
    enableSorting: true,
    cell: (ctx) => formatDate(ctx.getValue() as string),
  },
  {
    id: 'client',
    header: 'Клиент',
    enableSorting: false,
    cell: (ctx) => ctx.row.original.order?.person ? personFormatters.formatPersonFullName(ctx.row.original.order.person) : '—',
  },
  { 
    id: 'product', 
    header: 'Изделие', 
    enableSorting: false,
    cell: (ctx) => ctx.row.original.order?.productTypeRef?.nameRu ?? '—',
  },
  {
    id: 'quantity',
    header: 'Количество',
    enableSorting: false,
    cell: (ctx) => {
      const materials = ctx.row.original.order?.materials
      if (!materials || materials.length === 0) return '—'
      const total = materials.reduce((sum, mat) => sum + (mat.quantity || 0), 0)
      return `${total} шт`
    },
  },
  {
    id: 'amount',
    header: 'Сумма',
    enableSorting: false,
    cell: (ctx) => {
      const cost = ctx.row.original.order?.orderCost
      return cost ? `${cost} сом` : '—'
    },
  },
  { 
    id: 'status', 
    header: 'Статус', 
    accessorKey: 'status', 
    enableSorting: true,
    cell: (ctx) => {
      const status = ctx.getValue() as string
      return h(BaseStatusTag, { status, size: 'sm' })
    },
  },
  { 
    id: 'priority', 
    header: 'Приоритет', 
    enableSorting: true,
    cell: (ctx) => {
      const priority = ctx.row.original.order?.priority
      if (!priority) return '—'
      return h(BaseStatusTag, { status: priority, size: 'sm' })
    },
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

