export enum OrderType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY'
}

export const orderTypes = Object.values(OrderType)

export const orderTypeOptions = [
  { label: 'Первичный', value: OrderType.PRIMARY },
  { label: 'Вторичный', value: OrderType.SECONDARY },
]
