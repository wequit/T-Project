import type { PersonDTO } from '../model/types'

/**
 * Форматирует полное имя персоны
 */
function formatPersonFullName(person: PersonDTO): string {
  const parts = [person.lastName, person.firstName, person.patronymic].filter(Boolean)
  return parts.length > 0 ? parts.join(' ') : '—'
}

/**
 * Получает инициалы из полного имени
 */
function getPersonInitials(person: PersonDTO): string {
  const fullName = formatPersonFullName(person)
  return fullName
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

/**
 * Форматирует группу инвалидности
 */
function formatDisabilityGroup(person: PersonDTO): string {
  const group = person.medicalInfoList?.[0]?.disabilityGroup
  if (group === null || group === undefined) return '—'

  const groupMap: Record<number, string> = {
    1: 'I группа',
    2: 'II группа',
    3: 'III группа',
    4: 'IV группа',
  }

  return groupMap[group] ?? `${group} группа`
}

/**
 * Получает текстовую метку пола
 */
function getGenderLabel(sex: number): string {
  const genderMap: Record<number, string> = {
    1: 'Мужской',
    2: 'Женский',
  }
  return genderMap[sex] ?? '—'
}

/**
 * Получает короткую метку пола
 */
function getGenderShortLabel(sex: number): string {
  const genderMap: Record<number, string> = {
    1: 'М',
    2: 'Ж',
  }
  return genderMap[sex] ?? '—'
}

export const personFormatters = {
  formatPersonFullName,
  getPersonInitials,
  formatDisabilityGroup,
  getGenderLabel,
  getGenderShortLabel,
}