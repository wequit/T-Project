import { OrderStatus } from '@rupoi/shared/constant'
import type {
  OrderReadyMadeDTO,
  OrderReadyMadeCreateDTO,
  OrderReadyMadeUpdateDTO,
  OrderReadyMadeFormValues,
} from '../model/types'

function dtoToFormValues(dto: OrderReadyMadeDTO): OrderReadyMadeFormValues {
  return {
    productTypeId: dto.productTypeRef?.id ?? null,
    diagnosisId: dto.diagnosisRef?.id ?? null,
    orderType: dto.orderType,
    orderStatus: dto.orderStatus,
    serviceType: dto.serviceType,
    orderCost: dto.orderCost,
    manufacturingDate: dto.manufacturingDate,
    deliveryDate: dto.deliveryDate,
    notes: dto.notes,
    priority: dto.priority,
  }
}

function formValuesToCreateDTO(
  formValues: OrderReadyMadeFormValues,
  personId: string
): OrderReadyMadeCreateDTO {
  return {
    productTypeId: formValues.productTypeId!,
    diagnosisId: formValues.diagnosisId!,
    orderType: formValues.orderType!,
    orderStatus: formValues.orderStatus ?? OrderStatus.NEW,
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
  formValues: OrderReadyMadeFormValues,
  personId: string
): OrderReadyMadeUpdateDTO {
  return {
    productTypeId: formValues.productTypeId!,
    diagnosisId: formValues.diagnosisId!,
    orderType: formValues.orderType!,
    orderStatus: formValues.orderStatus ?? OrderStatus.NEW,
    serviceType: formValues.serviceType!,
    orderCost: formValues.orderCost!,
    manufacturingDate: formValues.manufacturingDate!,
    deliveryDate: formValues.deliveryDate!,
    notes: formValues.notes ?? '',
    priority: formValues.priority!,
    personId,
  }
}

export const orderReadyMadeMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}
