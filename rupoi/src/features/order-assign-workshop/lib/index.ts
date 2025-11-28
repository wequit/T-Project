// Вспомогательные функции для feature order-assign-workshop
// В будущем здесь могут быть утилиты валидации дат, форматирования и т.д.

/**
 * Форматирует дату для отображения
 */
export function formatDeadline(deadline: string | null): string {
  if (!deadline) return 'Не указан'
  
  const date = new Date(deadline)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Проверяет, что дата не в прошлом
 */
export function isValidDeadline(deadline: string): boolean {
  const date = new Date(deadline)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return date >= today
}

