import type {
  OrderRepairDTO,
  OrderRepairCreateDTO,
  OrderRepairUpdateDTO,
  OrderRepairFormValues,
} from '../model/types'

function dtoToFormValues(dto: OrderRepairDTO): OrderRepairFormValues {
  return {
    productTypeId: dto.productTypeRef?.id ?? null,
    serviceType: dto.serviceType,
    orderCost: dto.repairCost,
    manufacturingDate: dto.manufacturingDate,
    deliveryDate: dto.deliveryDate,
    notes: dto.notes,
    priority: dto.priority,
  }
}

function formValuesToCreateDTO(
  formValues: OrderRepairFormValues,
  personId: string
): OrderRepairCreateDTO {
  return {
    productTypeId: formValues.productTypeId!,
    serviceType: formValues.serviceType!,
    orderCost: formValues.orderCost!,
    manufacturingDate: formValues.manufacturingDate!,
    deliveryDate: formValues.deliveryDate!,
    notes: formValues.notes ?? '',
    priority: formValues.priority!,
    personId,
  }
}

function formValuesToUpdateDTO(
  formValues: OrderRepairFormValues,
  personId: string
): OrderRepairUpdateDTO {
  return {
    productTypeId: formValues.productTypeId!,
    serviceType: formValues.serviceType!,
    orderCost: formValues.orderCost!,
    manufacturingDate: formValues.manufacturingDate!,
    deliveryDate: formValues.deliveryDate!,
    notes: formValues.notes ?? '',
    priority: formValues.priority!,
    personId,
  }
}

export const orderRepairMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}
