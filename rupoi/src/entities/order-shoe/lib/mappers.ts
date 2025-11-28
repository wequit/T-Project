import type {
  OrderShoeDTO,
  OrderShoeCreateDTO,
  OrderShoeUpdateDTO,
  OrderShoeFormValues,
} from '../model/types'
import type { UUID } from '@rupoi/shared/model'

function dtoToFormValues(dto: OrderShoeDTO): OrderShoeFormValues {
  return {
    diagnosisId: dto.diagnosisRef?.id ?? null,
    modelId: dto.modelRef?.id ?? null,
    shoeColorId: dto.shoeColorRef?.id ?? null,
    materialId: dto.materialRef?.id ?? null,
    heelHeight: dto.heelHeight,
    heelMaterialId: dto.heelMaterialRef?.id ?? null,
    hospitalized: dto.hospitalized,
    orderType: dto.orderType,
    manufacturingDate: dto.manufacturingDate,
    deliveryDate: dto.deliveryDate,
    notes: dto.notes,
    priority: dto.priority,
    serviceType: dto.serviceType,
  }
}

function formValuesToCreateDTO(
  formValues: OrderShoeFormValues,
  personId: UUID
): OrderShoeCreateDTO {
  return {
    diagnosisId: formValues.diagnosisId!,
    modelId: formValues.modelId!,
    shoeColorId: formValues.shoeColorId!,
    materialId: formValues.materialId!,
    heelHeight: formValues.heelHeight!,
    heelMaterialId: formValues.heelMaterialId!,
    hospitalized: formValues.hospitalized!,
    orderType: formValues.orderType!,
    manufacturingDate: formValues.manufacturingDate!,
    deliveryDate: formValues.deliveryDate!,
    notes: formValues.notes ?? '',
    priority: formValues.priority!,
    serviceType: formValues.serviceType!,
    personId,
  }
}

function formValuesToUpdateDTO(
  formValues: OrderShoeFormValues,
  personId: UUID
): OrderShoeUpdateDTO {
  return {
    diagnosisId: formValues.diagnosisId!,
    modelId: formValues.modelId!,
    shoeColorId: formValues.shoeColorId!,
    materialId: formValues.materialId!,
    heelHeight: formValues.heelHeight!,
    heelMaterialId: formValues.heelMaterialId!,
    hospitalized: formValues.hospitalized!,
    orderType: formValues.orderType!,
    manufacturingDate: formValues.manufacturingDate!,
    deliveryDate: formValues.deliveryDate!,
    notes: formValues.notes ?? '',
    priority: formValues.priority!,
    serviceType: formValues.serviceType!,
    personId,
  }
}

export const orderShoeMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}
