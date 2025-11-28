<script setup lang="ts">
console.log('[RedirectPage] Script setup executing...')

import { onMounted, onUnmounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userModel } from '@rupoi/entities/user'
import { getFirstAccessibleRoute } from '@rupoi/app/lib'
import { storeToRefs } from 'pinia'

console.log('[RedirectPage] Imports completed')

const router = useRouter()
console.log('[RedirectPage] Router initialized')

const userStore = userModel.useStore()
console.log('[RedirectPage] UserStore initialized')

const { roles } = storeToRefs(userStore)
console.log('[RedirectPage] Roles ref created, current value:', roles.value)

const hasRedirected = ref(false)
let timeoutId: NodeJS.Timeout | null = null

// Функция редиректа
const performRedirect = () => {
  try {
    console.log('[RedirectPage] performRedirect called, hasRedirected:', hasRedirected.value)
    if (hasRedirected.value) {
      console.log('[RedirectPage] Already redirected, skipping')
      return
    }
    
    hasRedirected.value = true
    console.log('[RedirectPage] Roles:', roles.value)
    const firstRoute = getFirstAccessibleRoute(roles.value)
    console.log('[RedirectPage] Redirecting to:', firstRoute)
    router.replace(firstRoute)
  } catch (error) {
    console.error('[RedirectPage] Error in performRedirect:', error)
  }
}

onMounted(() => {
  try {
    console.log('[RedirectPage] onMounted called')
    console.log('[RedirectPage] Current roles:', roles.value)
    
    // Если роли уже загружены - сразу редиректим
    if (roles.value && roles.value.length > 0) {
      console.log('[RedirectPage] Roles already loaded, redirecting immediately')
      performRedirect()
      return
    }
    
    console.log('[RedirectPage] Roles not loaded yet, setting timeout...')
    // Таймаут: если через 2 секунды роли не загрузились, считаем что у пользователя нет доступа
    timeoutId = setTimeout(() => {
      console.log('[RedirectPage] Timeout reached: roles not loaded, redirecting anyway')
      console.log('[RedirectPage] Final roles value:', roles.value)
      performRedirect()
    }, 2000)
  } catch (error) {
    console.error('[RedirectPage] Error in onMounted:', error)
  }
})

onUnmounted(() => {
  console.log('[RedirectPage] onUnmounted called')
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

// Следим за изменением ролей и редиректим когда они загрузятся
watch(roles, (newRoles) => {
  try {
    console.log('[RedirectPage] Roles watcher triggered, new roles:', newRoles)
    if (newRoles && newRoles.length > 0) {
      console.log('[RedirectPage] Roles loaded via watcher, clearing timeout and redirecting')
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      performRedirect()
    }
  } catch (error) {
    console.error('[RedirectPage] Error in roles watcher:', error)
  }
}, { immediate: false })

console.log('[RedirectPage] Script setup complete')
</script>

<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
  </div>
</template>

