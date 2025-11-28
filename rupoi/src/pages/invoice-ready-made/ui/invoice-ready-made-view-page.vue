<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  useInvoiceReadyMade,
  InvoiceReadyMadeInfoCard,
} from '@rupoi/entities/invoice-ready-made'
import {
  OrderReadyMadeCommonInfoCard,
  OrderReadyMadeFittingsCard,
  OrderReadyMadeMaterialsCard
} from '@rupoi/entities/order-ready-made'
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
  invoiceReadyMade,
  isLoading,
  query,
  deleteInvoiceReadyMadeMutation
} = useInvoiceReadyMade({ id: invoiceId })
const isError = computed(() => query.isError.value)

const activeTab = ref<string>('invoice')

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
    key: 'fittings',
    label: 'Примерки',
    icon: 'fas fa-tools',
  },
  {
    key: 'materials',
    label: 'Материалы',
    icon: 'fas fa-cogs',
  },
]

function goBack() {
  router.push({ name: RouteConfig.Invoice.readyMade.list.name })
}

function goToEdit() {
  router.push({
    name: RouteConfig.Invoice.readyMade.edit.name,
    params: { id: invoiceId.value }
  })
}

function handleDelete() {
  if (confirm(`Вы уверены, что хотите удалить накладную № ${invoiceReadyMade.value?.number || invoiceId.value}?`)) {
    deleteInvoiceReadyMadeMutation.mutateAsync(invoiceId.value).then(() => {
      router.push({ name: RouteConfig.Invoice.readyMade.list.name })
    })
  }
}

const invoiceTitle = computed(() => {
  if (!invoiceReadyMade.value) return ''
  return `Накладная № ${invoiceReadyMade.value.number || invoiceId.value}`
})

const orderReadyMade = computed(() => invoiceReadyMade.value?.order ?? null)

const canModify = computed(() => invoiceReadyMade.value?.status === InvoiceStatus.ACTIVE && canEditInvoice.value)

const canDelete = computed(() => invoiceReadyMade.value?.status === InvoiceStatus.ACTIVE && canDeleteInvoice.value)
</script>

<template>
  <div>
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body py-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-3">
                <BaseStatusTag v-if="invoiceReadyMade" :status="invoiceReadyMade.status" size="sm" />
                <h4 class="mb-0">{{ invoiceTitle }}</h4>
              </div>
              <div class="d-flex justify-content-between align-items-center gap-2">
                <AButton color="secondary" size="sm" variant="outline" @click="goBack">
                  <i class="fas fa-arrow-left me-2"></i>
                  Назад
                </AButton>
                <div class="d-flex gap-2">
                  <AButton
                    v-if="invoiceReadyMade && canModify"
                    color="warning"
                    size="sm"
                    @click="goToEdit"
                  >
                    <i class="fas fa-edit me-2"></i>
                    Редактировать
                  </AButton>
                  <AButton
                    v-if="invoiceReadyMade && canDelete"
                    color="danger"
                    size="sm"
                    :disabled="deleteInvoiceReadyMadeMutation.isPending.value"
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

    <template v-if="invoiceReadyMade">
      <div class="row">
        <div class="col-12">
          <BaseTabs v-model="activeTab" :tabs="tabs" variant="pills" size="md">
            <template #default="{ activeTab: currentTab }">
              <InvoiceReadyMadeInfoCard v-if="currentTab === 'invoice'" :data="invoiceReadyMade" />
              <OrderReadyMadeCommonInfoCard v-if="currentTab === 'order' && orderReadyMade" :data="orderReadyMade" />
              <OrderReadyMadeFittingsCard v-if="currentTab === 'fittings' && orderReadyMade" :data="orderReadyMade" />
              <OrderReadyMadeMaterialsCard v-if="currentTab === 'materials' && orderReadyMade" :data="orderReadyMade" />
            </template>
          </BaseTabs>
        </div>
      </div>
    </template>
  </div>
</template>
