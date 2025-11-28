/**
 * Типы заказов для управления статусами
 */
export enum OrderKind {
  PROSTHESIS = 'prosthesis',
  SHOE = 'shoe',
  OTTOBOCK = 'ottobock',
  REPAIR = 'repair',
  READY_MADE = 'readyMade',
}

export const orderKinds = Object.values(OrderKind)

export const orderKindLabels: Record<OrderKind, string> = {
  [OrderKind.PROSTHESIS]: 'Протез',
  [OrderKind.SHOE]: 'Обувь',
  [OrderKind.OTTOBOCK]: 'Оттобок',
  [OrderKind.REPAIR]: 'Ремонт',
  [OrderKind.READY_MADE]: 'Готовое ПОИ',
}

