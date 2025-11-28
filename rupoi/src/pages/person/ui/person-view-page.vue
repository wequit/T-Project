<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePersonOne, PersonCommonInfoCard, PersonContactInfoCard, PersonMedicalInfoCard } from '@rupoi/entities/person'
import { PersonChangeStatus } from '@rupoi/features/person-change-status'
import { RouteConfig } from '@rupoi/shared/constant'
import { AButton } from '@common/shared/ui'
import { BaseTabs, type TabItem, BaseStatusTag } from '@rupoi/shared/ui'
import { usePermissions } from '@rupoi/entities/user'

const route = useRoute()
const router = useRouter()
const { canEditPerson } = usePermissions()

// ID персоны из route params
const personId = computed(() => route.params.id as string)

// Загружаем данные персоны
const { data: person, isLoading, isError } = usePersonOne(personId)

// Активный таб
const activeTab = ref<string>('info')

// Конфигурация табов
const tabs: TabItem[] = [
  {
    key: 'info',
    label: 'Основная информация',
    icon: 'fas fa-user',
  },
  {
    key: 'contact',
    label: 'Контактная информация',
    icon: 'fas fa-phone',
  },
  {
    key: 'medical',
    label: 'Медицинская информация',
    icon: 'fas fa-heartbeat',
  },
]

// Навигация
function goBack() {
  router.push({ name: RouteConfig.Person.list.name })
}

function goToEdit() {
  router.push({
    name: RouteConfig.Person.edit.name,
    params: { id: personId.value }
  })
}

// Полное имя для заголовка
const fullName = computed(() => {
  if (!person.value) return ''
  const parts = [
    person.value.lastName,
    person.value.firstName,
    person.value.patronymic,
  ].filter(Boolean)
  return parts.join(' ')
})
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
                <BaseStatusTag v-if="person" :status="person.status" size="sm" />
                <h4 class="mb-0">Личное дело ({{ fullName || '' }})</h4>
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
                <PersonChangeStatus v-if="person" :person-id="personId" />
                <AButton
                  v-if="person && canEditPerson"
                  color="warning"
                  size="sm"
                  @click="goToEdit"
                >
                  <i class="fas fa-edit me-2"></i>
                  Редактировать
                </AButton>
              </div>
            </div>

            <!-- Управление статусом -->
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
            <p class="text-muted small mb-0">Не удалось загрузить данные персоны</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Контент с табами -->
    <div v-else-if="person" class="row">
      <div class="col-12">
        <BaseTabs v-model="activeTab" :tabs="tabs" variant="pills" size="md">
          <template #default="{ activeTab: currentTab }">
            <PersonCommonInfoCard v-if="currentTab === 'info'" :data="person" />
            <PersonContactInfoCard v-if="currentTab === 'contact'" :data="person" />
            <PersonMedicalInfoCard v-if="currentTab === 'medical'" :data="person" />
          </template></BaseTabs>
      </div>
    </div>
  </div>
</template>

