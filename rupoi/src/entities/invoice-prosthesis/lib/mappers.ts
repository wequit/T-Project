import type {
  InvoiceProsthesisDTO,
  InvoiceProsthesisCreateDTO,
  InvoiceProsthesisUpdateDTO,
  InvoiceProsthesisFormValues,
} from '../model/types'

function dtoToFormValues(dto: InvoiceProsthesisDTO): InvoiceProsthesisFormValues {
  return {
    number: dto.number,
    requiredCopy: dto.requiredCopy,
    qualityControlPassed: dto.qualityControlPassed,
    notes: dto.notes,
  }
}

function formValuesToCreateDTO(
  formValues: InvoiceProsthesisFormValues,
  orderId: number
): InvoiceProsthesisCreateDTO {
  return {
    orderId: orderId,
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

function formValuesToUpdateDTO(
  formValues: InvoiceProsthesisFormValues
): InvoiceProsthesisUpdateDTO {
  return {
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

export const invoiceProsthesisMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}

