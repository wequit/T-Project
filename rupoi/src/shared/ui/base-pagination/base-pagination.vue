<script setup lang="ts">
import { computed } from 'vue'

interface BasePaginationProps {
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number
  disabled?: boolean
}

const props = withDefaults(defineProps<BasePaginationProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  pageChange: [page: number]
  pageSizeChange: [size: number]
}>()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    // Показываем все страницы
    for (let i = 0; i < total; i++) {
      pages.push(i)
    }
  } else {
    // Умная пагинация
    pages.push(0) // Первая страница

    if (current > 3) {
      pages.push('...')
    }

    const start = Math.max(1, current - 1)
    const end = Math.min(total - 2, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 4) {
      pages.push('...')
    }

    pages.push(total - 1) // Последняя страница
  }

  return pages
})

const fromElement = computed(() => {
  return props.currentPage * props.pageSize + 1
})

const toElement = computed(() => {
  return Math.min((props.currentPage + 1) * props.pageSize, props.totalElements)
})

function goToPage(page: number) {
  if (page >= 0 && page < props.totalPages && page !== props.currentPage) {
    emit('pageChange', page)
  }
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">

    <!-- Навигация по страницам -->
    <nav v-if="totalPages > 1" aria-label="Pagination">
      <ul class="pagination mb-0">
        <!-- Кнопка "Предыдущая" -->
        <li class="page-item" :class="{ disabled: currentPage === 0 || props.disabled }">
          <button class="page-link" @click="goToPage(currentPage - 1)">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
        </li>

        <!-- Номера страниц -->
        <template v-for="(page, idx) in visiblePages" :key="idx">
          <li v-if="page === '...'" class="page-item disabled">
            <span class="page-link">...</span>
          </li>
          <li v-else class="page-item" :class="{ active: page === currentPage }">
            <button class="page-link" :class="{ 'text-light': page === currentPage, 'text-bold': page === currentPage }" :disabled="props.disabled" @click="goToPage(page as number)">
              {{ (page as number) + 1 }}
            </button>
          </li>
        </template>

        <!-- Кнопка "Следующая" -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 || props.disabled }">
          <button class="page-link" @click="goToPage(currentPage + 1)">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Информация о записях -->
    <div class="text-muted small">
      Показано {{ fromElement }} - {{ toElement }} из {{ totalElements }} записей
    </div>
  </div>
</template>

<style scoped>
.pagination {
  --bs-pagination-padding-x: 0.75rem;
  --bs-pagination-padding-y: 0.375rem;
  --bs-pagination-font-size: 0.875rem;
}
</style>
