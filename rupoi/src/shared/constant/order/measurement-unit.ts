export enum MeasurementUnit {
  PIECE = 'PIECE',
  METER = 'METER',
  CENTIMETER = 'CENTIMETER',
  KILOGRAM = 'KILOGRAM',
  GRAM = 'GRAM',
  LITER = 'LITER',
  MILLILITER = 'MILLILITER',
  SET = 'SET',
  PACKAGE = 'PACKAGE',
}

export const measurementUnits = Object.values(MeasurementUnit)

export const measurementUnitOptions = [
  { label: 'Штука', value: MeasurementUnit.PIECE },
  { label: 'Метр', value: MeasurementUnit.METER },
  { label: 'Сантиметр', value: MeasurementUnit.CENTIMETER },
  { label: 'Килограмм', value: MeasurementUnit.KILOGRAM },
  { label: 'Грамм', value: MeasurementUnit.GRAM },
  { label: 'Литр', value: MeasurementUnit.LITER },
  { label: 'Миллилитр', value: MeasurementUnit.MILLILITER },
  { label: 'Комплект', value: MeasurementUnit.SET },
  { label: 'Упаковка', value: MeasurementUnit.PACKAGE },
]
