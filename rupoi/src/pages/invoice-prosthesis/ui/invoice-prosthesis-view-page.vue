<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  useInvoiceProsthesis,
  InvoiceProsthesisInfoCard,
} from '@rupoi/entities/invoice-prosthesis'
import {
  OrderProsthesisCommonInfoCard,
  OrderProsthesisComponentsCard,
  OrderProsthesisFittingsCard
} from '@rupoi/entities/order-prosthesis'
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
  invoiceProsthesis,
  isLoading,
  query,
  deleteInvoiceProsthesisMutation
} = useInvoiceProsthesis({ id: invoiceId })
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
    icon: 'fas fa-file-medical',
  },
  {
    key: 'components',
    label: 'Компоненты протеза',
    icon: 'fas fa-cogs',
  },
  {
    key: 'fittings',
    label: 'Примерки',
    icon: 'fas fa-tools',
  },
]

// Навигация
function goBack() {
  router.push({ name: RouteConfig.Invoice.prosthesis.list.name })
}

function goToEdit() {
  router.push({
    name: RouteConfig.Invoice.prosthesis.edit.name,
    params: { id: invoiceId.value }
  })
}

function handleDelete() {
  if (confirm(`Вы уверены, что хотите удалить накладную № ${invoiceProsthesis.value?.number || invoiceId.value}?`)) {
    deleteInvoiceProsthesisMutation.mutateAsync(invoiceId.value).then(() => {
      // Возвращаемся на страницу списка после удаления
      router.push({ name: RouteConfig.Invoice.prosthesis.list.name })
    })
  }
}

// Заголовок накладной
const invoiceTitle = computed(() => {
  if (!invoiceProsthesis.value) return ''
  return `Накладная № ${invoiceProsthesis.value.number || invoiceId.value}`
})

// Получаем order для отображения карточек
const orderProsthesis = computed(() => invoiceProsthesis.value?.order ?? null)

const canModify = computed(() => invoiceProsthesis.value?.status === InvoiceStatus.ACTIVE && canEditInvoice.value)

const canDelete = computed(() => invoiceProsthesis.value?.status === InvoiceStatus.ACTIVE && canDeleteInvoice.value)
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
                <BaseStatusTag v-if="invoiceProsthesis" :status="invoiceProsthesis.status" size="sm" />
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
                    v-if="invoiceProsthesis && canModify"
                    color="warning"
                    size="sm"
                    @click="goToEdit"
                  >
                    <i class="fas fa-edit me-2"></i>
                    Редактировать
                  </AButton>
                  <AButton
                    v-if="invoiceProsthesis && canDelete"
                    color="danger"
                    size="sm"
                    :disabled="deleteInvoiceProsthesisMutation.isPending.value"
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
    <template v-if="invoiceProsthesis">
      <div class="row">
        <div class="col-12">
          <BaseTabs v-model="activeTab" :tabs="tabs" variant="pills" size="md">
            <template #default="{ activeTab: currentTab }">
              <!-- Информация о накладной -->
              <InvoiceProsthesisInfoCard v-if="currentTab === 'invoice'" :data="invoiceProsthesis" />

              <!-- Информация о заказе -->
              <OrderProsthesisCommonInfoCard v-if="currentTab === 'order' && orderProsthesis" :data="orderProsthesis" />

              <!-- Компоненты протеза -->
              <OrderProsthesisComponentsCard v-if="currentTab === 'components' && orderProsthesis" :data="orderProsthesis" />

              <!-- Примерки -->
              <OrderProsthesisFittingsCard v-if="currentTab === 'fittings' && orderProsthesis" :data="orderProsthesis" />
            </template>
          </BaseTabs>
        </div>
      </div>
    </template>
  </div>
</template>
