export enum ServiceFeeType {
  FREE = 'FREE',
  PAID = 'PAID'
}

export const serviceFeeTypes = Object.values(ServiceFeeType)

export const serviceFeeTypeOptions = [
  { label: 'Бесплатно', value: ServiceFeeType.FREE },
  { label: 'Платно', value: ServiceFeeType.PAID },
]
