<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  useOrderOttobock,
  OrderOttobockCommonInfoCard,
  OrderOttobockMaterialsCard,
  OrderOttobockFittingsCard
} from '@rupoi/entities/order-ottobock'
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
  orderOttobock,
  orderOttobockHistory,
  isLoading,
  query,
  deleteOrderOttobockMutation,
} = useOrderOttobock({ id: orderId })
const isError = computed(() => query.isError.value)

// История статусов

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
    name: RouteConfig.Order.ottobock.edit.name,
    params: { id: orderId.value }
  })
}

function handleDelete() {
  if (confirm(`Вы уверены, что хотите удалить заказ № ${orderOttobock.value?.orderNumber || orderId.value}?`)) {
    deleteOrderOttobockMutation.mutateAsync(orderId.value).then(() => {
      router.back()
    })
  }
}

// Заголовок заказа
const orderTitle = computed(() => {
  if (!orderOttobock.value) return ''
  return `Заказ № ${orderOttobock.value.orderNumber || orderId.value}`
})

const canModify = computed(() => orderOttobock.value?.orderStatus === OrderStatus.NEW && canEditOrder.value)

const canDelete = computed(() => orderOttobock.value?.orderStatus === OrderStatus.NEW && canDeleteOrder.value)
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
                <BaseStatusTag v-if="orderOttobock" :status="orderOttobock.orderStatus" size="sm" />
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
                    v-if="orderOttobock && canModify"
                    color="warning"
                    size="sm"
                    @click="goToEdit"
                  >
                    <i class="fas fa-edit me-2"></i>
                    Редактировать
                  </AButton>
                  <AButton
                    v-if="orderOttobock && canDelete"
                    color="danger"
                    size="sm"
                    :disabled="deleteOrderOttobockMutation.isPending.value"
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
    <template v-if="orderOttobock">
      <!-- Управление статусом заказа -->
      <div class="row mb-4">
        <div class="col-12">
          <OrderChangeStatusControl
            :order-id="orderOttobock.id"
            :order-kind="OrderKind.OTTOBOCK"
            :current-status="orderOttobock.orderStatus"
          />
        </div>
      </div>

      <!-- Контент с табами -->
      <div class="row">
        <div class="col-12">
          <BaseTabs v-model="activeTab" :tabs="tabs" variant="pills" size="md">
            <template #default="{ activeTab: currentTab }">
              <OrderOttobockCommonInfoCard v-if="currentTab === 'info'" :data="orderOttobock" />
              <OrderOttobockMaterialsCard v-if="currentTab === 'materials'" :data="orderOttobock" />
              <OrderOttobockFittingsCard v-if="currentTab === 'fittings'" :data="orderOttobock" />
              <OrderStatusHistoryCard v-if="currentTab === 'history'" :data="orderOttobockHistory || []" />
              <OrderFilesList
                v-if="currentTab === 'files'"
                :files="orderOttobock.files"
                :order-status="orderOttobock.orderStatus"
                :order-id="orderOttobock.id"
              />
            </template>
          </BaseTabs>
        </div>
      </div>
    </template>
  </div>
</template>
