<script setup lang="ts">
import { computed } from 'vue'
import { useFilter } from '@rupoi/shared/lib'
import {
  OrderShoeTable,
  OrderShoeFilterForm,
  useOrderShoe,
  type OrderShoeListParams,
  type OrderShoeDTO,
  type OrderShoeFilterFormValues,
} from '@rupoi/entities/order-shoe'
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

const { filter, updateFilter } = useFilter<OrderShoeListParams>({
  initFilter: () => ({
    personId: props.personId,
    status: undefined,
    priority: undefined,
    query: undefined,
    pageable: { page: 0, size: 20, sort: [] }
  })
})

const filterFormValues = computed<OrderShoeFilterFormValues>(() => ({
  query: filter.value.query ?? null,
  status: filter.value.status ?? [],
  priority: filter.value.priority ?? null,
}))

function handleSearch(data: OrderShoeFilterFormValues) {
  const statusValue = data.status as OrderStatus[]
  const priorityValue = data.priority as OrderPriority | undefined
  updateFilter({
    query: data.query ?? undefined,
    status: statusValue ?? undefined,
    priority: priorityValue ?? undefined,
    pageable: { page: 0, size: filter.value.pageable?.size ?? 20, sort: filter.value.pageable?.sort ?? [] }
  })
}

function handleReset(data: OrderShoeFilterFormValues) {
  const statusValue = data.status as OrderStatus[]
  const priorityValue = data.priority as OrderPriority | undefined
  updateFilter({
    query: data.query ?? undefined,
    status: statusValue ?? undefined,
    priority: priorityValue ?? undefined,
    pageable: { page: 0, size: 20, sort: [] }
  })
}

function handlePageChange(page: number) {
  updateFilter({
    pageable: { page, size: filter.value.pageable?.size ?? 20, sort: filter.value.pageable?.sort ?? [] }
  })
}

function handleSortChange(sortStrings: string[]) {
  updateFilter({
    pageable: { page: filter.value.pageable?.page ?? 0, size: filter.value.pageable?.size ?? 20, sort: sortStrings }
  })
}

function handleView(order: OrderShoeDTO) {
  router.push({
    name: RouteConfig.Order.shoe.view.name,
    params: { id: order.id }
  })
}

function handleEdit(order: OrderShoeDTO) {
  router.push({
    name: RouteConfig.Order.shoe.edit.name,
    params: { id: order.id }
  })
}

const {
  orderShoeList: data,
  isLoading,
  listQuery,
  deleteOrderShoeMutation
} = useOrderShoe({ listParams: filter })
const isError = computed(() => listQuery?.isError.value ?? false)

// Delete handler
function handleDelete(order: OrderShoeDTO) {
  if (confirm(`Вы уверены, что хотите удалить заказ № ${order.orderNumber || order.id}?`)) {
    deleteOrderShoeMutation.mutateAsync(order.id).then(() => {
      listQuery?.refetch()
    })
  }
}

function handleStatusChangeSuccess() {
  listQuery?.refetch()
}

function canModify(order: OrderShoeDTO) {
  return order.orderStatus === OrderStatus.NEW && canEditOrder.value
}

function canDelete(order: OrderShoeDTO) {
  return order.orderStatus === OrderStatus.NEW && canDeleteOrder.value
}

const hasData = computed(() => data?.value && data.value.content.length > 0)
const showPagination = computed(() => hasData.value && data?.value && data.value.totalElements > 0)
</script>

<template>
  <div class="order-shoe-list">
    <div class="order-shoe-list__filters mb-4">
      <OrderShoeFilterForm :data="filterFormValues" @search="handleSearch" @reset="handleReset" />
    </div>

    <div class="order-shoe-list__table mb-4">
      <div class="card">
        <div class="card-body p-0">
          <OrderShoeTable
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
                    :disabled="deleteOrderShoeMutation.isPending.value"
                    @click.stop="handleDelete(item)"
                  >
                    <i class="fas fa-trash"></i>
                  </AButton>
                </APopover>
                <OrderChangeStatusControl
                  :order-id="item.id"
                  :order-kind="OrderKind.SHOE"
                  :current-status="item.orderStatus"
                  icon-only
                  @success="handleStatusChangeSuccess"
                />
              </div>
            </template>
          </OrderShoeTable>
        </div>
      </div>
    </div>

    <div v-if="showPagination" class="order-shoe-list__pagination d-flex justify-content-end">
      <BasePagination
        :current-page="filter.pageable?.page ?? 0"
        :page-size="filter.pageable?.size ?? 20"
        :total-pages="data?.totalPages ?? 0"
        :total-elements="data?.totalElements ?? 0"
        @page-change="handlePageChange"
      />
    </div>

    <div v-if="$slots.footer" class="order-shoe-list__footer mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

