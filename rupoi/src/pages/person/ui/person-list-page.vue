<script setup lang="ts">
import { useRouter } from 'vue-router'
import { PersonList } from '@rupoi/widgets'
import { RouteConfig } from '@rupoi/shared/constant'
import {AButton} from "@common/shared/ui";
import { usePermissions } from '@rupoi/entities/user'

const router = useRouter()
const { canCreatePerson } = usePermissions()

function handleCreate() {
  router.push({ name: RouteConfig.Person.create.name })
}
</script>

<template>
  <!-- Заголовок страницы -->
  <div class="row mb-4">
    <div class="col-12">
      <div class="d-flex justify-content-end align-items-center">
        <AButton
          v-if="canCreatePerson"
          color="success"
          size="sm"
          @click="handleCreate"
        >
          <i class="fas fa-plus me-2"></i>
          Создать личное дело
        </AButton>
      </div>
    </div>
  </div>

  <!-- Виджет со списком персон -->
  <div class="row">
    <div class="col-12">
      <PersonList />
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  max-width: 1600px;
}

h4 {
  color: #344767;
  font-weight: 600;
}

.text-muted {
  font-size: 0.875rem;
}
</style>
