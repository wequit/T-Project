import type {
  MaterialDTO,
  MaterialFormValues,
  OttobockMaterialCreateDTO,
  ReadyMadeMaterialCreateDTO,
  RepairMaterialCreateDTO,
  OttobockMaterialUpdateDTO,
  ReadyMadeMaterialUpdateDTO,
  RepairMaterialUpdateDTO,
} from '../model/types'

export function dtoToFormValues(dto: MaterialDTO): MaterialFormValues {
  return {
    articleNumber: dto.articleNumber,
    materialName: dto.materialName,
    measurementUnit: dto.measurementUnit,
    quantity: dto.quantity,
    amount: dto.amount,
    note: dto.note,
  }
}

export function formValuesToOttobockCreateDTO(
  formValues: MaterialFormValues,
  ottobockOrderId: number
): OttobockMaterialCreateDTO {
  return {
    articleNumber: formValues.articleNumber!,
    materialName: formValues.materialName!,
    measurementUnit: formValues.measurementUnit!,
    quantity: formValues.quantity!,
    amount: formValues.amount!,
    note: formValues.note ?? '',
    ottobockOrderId,
  }
}

export function formValuesToReadyMadeCreateDTO(
  formValues: MaterialFormValues,
  readyPoiOrderId: number
): ReadyMadeMaterialCreateDTO {
  return {
    articleNumber: formValues.articleNumber!,
    materialName: formValues.materialName!,
    measurementUnit: formValues.measurementUnit!,
    quantity: formValues.quantity!,
    amount: formValues.amount!,
    note: formValues.note ?? '',
    readyPoiOrderId,
  }
}

export function formValuesToRepairCreateDTO(
  formValues: MaterialFormValues,
  repairOrderId: number
): RepairMaterialCreateDTO {
  return {
    articleNumber: formValues.articleNumber!,
    materialName: formValues.materialName!,
    measurementUnit: formValues.measurementUnit!,
    quantity: formValues.quantity!,
    amount: formValues.amount!,
    note: formValues.note ?? '',
    repairOrderId,
  }
}

export function formValuesToOttobockUpdateDTO(
  formValues: MaterialFormValues,
  id: number,
  ottobockOrderId: number
): OttobockMaterialUpdateDTO {
  return {
    id,
    articleNumber: formValues.articleNumber!,
    materialName: formValues.materialName!,
    measurementUnit: formValues.measurementUnit!,
    quantity: formValues.quantity!,
    amount: formValues.amount!,
    note: formValues.note ?? '',
    ottobockOrderId,
  }
}

export function formValuesToReadyMadeUpdateDTO(
  formValues: MaterialFormValues,
  id: number,
  readyPoiOrderId: number
): ReadyMadeMaterialUpdateDTO {
  return {
    id,
    articleNumber: formValues.articleNumber!,
    materialName: formValues.materialName!,
    measurementUnit: formValues.measurementUnit!,
    quantity: formValues.quantity!,
    amount: formValues.amount!,
    note: formValues.note ?? '',
    readyPoiOrderId,
  }
}

export function formValuesToRepairUpdateDTO(
  formValues: MaterialFormValues,
  id: number,
  repairOrderId: number
): RepairMaterialUpdateDTO {
  return {
    id,
    articleNumber: formValues.articleNumber!,
    materialName: formValues.materialName!,
    measurementUnit: formValues.measurementUnit!,
    quantity: formValues.quantity!,
    amount: formValues.amount!,
    note: formValues.note ?? '',
    repairOrderId,
  }
}

export const materialMappers = {
  dtoToFormValues,
  formValuesToOttobockCreateDTO,
  formValuesToReadyMadeCreateDTO,
  formValuesToRepairCreateDTO,
  formValuesToOttobockUpdateDTO,
  formValuesToReadyMadeUpdateDTO,
  formValuesToRepairUpdateDTO,
}
