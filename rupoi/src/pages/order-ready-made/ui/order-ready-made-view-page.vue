<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  useOrderReadyMade,
  OrderReadyMadeCommonInfoCard,
  OrderReadyMadeMaterialsCard,
  OrderReadyMadeFittingsCard
} from '@rupoi/entities/order-ready-made'
import { AButton } from '@common/shared/ui'
import { BaseTabs, type TabItem, BaseStatusTag, OrderStatusHistoryCard, OrderFilesList } from '@rupoi/shared/ui'
import { RouteConfig, OrderStatus } from '@rupoi/shared/constant'
import type { UUID } from '@rupoi/shared/model'
import { OrderChangeStatusControl, OrderKind } from '@rupoi/features/order-change-status'
import { usePermissions } from '@rupoi/entities/user'

const router = useRouter()
const route = useRoute()

// Permissions
const { canEditOrder, canDeleteOrder } = usePermissions()

const orderId = computed(() => route.params.id as UUID)

const {
  orderReadyMade,
  orderReadyMadeHistory,
  isLoading,
  query,
  deleteOrderReadyMadeMutation,
} = useOrderReadyMade({ id: orderId })
const isError = computed(() => query.isError.value)

function handleDelete() {
  if (confirm(`Вы уверены, что хотите удалить заказ № ${orderReadyMade.value?.orderNumber || orderId.value}?`)) {
    deleteOrderReadyMadeMutation.mutateAsync(orderId.value).then(() => {
      router.back()
    })
  }
}

// Активный таб
const activeTab = ref<string>('info')

// Конфигурация табов
const tabs: TabItem[] = [
  {
    key: 'info',
    label: 'Основная информация',
    icon: 'fas fa-file-medical',
  },
  {
    key: 'materials',
    label: 'Материалы',
    icon: 'fas fa-cubes',
  },
  {
    key: 'fittings',
    label: 'Примерки',
    icon: 'fas fa-tools',
  },
  {
    key: 'history',
    label: 'История',
    icon: 'fas fa-history',
  },
  {
    key: 'files',
    label: 'Файлы',
    icon: 'fas fa-paperclip',
  },
]

// Навигация
function goBack() {
  router.back()
}

function goToEdit() {
  router.push({
    name: RouteConfig.Order.readyMade.edit.name,
    params: { id: orderId.value }
  })
}

// Заголовок заказа
const orderTitle = computed(() => {
  if (!orderReadyMade.value) return ''
  return `Заказ № ${orderReadyMade.value.orderNumber || orderId.value}`
})

const canModify = computed(() => orderReadyMade.value?.orderStatus === OrderStatus.NEW && canEditOrder.value)

const canDelete = computed(() => orderReadyMade.value?.orderStatus === OrderStatus.NEW && canDeleteOrder.value)
</script>

<template>
  <div>
    <!-- Заголовок и действия -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body py-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <BaseStatusTag v-if="orderReadyMade" :status="orderReadyMade.orderStatus" size="sm" />
                <h4 class="mb-0">{{ orderTitle }}</h4>
              </div>
              <div class="d-flex justify-content-between align-items-center gap-2">
                <AButton
                  color="secondary"
                  size="sm"
                  variant="outline"
                  @click="goBack"
                >
                  <i class="fas fa-arrow-left me-2"></i>
                  Назад
                </AButton>
                <div class="d-flex gap-2">
                  <AButton
                    v-if="orderReadyMade && canModify"
                    color="warning"
                    size="sm"
                    @click="goToEdit"
                  >
                    <i class="fas fa-edit me-2"></i>
                    Редактировать
                  </AButton>
                  <AButton
                    v-if="orderReadyMade && canDelete"
                    color="danger"
                    size="sm"
                    :disabled="deleteOrderReadyMadeMutation.isPending.value"
                    @click="handleDelete"
                  >
                    <i class="fas fa-trash me-2"></i>
                    Удалить
                  </AButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body text-center py-5">
            <i class="fas fa-spinner fa-spin text-primary" style="font-size: 3rem;"></i>
            <p class="text-muted mt-3 mb-0">Загрузка данных...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="isError" class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body text-center py-5">
            <i class="fas fa-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
            <p class="text-danger fw-semibold mt-3 mb-2">Ошибка загрузки</p>
            <p class="text-muted small mb-0">Не удалось загрузить данные заказа</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Управление статусом заказа и контент -->
    <template v-if="orderReadyMade">
      <!-- Управление статусом заказа -->
      <div class="row mb-4">
        <div class="col-12">
          <OrderChangeStatusControl
            :order-id="orderReadyMade.id"
            :order-kind="OrderKind.READY_MADE"
            :current-status="orderReadyMade.orderStatus"
          />
        </div>
      </div>

      <!-- Контент с табами -->
      <div class="row">
        <div class="col-12">
          <BaseTabs v-model="activeTab" :tabs="tabs" variant="pills" size="md">
            <template #default="{ activeTab: currentTab }">
              <OrderReadyMadeCommonInfoCard v-if="currentTab === 'info'" :data="orderReadyMade" />
              <OrderReadyMadeMaterialsCard v-if="currentTab === 'materials'" :data="orderReadyMade" />
              <OrderReadyMadeFittingsCard v-if="currentTab === 'fittings'" :data="orderReadyMade" />
              <OrderStatusHistoryCard v-if="currentTab === 'history'" :data="orderReadyMadeHistory || []" />
              <OrderFilesList
                v-if="currentTab === 'files'"
                :files="orderReadyMade.files"
                :order-status="orderReadyMade.orderStatus"
                :order-id="orderReadyMade.id"
              />
            </template>
          </BaseTabs>
        </div>
      </div>
    </template>
  </div>
</template>
