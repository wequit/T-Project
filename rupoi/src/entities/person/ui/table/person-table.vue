<script setup lang="ts">
import { computed, useSlots, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { PersonDTO } from '@rupoi/entities/person/model/types.ts'
import { BaseTable, BaseStatusTag } from '@rupoi/shared/ui'
import {
  personFormatters,
  personAccessors,
} from '@rupoi/entities/person/lib'
import { formatDate } from '@rupoi/shared/lib'

interface PersonTableProps {
  data: PersonDTO[]
  isLoading?: boolean
  isError?: boolean
}

const props = withDefaults(defineProps<PersonTableProps>(), {
  isLoading: false,
  isError: false,
})

const emit = defineEmits<{
  sort: [value: string[]]
}>()

const slots = useSlots()

const columns = computed<ColumnDef<PersonDTO, unknown>[]>(() => [
  {
    id: 'caseNumber',
    header: '№ дела',
    accessorFn: (row: PersonDTO) => row.caseNumber || row.id,
    enableSorting: true,
  },
  {
    id: 'fio',
    header: 'ФИО',
    accessorFn: (row: PersonDTO) => personFormatters.formatPersonFullName(row),
    enableSorting: true,
  },
  {
    id: 'sex',
    header: 'Пол',
    accessorFn: (row: PersonDTO) => personFormatters.getGenderLabel((row).sex),
    enableSorting: true,
  },
  {
    id: 'pin',
    header: 'ПИН',
    accessorKey: 'pin',
    enableSorting: true,
  },
  {
    id: 'birthday',
    header: 'Дата рождения',
    accessorKey: 'birthday',
    enableSorting: true,
    cell: (ctx) => formatDate(ctx.getValue() as string),
  },
  {
    id: 'disabilityGroup',
    header: 'Группа инвалидности',
    accessorFn: (row: PersonDTO) => personFormatters.formatDisabilityGroup(row),
    enableSorting: false,
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
    id: 'phoneNumber',
    header: 'Телефон',
    accessorFn: (row: PersonDTO) => personAccessors.getPersonPhone(row) ?? '—',
    enableSorting: false,
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
    @sort="(data: string[]) => emit('sort', data)"
  />
</template>
