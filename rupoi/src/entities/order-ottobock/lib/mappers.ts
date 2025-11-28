import type {
  OrderOttobockDTO,
  OrderOttobockCreateDTO,
  OrderOttobockUpdateDTO,
  OrderOttobockFormValues,
} from '../model/types'

function dtoToFormValues(dto: OrderOttobockDTO): OrderOttobockFormValues {
  return {
    productTypeId: dto.productTypeRef?.id ?? null,
    diagnosisId: dto.diagnosisRef?.id ?? null,
    prosthesisSide: dto.prosthesisSide,
    hospitalized: dto.hospitalized,
    orderType: dto.orderType,
    priority: dto.priority,
    serviceType: dto.serviceType,
    orderCost: dto.orderCost,
    manufacturingDate: dto.manufacturingDate,
    deliveryDate: dto.deliveryDate,
    notes: dto.notes,
  }
}

function formValuesToCreateDTO(
  formValues: OrderOttobockFormValues,
  personId: string
): OrderOttobockCreateDTO {
  return {
    productTypeId: formValues.productTypeId!,
    diagnosisId: formValues.diagnosisId!,
    prosthesisSide: formValues.prosthesisSide!,
    hospitalized: formValues.hospitalized!,
    orderType: formValues.orderType!,
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
  formValues: OrderOttobockFormValues,
  personId: string
): OrderOttobockUpdateDTO {
  return {
    productTypeId: formValues.productTypeId!,
    diagnosisId: formValues.diagnosisId!,
    prosthesisSide: formValues.prosthesisSide!,
    hospitalized: formValues.hospitalized!,
    orderType: formValues.orderType!,
    serviceType: formValues.serviceType!,
    orderCost: formValues.orderCost!,
    manufacturingDate: formValues.manufacturingDate!,
    deliveryDate: formValues.deliveryDate!,
    notes: formValues.notes ?? '',
    priority: formValues.priority!,
    personId,
  }
}

export const orderOttobockMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}
