<script setup lang="ts">
import { computed } from 'vue'
import { useFilter} from "@rupoi/shared/lib";
import {
  PersonFilterForm,
  PersonTable,
  usePerson,
  type PersonListParams,
  type PersonDTO,
  type PersonFilterFormValues
} from '@rupoi/entities/person'
import { BasePagination } from '@rupoi/shared/ui'
import {AButton, APopover} from "@common/shared/ui";
import {RouteConfig} from "@rupoi/shared/constant";
import {router} from "@rupoi/app/router";
import { usePermissions } from '@rupoi/entities/user';

//Filter logic

const { filter, updateFilter } = useFilter<PersonListParams>({
  initFilter: () => ({
    search: null,
    pin: null,
    caseNumber: null,
    sex: null,
    pageable: {
      page: 0,
      size: 20,
      sort: []
    }
  })
})

// Computed для передачи в форму фильтрации
const filterFormValues = computed<PersonFilterFormValues>(() => ({
  search: filter.value.search ?? null,
  pin: filter.value.pin ?? null,
  caseNumber: filter.value.caseNumber ?? null,
  sex: filter.value.sex ?? null,
}))

function handleSearch(data: PersonFilterFormValues) {
  // Сбрасываем на первую страницу при явном поиске
  updateFilter({
    search: data.search ?? undefined,
    pin: data.pin ?? undefined,
    caseNumber: data.caseNumber ?? undefined,
    sex: data.sex,
    pageable: {
      page: 0,
      size: filter.value.pageable?.size ?? 20,
      sort: filter.value.pageable?.sort ?? []
    }
  })
}

function handleReset(data: PersonFilterFormValues) {
  updateFilter({
    search: data.search ?? undefined,
    pin: data.pin ?? undefined,
    caseNumber: data.caseNumber ?? undefined,
    sex: data.sex,
    pageable: {
      page: 0,
      size: 20,
      sort: []
    }
  })
}

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

//Permissions
const { canViewPerson, canEditPerson } = usePermissions()

//Handle table actions

function handleView(person: PersonDTO) {
  router.push({
    name: RouteConfig.Person.view.name,
    params: { id: person.id }
  })
}

function handleEdit(person: PersonDTO) {
  router.push({
    name: RouteConfig.Person.edit.name,
    params: { id: person.id }
  })
}

//Loading Data

const { personList: data, isLoading, listQuery } = usePerson({ listParams: filter })
const isError = computed(() => listQuery?.isError.value ?? false)

//Computed
const hasData = computed(() => data?.value && data.value.content.length > 0)
const showPagination = computed(() => hasData.value && data?.value && data.value.totalElements > 0)
</script>

<template>
  <div class="person-list">
    <!-- Форма фильтрации -->
    <div class="person-list__filters mb-4">
      <PersonFilterForm
        :data="filterFormValues"
        @search="handleSearch"
        @reset="handleReset"
      />
    </div>

    <!-- Таблица -->
    <div class="person-list__table mb-4">
      <div class="card">
        <div class="card-body p-0">
          <PersonTable
            :data="data?.content ?? []"
            :is-loading="isLoading"
            :is-error="isError"
            @sort="handleSortChange"
          >
            <template #actions="{ item }">
              <div class="d-flex gap-2 justify-content-center">
                <APopover v-if="canViewPerson" content="Просмотр" placement="top">
                  <AButton
                    type="button"
                    color="primary"
                    size="sm"
                    icon
                    @click="handleView(item)"
                  >
                    <i class="fas fa-eye"></i>
                  </AButton>
                </APopover>
                <APopover v-if="canEditPerson" content="Редактирование" placement="top">
                  <AButton
                    color="warning"
                    size="sm"
                    icon
                    @click.stop="handleEdit(item)"
                  >
                    <i class="fas fa-edit"></i>
                  </AButton>
                </APopover>

              </div>
            </template>
          </PersonTable>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <div v-if="showPagination" class="person-list__pagination d-flex justify-content-end">
      <BasePagination
        :current-page="filter.pageable?.page ?? 0"
        :page-size="filter.pageable?.size ?? 20"
        :total-pages="data?.totalPages ?? 0"
        :total-elements="data?.totalElements ?? 0"
        @page-change="handlePageChange"
      />
    </div>

    <!-- Дополнительный слот для контента снизу -->
    <div v-if="$slots.footer" class="person-list__footer mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>
