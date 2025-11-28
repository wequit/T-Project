import {computed, ref, type Ref, watch} from 'vue'
import type {LocationQuery} from 'vue-router'
import {useRoute, useRouter} from 'vue-router'

export interface UseFilterOptions<T> {
  initFilter: () => T
  disableUrlSync?: boolean
}

export interface UseFilterReturn<T> {
  filter: Ref<T>
  cleanFilter: Ref<Partial<T>>
  setFilter: (newFilter: T) => void
  updateFilter: (partialFilter: Partial<T>) => void
  resetFilter: () => void
  getInitFilter: () => T
}


function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true
  }

  if (typeof value === 'boolean' && !value) {
    return true
  }

  if (Array.isArray(value) && value.length === 0) {
    return true
  }

  return false
}

function cleanObject<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    // Если значение - объект (но не массив), рекурсивно очищаем его
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const cleaned = cleanObject(value as Record<string, unknown>)
      // Добавляем только если в очищенном объекте есть хоть одно поле
      if (Object.keys(cleaned).length > 0) {
        result[key] = cleaned
      }
    } else if (!isEmpty(value)) {
      result[key] = value
    }
  }

  return result as Partial<T>
}

function serializeToQuery(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}[${key}]` : key

    if (Array.isArray(value)) {
      // Массивы сериализуем как multiple values
      value.forEach((item, index) => {
        result[`${fullKey}[${index}]`] = String(item)
      })
    } else if (value !== null && typeof value === 'object') {
      // Объекты сериализуем рекурсивно
      Object.assign(result, serializeToQuery(value as Record<string, unknown>, fullKey))
    } else {
      result[fullKey] = String(value)
    }
  }

  return result
}

function deserializeFromQuery<T extends Record<string, unknown>>(query: LocationQuery, initFilter: T): T {
  const result = { ...initFilter } as Record<string, unknown>

  // Обрабатываем каждый ключ из query
  for (const [key, value] of Object.entries(query)) {
    const match = key.match(/^([^[]+)(?:\[(.+)\])?$/)
    if (!match) continue

    const [, rootKey, path] = match

    if (!rootKey) continue

    if (!path) {
      // Простое значение
      const queryValue = Array.isArray(value) ? value[0] : value
      if (queryValue) {
        result[rootKey] = parseQueryValue(queryValue, result[rootKey])
      }
    } else {
      // Вложенное значение или массив
      const keys = path.split(/\]\[|\[|\]/).filter(Boolean)
      setNestedValue(result, [rootKey, ...keys], value)
    }
  }

  return result as T
}

/**
 * Устанавливает вложенное значение в объекте
 */
function isNumericKey(key: string | undefined): boolean {
  if (key === undefined) return false
  return key !== '' && !Number.isNaN(Number(key))
}

function ensureContainer(
  target: Record<string, unknown>,
  key: string,
  shouldBeArray: boolean
): Record<string, unknown> | unknown[] {
  const currentValue = target[key]

  if (shouldBeArray) {
    if (!Array.isArray(currentValue)) {
      target[key] = []
    }
    return target[key] as unknown[]
  }

  if (
    !currentValue ||
    typeof currentValue !== 'object' ||
    Array.isArray(currentValue)
  ) {
    target[key] = {}
  }

  return target[key] as Record<string, unknown>
}

function setNestedValue(obj: Record<string, unknown>, keys: string[], value: unknown): void {
  if (keys.length === 0) return

  function assign(target: Record<string, unknown> | unknown[], path: string[], rawValue: unknown): void {
    const [key, ...rest] = path
    if (!key) return

    const keyIsIndex = isNumericKey(key)

    if (rest.length === 0) {
      const queryValue = Array.isArray(rawValue) ? rawValue[0] : rawValue
      if (!queryValue || typeof queryValue !== 'string') return

      const parsedValue = parseQueryValue(
        queryValue,
        keyIsIndex
          ? Array.isArray(target) ? target[Number(key)] : undefined
          : (target as Record<string, unknown>)[key]
      )

      if (keyIsIndex) {
        if (!Array.isArray(target)) return
        target[Number(key)] = parsedValue
      } else {
        (target as Record<string, unknown>)[key] = parsedValue
      }
      return
    }

    const nextKey = rest[0]
    const nextIsIndex = isNumericKey(nextKey)

    if (keyIsIndex) {
      if (!Array.isArray(target)) return
      const index = Number(key)

      if (
        target[index] === undefined ||
        target[index] === null ||
        (nextIsIndex && !Array.isArray(target[index])) ||
        (!nextIsIndex && (typeof target[index] !== 'object' || Array.isArray(target[index])))
      ) {
        target[index] = nextIsIndex ? [] : {}
      }

      assign(target[index] as Record<string, unknown> | unknown[], rest, rawValue)
    } else {
      const container = ensureContainer(target as Record<string, unknown>, key, nextIsIndex)
      assign(container as Record<string, unknown> | unknown[], rest, rawValue)
    }
  }

  assign(obj, keys, value)
}

/**
 * Парсит значение из query в нужный тип
 */
function parseQueryValue(value: string, defaultValue: unknown): unknown {
  // Определяем тип по defaultValue
  if (typeof defaultValue === 'number') {
    const num = Number(value)
    return isNaN(num) ? defaultValue : num
  }

  if (typeof defaultValue === 'boolean') {
    return value === 'true'
  }

  if (Array.isArray(defaultValue)) {
    return [value]
  }

  return value
}

export function useFilter<T extends Record<string, unknown>>(
  options: UseFilterOptions<T>
): UseFilterReturn<T> {
  const route = useRoute()
  const router = useRouter()

  // Инициализируем фильтр из URL или используем начальное значение
  const initFromUrl = (): T => {
    if (Object.keys(route.query).length > 0) {
      return deserializeFromQuery(route.query, options.initFilter())
    }
    return options.initFilter()
  }

  const filter = ref<T>(initFromUrl()) as Ref<T>

  // Флаг для предотвращения первой синхронизации при инициализации из URL
  const isInitializedFromUrl = Object.keys(route.query).length > 0
  let isFirstRun = true

  const cleanFilter = computed(() => cleanObject(filter.value))

  function setFilter(newFilter: T) {
    filter.value = { ...newFilter }
  }

  function updateFilter(partialFilter: Partial<T>) {
    filter.value = { ...filter.value, ...partialFilter }
  }

  function resetFilter() {
    filter.value = options.initFilter()
  }

  function syncUrl() {
    if (options.disableUrlSync) return

    // Пропускаем первую синхронизацию, если фильтр был инициализирован из URL
    if (isFirstRun && isInitializedFromUrl) {
      isFirstRun = false
      return
    }

    const query = serializeToQuery(cleanFilter.value)
    router.replace({ query })
  }

  watch(
    filter,
    () => {
      syncUrl()
    },
    { deep: true, immediate: true }
  )

  return {
    filter,
    cleanFilter,
    setFilter,
    updateFilter,
    resetFilter,
    getInitFilter: options.initFilter,
  }
}

