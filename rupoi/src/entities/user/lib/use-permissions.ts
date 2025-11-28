import { computed } from 'vue'
import { userModel } from '@rupoi/entities/user'
import { UserRole } from '@rupoi/shared/constant'
import { hasAnyRole } from '@rupoi/shared/lib'

/**
 * Composable для проверки прав доступа к различным действиям
 * 
 * Предоставляет reactive computed свойства для проверки прав текущего пользователя.
 * Автоматически реагирует на изменение ролей пользователя.
 * 
 * @returns объект с computed свойствами для проверки прав
 * 
 * @example
 * ```vue
 * <script setup>
 * const { canEditOrder, canDeleteOrder } = usePermissions()
 * </script>
 * 
 * <template>
 *   <button v-if="canEditOrder">Редактировать</button>
 *   <button v-if="canDeleteOrder">Удалить</button>
 * </template>
 * ```
 */
export function usePermissions() {
  const userStore = userModel.useStore()
  
  const userRoles = computed(() => userStore.roles)
  
  // --- Личные дела (Person) ---
  const canViewPerson = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.REGISTRATION,
      UserRole.MEDICAL_DEPARTMENT,
      UserRole.CHIEF_DOCTOR,
      UserRole.DISPATCHER,
    ])
  )
  
  const canCreatePerson = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.REGISTRATION,
    ])
  )
  
  const canEditPerson = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.REGISTRATION,
      UserRole.MEDICAL_DEPARTMENT,
    ])
  )
  
  const canDeletePerson = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.REGISTRATION,
    ])
  )
  
  // --- Заказы (Orders) ---
  const canViewOrder = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.MEDICAL_DEPARTMENT,
      UserRole.CHIEF_DOCTOR,
      UserRole.DISPATCHER,
      UserRole.WORKSHOP,
    ])
  )
  
  const canCreateOrder = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.MEDICAL_DEPARTMENT,
    ])
  )
  
  const canEditOrder = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.MEDICAL_DEPARTMENT,
    ])
  )
  
  const canDeleteOrder = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.MEDICAL_DEPARTMENT,
    ])
  )
  
  const canApproveOrder = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.CHIEF_DOCTOR,
    ])
  )
  
  const canAssignOrder = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.DISPATCHER,
    ])
  )
  
  const canManufactureOrder = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.WORKSHOP,
    ])
  )
  
  // --- Накладные (Invoices) ---
  const canViewInvoice = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.MEDICAL_DEPARTMENT,
      UserRole.CHIEF_DOCTOR,
      UserRole.WAREHOUSE,
      UserRole.WORKSHOP,
    ])
  )
  
  const canCreateInvoice = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.WORKSHOP,
    ])
  )
  
  const canEditInvoice = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.WORKSHOP,
    ])
  )
  
  const canDeleteInvoice = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.WORKSHOP,
    ])
  )
  
  // --- Склад (Warehouse) ---
  const canAccessWarehouse = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.WAREHOUSE,
    ])
  )
  
  // --- Отчеты (Reports) ---
  const canAccessReports = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.REGISTRATION,
      UserRole.MEDICAL_DEPARTMENT,
      UserRole.CHIEF_DOCTOR,
      UserRole.DISPATCHER,
      UserRole.WORKSHOP,
      UserRole.WAREHOUSE,
    ])
  )
  
  const canEditReports = computed(() => 
    hasAnyRole(userRoles.value, [
      UserRole.ADMINISTRATOR,
      UserRole.REGISTRATION,
      UserRole.MEDICAL_DEPARTMENT,
      UserRole.WORKSHOP,
      UserRole.WAREHOUSE,
    ])
  )
  
  return {
    userRoles,
    
    // Person
    canViewPerson,
    canCreatePerson,
    canEditPerson,
    canDeletePerson,
    
    // Orders
    canViewOrder,
    canCreateOrder,
    canEditOrder,
    canDeleteOrder,
    canApproveOrder,
    canAssignOrder,
    canManufactureOrder,
    
    // Invoices
    canViewInvoice,
    canCreateInvoice,
    canEditInvoice,
    canDeleteInvoice,
    
    // Warehouse
    canAccessWarehouse,
    
    // Reports
    canAccessReports,
    canEditReports,
  }
}

