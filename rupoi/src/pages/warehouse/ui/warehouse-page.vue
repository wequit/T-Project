<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseTabs, type TabItem } from '@rupoi/shared/ui'
import { AButton } from '@common/shared/ui'
import { WarehouseOrderList } from '@rupoi/widgets/warehouse-order-list'
import { orderProsthesisService } from '@rupoi/entities/order-prosthesis/api/service'
import { orderShoeService } from '@rupoi/entities/order-shoe/api/service'
import { orderOttobockService } from '@rupoi/entities/order-ottobock/api/service'
import { orderRepairService } from '@rupoi/entities/order-repair/api/service'
import { orderReadyMadeService } from '@rupoi/entities/order-ready-made/api/service'
import { OrderProsthesisTable } from '@rupoi/entities/order-prosthesis'
import { OrderShoeTable } from '@rupoi/entities/order-shoe'
import { OrderOttobockTable } from '@rupoi/entities/order-ottobock'
import { OrderRepairTable } from '@rupoi/entities/order-repair'
import { OrderReadyMadeTable } from '@rupoi/entities/order-ready-made'
import { RouteConfig } from '@rupoi/shared/constant'
import { router } from '@rupoi/app/router'
import { OrderChangeStatusControl, OrderKind } from '@rupoi/features/order-change-status'
import { APopover } from '@common/shared/ui'

type TabKey = 'prosthesis' | 'shoe' | 'ottobock' | 'repair' | 'ready-made'

const activeTab = ref<TabKey>('prosthesis')

const tabs: TabItem[] = [
  { key: 'prosthesis', label: 'Протезы', icon: 'fas fa-hand-paper' },
  { key: 'shoe', label: 'Обувь', icon: 'fas fa-shoe-prints' },
  { key: 'ottobock', label: 'Оттобок', icon: 'fas fa-wheelchair' },
  { key: 'repair', label: 'Ремонт', icon: 'fas fa-tools' },
  { key: 'ready-made', label: 'ПОИ', icon: 'fas fa-box' },
]

const orderServices = [
  { key: 'prosthesis', service: orderProsthesisService, table: OrderProsthesisTable, orderKind: OrderKind.PROSTHESIS },
  { key: 'shoe', service: orderShoeService, table: OrderShoeTable, orderKind: OrderKind.SHOE },
  { key: 'ottobock', service: orderOttobockService, table: OrderOttobockTable, orderKind: OrderKind.OTTOBOCK },
  { key: 'repair', service: orderRepairService, table: OrderRepairTable, orderKind: OrderKind.REPAIR },
  { key: 'ready-made', service: orderReadyMadeService, table: OrderReadyMadeTable, orderKind: OrderKind.READY_MADE },
]

const activeService = computed(() => {
  return orderServices.find(s => s.key === activeTab.value)!
})

const warehouseListRef = ref<InstanceType<typeof WarehouseOrderList> | null>(null)

interface OrderListItem {
  id: string | number
  orderStatus: string
}

function handleViewOrder(item: OrderListItem) {
  const routeMap: Record<TabKey, string> = {
    prosthesis: RouteConfig.Order.prosthesis.view.name,
    shoe: RouteConfig.Order.shoe.view.name,
    ottobock: RouteConfig.Order.ottobock.view.name,
    repair: RouteConfig.Order.repair.view.name,
    'ready-made': RouteConfig.Order.readyMade.view.name,
  }

  router.push({
    name: routeMap[activeTab.value],
    params: { id: item.id }
  })
}

</script>

<template>
  <div class="container-fluid py-4">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <BaseTabs
              v-model="activeTab"
              :tabs="tabs"
              variant="pills"
            >
              <WarehouseOrderList
                ref="warehouseListRef"
                :key="activeTab"
                :order-type="activeTab"
                :service="activeService.service"
                :table-component="activeService.table"
              >
                <template #actions="{ item, onStatusChangeSuccess }">
                  <div class="d-flex gap-2 justify-content-center">
                    <APopover title="Просмотр заказа" trigger="hover">
                      <AButton
                        color="primary"
                        size="sm"
                        icon
                        title="Просмотр"
                        @click="handleViewOrder(item)"
                      >
                        <i class="fas fa-eye"></i>
                      </AButton>
                    </APopover>
                    <OrderChangeStatusControl
                      :order-id="item.id"
                      :order-kind="activeService.orderKind"
                      :current-status="item.orderStatus"
                      icon-only
                      @success="onStatusChangeSuccess?.()"
                    />
                  </div>
                </template>
              </WarehouseOrderList>
            </BaseTabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

