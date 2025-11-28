<script setup lang="ts">
import { computed } from 'vue'
import { useFilter } from '@rupoi/shared/lib'
import {
  WorkshopRegistryTable,
  useWorkshopRegistry,
  type WorkshopRegistryListParams,
  type WorkshopRegistryDTO,
} from '@rupoi/entities/workshop-registry'
import { BasePagination } from '@rupoi/shared/ui'
import { AButton, APopover } from '@common/shared/ui'
import { router } from '@rupoi/app/router'

// Filter logic
const { filter, updateFilter } = useFilter<WorkshopRegistryListParams>({
  initFilter: () => ({
    search: undefined,
    pageable: {
      page: 0,
      size: 20,
      sort: []
    }
  })
})

function handlePageChange(page: number) {
  updateFilter({
    pageable: {
      page,
      size: filter.value.pageable?.size ?? 20,
      sort: filter.value.pageable?.sort ?? []
    }
  })
}

function handleSortChange(sortStrings: string[]) {
  updateFilter({
    pageable: {
      page: filter.value.pageable?.page ?? 0,
      size: filter.value.pageable?.size ?? 20,
      sort: sortStrings
    }
  })
}

function handleEdit(workshop: WorkshopRegistryDTO) {
  router.push({
    name: 'workshop-registry-edit',
    params: { id: workshop.id }
  })
}

// Loading Data
const {
  workshopRegistryList: data,
  isLoading,
  listQuery,
  deleteWorkshopRegistryMutation
} = useWorkshopRegistry({ listParams: filter })
const isError = computed(() => listQuery?.isError.value ?? false)

// Delete handler
function handleDelete(workshop: WorkshopRegistryDTO) {
  if (confirm(`Вы уверены, что хотите удалить мастерскую "${workshop.nameRu}"?`)) {
    deleteWorkshopRegistryMutation.mutateAsync(workshop.id).then(() => {
      listQuery?.refetch()
    })
  }
}

// Computed
const hasData = computed(() => data?.value && data.value.content.length > 0)
const showPagination = computed(() => hasData.value && data?.value && data.value.totalElements > 0)
</script>

<template>
  <div class="workshop-registry-list">
    <!-- Таблица -->
    <div class="workshop-registry-list__table mb-4">
      <div class="card">
        <div class="card-body p-0">
          <WorkshopRegistryTable
            :data="data?.content ?? []"
            :is-loading="isLoading"
            :is-error="isError"
            @sort="handleSortChange"
          >
            <template #actions="{ item }">
              <div class="d-flex gap-2 justify-content-center">
                <APopover
                  title="Редактирование"
                  trigger="hover"
                >
                  <AButton
                    color="warning"
                    size="sm"
                    icon
                    @click.stop="handleEdit(item)"
                  >
                    <i class="fas fa-edit"></i>
                  </AButton>
                </APopover>

                <APopover
                  title="Удалить"
                  trigger="hover"
                >
                  <AButton
                    color="danger"
                    size="sm"
                    icon
                    :disabled="deleteWorkshopRegistryMutation.isPending.value"
                    @click.stop="handleDelete(item)"
                  >
                    <i class="fas fa-trash"></i>
                  </AButton>
                </APopover>
              </div>
            </template>
          </WorkshopRegistryTable>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <div v-if="showPagination" class="workshop-registry-list__pagination d-flex justify-content-end">
      <BasePagination
        :current-page="filter.pageable?.page ?? 0"
        :page-size="filter.pageable?.size ?? 20"
        :total-pages="data?.totalPages ?? 0"
        :total-elements="data?.totalElements ?? 0"
        @page-change="handlePageChange"
      />
    </div>

    <!-- Дополнительный слот для контента снизу -->
    <div v-if="$slots.footer" class="workshop-registry-list__footer mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

