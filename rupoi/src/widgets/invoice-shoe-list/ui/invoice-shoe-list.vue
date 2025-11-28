<script setup lang="ts">
import { computed } from 'vue'
import { useFilter } from '@rupoi/shared/lib'
import {
  InvoiceShoeTable,
  InvoiceShoeFilterForm,
  useInvoiceShoe,
  type InvoiceShoeListParams,
  type InvoiceShoeDTO,
  type InvoiceShoeFilterFormValues,
} from '@rupoi/entities/invoice-shoe'
import { BasePagination } from '@rupoi/shared/ui'
import { AButton, APopover } from '@common/shared/ui'
import { RouteConfig, InvoiceStatus, OrderPriority } from '@rupoi/shared/constant'
import { router } from '@rupoi/app/router'
import type { ID } from '@rupoi/shared/model'
import { usePermissions } from '@rupoi/entities/user'

interface Props {
  orderId?: ID
}

const props = defineProps<Props>()

// Permissions
const { canEditInvoice, canDeleteInvoice, canViewInvoice } = usePermissions()

// Filter logic
const { filter, updateFilter } = useFilter<InvoiceShoeListParams>({
  initFilter: () => ({
    orderId: props.orderId ? Number(props.orderId) : undefined,
    status: undefined,
    priority: undefined,
    q: undefined,
    createdAtFrom: undefined,
    createdAtTo: undefined,
    pageable: {
      page: 0,
      size: 20,
      sort: []
    }
  })
})

// Computed для передачи в форму фильтрации
const filterFormValues = computed<InvoiceShoeFilterFormValues>(() => ({
  q: filter.value.q ?? null,
  status: filter.value.status ?? [],
  priority: filter.value.priority ?? null,
  createdAtFrom: filter.value.createdAtFrom ?? null,
  createdAtTo: filter.value.createdAtTo ?? null,
  orderId: filter.value.orderId ?? null,
}))

function handleSearch(data: InvoiceShoeFilterFormValues) {
  // Сбрасываем на первую страницу при явном поиске
  const statusValue = data.status as InvoiceStatus[]
  const priorityValue = data.priority as OrderPriority | undefined

  updateFilter({
    q: data.q ?? undefined,
    status: statusValue ?? [],
    priority: priorityValue ?? undefined,
    createdAtFrom: data.createdAtFrom ?? undefined,
    createdAtTo: data.createdAtTo ?? undefined,
    orderId: data.orderId ?? undefined,
    pageable: {
      page: 0,
      size: filter.value.pageable?.size ?? 20,
      sort: filter.value.pageable?.sort ?? []
    }
  })
}

function handleReset(data: InvoiceShoeFilterFormValues) {
  const statusValue = data.status as InvoiceStatus[]
  const priorityValue = data.priority as OrderPriority | undefined

  updateFilter({
    q: data.q ?? undefined,
    status: statusValue ?? [],
    priority: priorityValue ?? undefined,
    createdAtFrom: data.createdAtFrom ?? undefined,
    createdAtTo: data.createdAtTo ?? undefined,
    orderId: data.orderId ?? undefined,
    pageable: {
      page: 0,
      size: 20,
      sort: []
    }
  })
}

function handlePageChange(page: number) {
  updateFilter({
    pageable: {
      page,
      size: filter.value.pageable?.size ?? 20,
      sort: filter.value.pageable?.sort ?? []
    }
  })
}

function handleSortChange(sortStrings: string[]) {
  updateFilter({
    pageable: {
      page: filter.value.pageable?.page ?? 0,
      size: filter.value.pageable?.size ?? 20,
      sort: sortStrings
    }
  })
}

// Handle table actions
function handleView(invoice: InvoiceShoeDTO) {
  router.push({
    name: RouteConfig.Invoice.shoe.view.name,
    params: { id: invoice.id }
  })
}

function handleEdit(invoice: InvoiceShoeDTO) {
  router.push({
    name: RouteConfig.Invoice.shoe.edit.name,
    params: { id: invoice.id }
  })
}

// Loading Data
const {
  invoiceShoeList: data,
  isLoading,
  listQuery,
  deleteInvoiceShoeMutation
} = useInvoiceShoe({ listParams: filter })
const isError = computed(() => listQuery?.isError.value ?? false)

// Delete handler
function handleDelete(invoice: InvoiceShoeDTO) {
  if (confirm(`Вы уверены, что хотите удалить накладную № ${invoice.number || invoice.id}?`)) {
    deleteInvoiceShoeMutation.mutateAsync(invoice.id).then(() => {
      // Инвалидируем список после удаления
      listQuery?.refetch()
    })
  }
}

// Computed
const hasData = computed(() => data?.value && data.value.content.length > 0)
const showPagination = computed(() => hasData.value && data?.value && data.value.totalElements > 0)

function canModify(invoice: InvoiceShoeDTO) {
  return invoice.status === InvoiceStatus.ACTIVE && canEditInvoice.value
}

function canDelete(invoice: InvoiceShoeDTO) {
  return invoice.status === InvoiceStatus.ACTIVE && canDeleteInvoice.value
}
</script>

<template>
  <div class="invoice-shoe-list">
    <!-- Форма фильтрации -->
    <div class="invoice-shoe-list__filters mb-4">
      <InvoiceShoeFilterForm
        :data="filterFormValues"
        @search="handleSearch"
        @reset="handleReset"
      />
    </div>

    <!-- Таблица -->
    <div class="invoice-shoe-list__table mb-4">
      <div class="card">
        <div class="card-body p-0">
          <InvoiceShoeTable
            :data="data?.content ?? []"
            :is-loading="isLoading"
            :is-error="isError"
            @sort="handleSortChange"
          >
            <template #actions="{ item }">
              <div class="d-flex gap-2 justify-content-center">
                <APopover
                  v-if="canViewInvoice"
                  title="Просмотр накладной"
                  trigger="hover"
                >
                  <AButton
                    color="primary"
                    size="sm"
                    icon
                    @click="handleView(item)"
                  >
                    <i class="fas fa-eye"></i>
                  </AButton>
                </APopover>
                <APopover
                  v-if="canModify(item)"
                  title="Редактирование накладной"
                  trigger="hover"
                >
                  <AButton
                    color="warning"
                    size="sm"
                    icon
                    @click.stop="handleEdit(item)"
                  >
                    <i class="fas fa-edit"></i>
                  </AButton>
                </APopover>
                <APopover
                  v-if="canDelete(item)"
                  title="Удалить накладную"
                  trigger="hover"
                >
                  <AButton
                    color="danger"
                    size="sm"
                    icon
                    :disabled="deleteInvoiceShoeMutation.isPending.value"
                    @click.stop="handleDelete(item)"
                  >
                    <i class="fas fa-trash"></i>
                  </AButton>
                </APopover>
              </div>
            </template>
          </InvoiceShoeTable>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <div v-if="showPagination" class="invoice-shoe-list__pagination d-flex justify-content-end">
      <BasePagination
        :current-page="filter.pageable?.page ?? 0"
        :page-size="filter.pageable?.size ?? 20"
        :total-pages="data?.totalPages ?? 0"
        :total-elements="data?.totalElements ?? 0"
        @page-change="handlePageChange"
      />
    </div>

    <!-- Дополнительный слот для контента снизу -->
    <div v-if="$slots.footer" class="invoice-shoe-list__footer mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

