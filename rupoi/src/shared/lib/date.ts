import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import 'dayjs/locale/ky'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

dayjs.locale('ru')

export function isValidISODate(dateString: string): boolean {
  if (!dateString) return false
  return dayjs(dateString, ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.SSSZ'], true).isValid()
}

export function parseDate(dateString: string): dayjs.Dayjs | null {
  if (!dateString) return null

  const parsed = dayjs(dateString)
  return parsed.isValid() ? parsed : null
}

export function formatDate(dateString: string, locale: 'ru' | 'ky' = 'ru'): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.locale(locale).format('D MMMM YYYY г.')
}


export function formatDateShort(dateString: string): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.format('DD.MM.YYYY')
}


export function formatDateISO(dateString: string): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.format('YYYY-MM-DD')
}


export function formatDateTime(dateString: string, locale: 'ru' | 'ky' = 'ru'): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.locale(locale).format('D MMMM YYYY г., HH:mm')
}


export function formatDateTimeShort(dateString: string): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.format('DD.MM.YYYY HH:mm')
}


export function formatTime(dateString: string): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.format('HH:mm')
}


export function formatTimeWithSeconds(dateString: string): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.format('HH:mm:ss')
}


export function calculateAge(birthday: string): number | null {
  const birthDate = parseDate(birthday)
  if (!birthDate) return null

  const age = dayjs().diff(birthDate, 'year')
  return age >= 0 ? age : null
}


export function formatAge(birthday: string): string {
  const age = calculateAge(birthday)
  if (age === null) return '—'

  return `${age} ${getYearWord(age)}`
}


function getYearWord(age: number): string {
  const lastDigit = age % 10
  const lastTwoDigits = age % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'лет'
  }

  if (lastDigit === 1) {
    return 'год'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'года'
  }

  return 'лет'
}


export function formatRelativeTime(dateString: string, locale: 'ru' | 'ky' = 'ru'): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.locale(locale).fromNow()
}


export function formatRelativeTimeTo(dateString: string, locale: 'ru' | 'ky' = 'ru'): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.locale(locale).toNow()
}


export function formatDateRange(
  startDate: string,
  endDate: string,
  locale: 'ru' | 'ky' = 'ru'
): string {
  const start = parseDate(startDate)
  const end = parseDate(endDate)

  if (!start && !end) return '—'
  if (!start) return `до ${formatDate(endDate, locale)}`
  if (!end) return `с ${formatDate(startDate, locale)}`

  return `${formatDate(startDate, locale)} — ${formatDate(endDate, locale)}`
}


export function isToday(dateString: string): boolean {
  const date = parseDate(dateString)
  if (!date) return false

  return date.isSame(dayjs(), 'day')
}


export function isYesterday(dateString: string): boolean {
  const date = parseDate(dateString)
  if (!date) return false

  return date.isSame(dayjs().subtract(1, 'day'), 'day')
}


export function isTomorrow(dateString: string): boolean {
  const date = parseDate(dateString)
  if (!date) return false

  return date.isSame(dayjs().add(1, 'day'), 'day')
}


export function diffInDays(startDate: string, endDate: string): number | null {
  const start = parseDate(startDate)
  const end = parseDate(endDate)

  if (!start || !end) return null

  return end.diff(start, 'day')
}


export function diffInHours(startDate: string, endDate: string): number | null {
  const start = parseDate(startDate)
  const end = parseDate(endDate)

  if (!start || !end) return null

  return end.diff(start, 'hour')
}


export function addDays(dateString: string, days: number): string | null {
  const date = parseDate(dateString)
  if (!date) return null

  return date.add(days, 'day').format('YYYY-MM-DD')
}


export function subtractDays(dateString: string, days: number): string | null {
  const date = parseDate(dateString)
  if (!date) return null

  return date.subtract(days, 'day').format('YYYY-MM-DD')
}


export function startOfDay(dateString: string): string | null {
  const date = parseDate(dateString)
  if (!date) return null

  return date.startOf('day').toISOString()
}


export function endOfDay(dateString: string): string | null {
  const date = parseDate(dateString)
  if (!date) return null

  return date.endOf('day').toISOString()
}

export function getMonthName(dateString: string, locale: 'ru' | 'ky' = 'ru'): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.locale(locale).format('MMMM')
}

export function getDayName(dateString: string, locale: 'ru' | 'ky' = 'ru'): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.locale(locale).format('dddd')
}

export function getDayNameShort(dateString: string, locale: 'ru' | 'ky' = 'ru'): string {
  const date = parseDate(dateString)
  if (!date) return '—'

  return date.locale(locale).format('dd')
}
