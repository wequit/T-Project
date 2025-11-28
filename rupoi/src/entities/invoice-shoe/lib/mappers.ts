import type {
  InvoiceShoeDTO,
  InvoiceShoeCreateDTO,
  InvoiceShoeUpdateDTO,
  InvoiceShoeFormValues,
} from '../model/types'

function dtoToFormValues(dto: InvoiceShoeDTO): InvoiceShoeFormValues {
  return {
    number: dto.number,
    requiredCopy: dto.requiredCopy,
    qualityControlPassed: dto.qualityControlPassed,
    notes: dto.notes,
  }
}

function formValuesToCreateDTO(
  formValues: InvoiceShoeFormValues,
  orderId: number
): InvoiceShoeCreateDTO {
  return {
    orderId: orderId,
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

function formValuesToUpdateDTO(
  formValues: InvoiceShoeFormValues
): InvoiceShoeUpdateDTO {
  return {
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

export const invoiceShoeMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}

