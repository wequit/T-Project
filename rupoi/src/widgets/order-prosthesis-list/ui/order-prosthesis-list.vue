<script setup lang="ts">
import { computed } from 'vue'
import { useFilter } from '@rupoi/shared/lib'
import {
  OrderProsthesisTable,
  OrderProsthesisFilterForm,
  useOrderProsthesis,
  type OrderProsthesisListParams,
  type OrderProsthesisDTO,
  type OrderProsthesisFilterFormValues,
} from '@rupoi/entities/order-prosthesis'
import { BasePagination } from '@rupoi/shared/ui'
import { AButton, APopover } from '@common/shared/ui'
import { RouteConfig, OrderStatus, OrderPriority } from '@rupoi/shared/constant'
import { router } from '@rupoi/app/router'
import type { UUID } from '@rupoi/shared/model'
import { OrderChangeStatusControl, OrderKind } from '@rupoi/features/order-change-status'
import { usePermissions } from '@rupoi/entities/user'

interface Props {
  personId?: UUID
}

const props = defineProps<Props>()

// Permissions
const { canEditOrder, canDeleteOrder, canViewOrder } = usePermissions()

// Filter logic
const { filter, updateFilter } = useFilter<OrderProsthesisListParams>({
  initFilter: () => ({
    personId: props.personId,
    status: undefined,
    priority: undefined,
    query: undefined,
    pageable: {
      page: 0,
      size: 20,
      sort: []
    }
  })
})

// Computed для передачи в форму фильтрации
const filterFormValues = computed<OrderProsthesisFilterFormValues>(() => ({
  query: filter.value.query ?? null,
  status: filter.value.status ?? [],
  priority: filter.value.priority ?? null,
}))

function handleSearch(data: OrderProsthesisFilterFormValues) {
  // Сбрасываем на первую страницу при явном поиске
  const statusValue = data.status as OrderStatus[]
  const priorityValue = data.priority as OrderPriority | undefined

  updateFilter({
    query: data.query ?? undefined,
    status: statusValue ?? [],
    priority: priorityValue ?? undefined,
    pageable: {
      page: 0,
      size: filter.value.pageable?.size ?? 20,
      sort: filter.value.pageable?.sort ?? []
    }
  })
}

function handleReset(data: OrderProsthesisFilterFormValues) {
  const statusValue = data.status as OrderStatus[]
  const priorityValue = data.priority as OrderPriority | undefined

  updateFilter({
    query: data.query ?? undefined,
    status: statusValue ?? [],
    priority: priorityValue ?? undefined,
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
function handleView(order: OrderProsthesisDTO) {
  router.push({
    name: RouteConfig.Order.prosthesis.view.name,
    params: { id: order.id }
  })
}

function handleEdit(order: OrderProsthesisDTO) {
  router.push({
    name: RouteConfig.Order.prosthesis.edit.name,
    params: { id: order.id }
  })
}

// Loading Data
const {
  orderProsthesisList: data,
  isLoading,
  listQuery,
  deleteOrderProsthesisMutation
} = useOrderProsthesis({ listParams: filter })
const isError = computed(() => listQuery?.isError.value ?? false)

// Delete handler
function handleDelete(order: OrderProsthesisDTO) {
  if (confirm(`Вы уверены, что хотите удалить заказ № ${order.orderNumber || order.id}?`)) {
    deleteOrderProsthesisMutation.mutateAsync(order.id).then(() => {
      // Инвалидируем список после удаления
      listQuery?.refetch()
    })
  }
}

function handleStatusChangeSuccess() {
  listQuery?.refetch()
}

function canModify(order: OrderProsthesisDTO) {
  return order.orderStatus === OrderStatus.NEW && canEditOrder.value
}

function canDelete(order: OrderProsthesisDTO) {
  return order.orderStatus === OrderStatus.NEW && canDeleteOrder.value
}

// Computed
const hasData = computed(() => data?.value && data.value.content.length > 0)
const showPagination = computed(() => hasData.value && data?.value && data.value.totalElements > 0)
</script>

<template>
  <div class="order-prosthesis-list">
    <!-- Форма фильтрации -->
    <div class="order-prosthesis-list__filters mb-4">
      <OrderProsthesisFilterForm
        :data="filterFormValues"
        @search="handleSearch"
        @reset="handleReset"
      />
    </div>

    <!-- Таблица -->
    <div class="order-prosthesis-list__table mb-4">
      <div class="card">
        <div class="card-body p-0">
          <OrderProsthesisTable
            :data="data?.content ?? []"
            :is-loading="isLoading"
            :is-error="isError"
            @sort="handleSortChange"
          >
            <template #actions="{ item }">
              <div class="d-flex gap-2 justify-content-center">
                <APopover
                  v-if="canViewOrder"
                  title="Просмотр заказа"
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
                  title="Редактирование заказа"
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
                  title="Удалить заказ"
                  trigger="hover"
                >
                  <AButton
                    color="danger"
                    size="sm"
                    icon
                    :disabled="deleteOrderProsthesisMutation.isPending.value"
                    @click.stop="handleDelete(item)"
                  >
                    <i class="fas fa-trash"></i>
                  </AButton>
                </APopover>
                <OrderChangeStatusControl
                  :order-id="item.id"
                  :order-kind="OrderKind.PROSTHESIS"
                  :current-status="item.orderStatus"
                  icon-only
                  @success="handleStatusChangeSuccess"
                />
              </div>
            </template>
          </OrderProsthesisTable>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <div v-if="showPagination" class="order-prosthesis-list__pagination d-flex justify-content-end">
      <BasePagination
        :current-page="filter.pageable?.page ?? 0"
        :page-size="filter.pageable?.size ?? 20"
        :total-pages="data?.totalPages ?? 0"
        :total-elements="data?.totalElements ?? 0"
        @page-change="handlePageChange"
      />
    </div>

    <!-- Дополнительный слот для контента снизу -->
    <div v-if="$slots.footer" class="order-prosthesis-list__footer mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

