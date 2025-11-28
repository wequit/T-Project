<script setup lang="ts">
import { computed, useSlots, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { InvoiceProsthesisDTO } from '@rupoi/entities/invoice-prosthesis/model/types.ts'
import { personFormatters } from '@rupoi/entities/person/lib/formatters'
import { BaseTable, BaseStatusTag } from '@rupoi/shared/ui'
import { formatDate } from '@rupoi/shared/lib'

interface InvoiceProsthesisTableProps {
  data: InvoiceProsthesisDTO[]
  isLoading?: boolean
  isError?: boolean
}

const props = withDefaults(defineProps<InvoiceProsthesisTableProps>(), {
  isLoading: false,
  isError: false,
})

const slots = useSlots()

const columns = computed<ColumnDef<InvoiceProsthesisDTO, unknown>[]>(() => [
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
      const components = ctx.row.original.order?.components
      if (!components || components.length === 0) return '—'
      const total = components.reduce((sum, comp) => sum + (comp.leftQuantity || 0) + (comp.rightQuantity || 0), 0)
      return `${total} шт`
    },
  },
  {
    id: 'amount',
    header: 'Сумма',
    enableSorting: false,
    cell: () => '—', // Нет данных о сумме в API
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

