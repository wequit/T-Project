import type { ReferenceDTO } from '@rupoi/shared/model'

/**
 * Получает название категории инвалидности из списка референсов
 */
function getDisabilityCategoryName(
  categoryId: number,
  categories: ReferenceDTO[] | undefined
): string {
  const category = categories?.find((c) => c.id === categoryId)
  return category?.nameRu ?? '—'
}

/**
 * Получает название группы инвалидности из списка референсов
 */
function getDisabilityGroupName(
  groupId: number,
  groups: ReferenceDTO[] | undefined
): string {
  const group = groups?.find((g) => g.id === groupId)
  return group?.nameRu ?? '—'
}

/**
 * Получает название причины инвалидности из списка референсов
 */
function getDisabilityReasonName(
  reasonId: number,
  reasons: ReferenceDTO[] | undefined
): string {
  const reason = reasons?.find((r) => r.id === reasonId)
  return reason?.nameRu ?? '—'
}

export const medicalInfoFormatters = {
  getDisabilityCategoryName,
  getDisabilityGroupName,
  getDisabilityReasonName,
}

