<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  useInvoiceShoe,
  InvoiceShoeInfoCard,
} from '@rupoi/entities/invoice-shoe'
import {
  OrderShoeCommonInfoCard,
  OrderShoeFittingsCard,
  OrderShoeTechnicalOperationsCard
} from '@rupoi/entities/order-shoe'
import { AButton } from '@common/shared/ui'
import { BaseTabs, type TabItem, BaseStatusTag } from '@rupoi/shared/ui'
import { RouteConfig, InvoiceStatus } from '@rupoi/shared/constant'
import type { ID } from '@rupoi/shared/model'
import { usePermissions } from '@rupoi/entities/user'

const router = useRouter()
const route = useRoute()

// Permissions
const { canEditInvoice, canDeleteInvoice } = usePermissions()

const invoiceId = computed(() => Number(route.params.id) as ID)

const {
  invoiceShoe,
  isLoading,
  query,
  deleteInvoiceShoeMutation
} = useInvoiceShoe({ id: invoiceId })
const isError = computed(() => query.isError.value)

// Активный таб
const activeTab = ref<string>('invoice')

// Конфигурация табов
const tabs: TabItem[] = [
  {
    key: 'invoice',
    label: 'Информация о накладной',
    icon: 'fas fa-file-invoice',
  },
  {
    key: 'order',
    label: 'Информация о заказе',
    icon: 'fas fa-shoe-prints',
  },
  {
    key: 'fittings',
    label: 'Примерки',
    icon: 'fas fa-tools',
  },
  {
    key: 'technical',
    label: 'Технические операции',
    icon: 'fas fa-cogs',
  },
]

// Навигация
function goBack() {
  router.push({ name: RouteConfig.Invoice.shoe.list.name })
}

function goToEdit() {
  router.push({
    name: RouteConfig.Invoice.shoe.edit.name,
    params: { id: invoiceId.value }
  })
}

function handleDelete() {
  if (confirm(`Вы уверены, что хотите удалить накладную № ${invoiceShoe.value?.number || invoiceId.value}?`)) {
    deleteInvoiceShoeMutation.mutateAsync(invoiceId.value).then(() => {
      // Возвращаемся на страницу списка после удаления
      router.push({ name: RouteConfig.Invoice.shoe.list.name })
    })
  }
}

// Заголовок накладной
const invoiceTitle = computed(() => {
  if (!invoiceShoe.value) return ''
  return `Накладная № ${invoiceShoe.value.number || invoiceId.value}`
})

// Получаем order для отображения карточек
const orderShoe = computed(() => invoiceShoe.value?.order ?? null)

const canModify = computed(() => invoiceShoe.value?.status === InvoiceStatus.ACTIVE && canEditInvoice.value)

const canDelete = computed(() => invoiceShoe.value?.status === InvoiceStatus.ACTIVE && canDeleteInvoice.value)
</script>

<template>
  <div>
    <!-- Заголовок и действия -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body py-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-3">
                <BaseStatusTag v-if="invoiceShoe" :status="invoiceShoe.status" size="sm" />
                <h4 class="mb-0">{{ invoiceTitle }}</h4>
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
                    v-if="invoiceShoe && canModify"
                    color="warning"
                    size="sm"
                    @click="goToEdit"
                  >
                    <i class="fas fa-edit me-2"></i>
                    Редактировать
                  </AButton>
                  <AButton
                    v-if="invoiceShoe && canDelete"
                    color="danger"
                    size="sm"
                    :disabled="deleteInvoiceShoeMutation.isPending.value"
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
            <p class="text-muted small mb-0">Не удалось загрузить данные накладной</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Контент с табами -->
    <template v-if="invoiceShoe">
      <div class="row">
        <div class="col-12">
          <BaseTabs v-model="activeTab" :tabs="tabs" variant="pills" size="md">
            <template #default="{ activeTab: currentTab }">
              <!-- Информация о накладной -->
              <InvoiceShoeInfoCard v-if="currentTab === 'invoice'" :data="invoiceShoe" />

              <!-- Информация о заказе -->
              <OrderShoeCommonInfoCard v-if="currentTab === 'order' && orderShoe" :data="orderShoe" />

              <!-- Примерки -->
              <OrderShoeFittingsCard v-if="currentTab === 'fittings' && orderShoe" :data="orderShoe" />

              <!-- Технические операции -->
              <OrderShoeTechnicalOperationsCard v-if="currentTab === 'technical' && orderShoe" :data="orderShoe" />
            </template>
          </BaseTabs>
        </div>
      </div>
    </template>
  </div>
</template>

