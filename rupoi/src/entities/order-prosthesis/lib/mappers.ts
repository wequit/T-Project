import type {
  OrderProsthesisDTO,
  OrderProsthesisCreateDTO,
  OrderProsthesisUpdateDTO,
  OrderProsthesisFormValues,
} from '../model/types'
import type { UUID } from '@rupoi/shared/model'

function dtoToFormValues(dto: OrderProsthesisDTO): OrderProsthesisFormValues {
  return {
    productTypeId: dto.productTypeRef?.id ?? null,
    diagnosisId: dto.diagnosisRef?.id ?? null,
    prosthesisSide: dto.prosthesisSide,
    hospitalized: dto.hospitalized,
    orderType: dto.orderType,
    priority: dto.priority,
    serviceType: dto.serviceType,
    weightKg: dto.weightKg,
    height: dto.height,
    activityLevel: dto.activityLevel,
    manufacturingDate: dto.manufacturingDate,
    deliveryDate: dto.deliveryDate,
    notes: dto.notes,
  }
}

function formValuesToCreateDTO(
  formValues: OrderProsthesisFormValues,
  personId: UUID
): OrderProsthesisCreateDTO {
  return {
    productTypeId: formValues.productTypeId!,
    diagnosisId: formValues.diagnosisId!,
    prosthesisSide: formValues.prosthesisSide!,
    hospitalized: formValues.hospitalized!,
    orderType: formValues.orderType!,
    priority: formValues.priority!,
    serviceType: formValues.serviceType!,
    weightKg: formValues.weightKg!,
    height: formValues.height!,
    activityLevel: formValues.activityLevel!,
    manufacturingDate: formValues.manufacturingDate!,
    deliveryDate: formValues.deliveryDate!,
    notes: formValues.notes ?? '',
    personId,
  }
}

function formValuesToUpdateDTO(
  formValues: OrderProsthesisFormValues,
  personId: UUID
): OrderProsthesisUpdateDTO {
  return {
    productTypeId: formValues.productTypeId!,
    diagnosisId: formValues.diagnosisId!,
    prosthesisSide: formValues.prosthesisSide!,
    hospitalized: formValues.hospitalized!,
    orderType: formValues.orderType!,
    priority: formValues.priority!,
    serviceType: formValues.serviceType!,
    weightKg: formValues.weightKg!,
    height: formValues.height!,
    activityLevel: formValues.activityLevel!,
    manufacturingDate: formValues.manufacturingDate!,
    deliveryDate: formValues.deliveryDate!,
    notes: formValues.notes ?? '',
    personId,
  }
}

export const orderProsthesisMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}
