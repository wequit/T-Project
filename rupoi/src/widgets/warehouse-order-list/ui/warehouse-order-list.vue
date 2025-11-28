<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { OrderStatus } from '@rupoi/shared/constant'
import { BasePagination } from '@rupoi/shared/ui'
import type { PageableDTO } from '@rupoi/shared/model'

// Общий интерфейс для параметров списка заказов
interface OrderListParams {
  status?: OrderStatus[]
  pageable?: PageableDTO
  [key: string]: unknown
}

// Общий интерфейс для ответа списка (пагинированного)
interface PaginatedListDTO<T = unknown> {
  content: T[]
  totalElements: number
  totalPages: number
  [key: string]: unknown
}

interface Props {
  orderType: string
  service: {
    getList: (params: OrderListParams) => Promise<PaginatedListDTO>
  }
  tableComponent: Component
}

const props = defineProps<Props>()

const warehouseStatuses = [OrderStatus.READY, OrderStatus.IN_WAREHOUSE, OrderStatus.DELIVERED]
const pageSize = 20
const currentPage = ref(0)

const ordersQuery = useQuery({
  queryKey: ['warehouse-orders', props.orderType, currentPage],
  queryFn: () => props.service.getList({
    status: warehouseStatuses,
    pageable: { page: currentPage.value, size: pageSize, sort: [] }
  }),
})

const data = computed(() => ordersQuery.data.value)
const paginatedData = computed(() => data.value?.content ?? [])
const isLoading = computed(() => ordersQuery.isLoading.value)
const isError = computed(() => ordersQuery.isError.value)
const totalElements = computed(() => data.value?.totalElements ?? 0)
const totalPages = computed(() => data.value?.totalPages ?? 0)
const showPagination = computed(() => totalElements.value > 0)

function handlePageChange(page: number) {
  currentPage.value = page
}

function handleStatusChangeSuccess() {
  ordersQuery.refetch()
}

defineExpose({
  totalElements,
  refetch: () => ordersQuery.refetch(),
})
</script>

<template>
  <div class="card">
    <div class="card-body p-0">
      <component
        :is="tableComponent"
        :data="paginatedData"
        :is-loading="isLoading"
        :is-error="isError"
      >
        <template #actions="{ item }">
          <slot
            name="actions"
            :item="item"
            :on-status-change-success="handleStatusChangeSuccess"
          />
        </template>
      </component>
      <div v-if="showPagination" class="d-flex justify-content-end p-3">
        <BasePagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total-pages="totalPages"
          :total-elements="totalElements"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

