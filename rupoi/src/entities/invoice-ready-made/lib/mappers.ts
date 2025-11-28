import type {
  InvoiceReadyMadeDTO,
  InvoiceReadyMadeCreateDTO,
  InvoiceReadyMadeUpdateDTO,
  InvoiceReadyMadeFormValues,
} from '../model/types'

function dtoToFormValues(dto: InvoiceReadyMadeDTO): InvoiceReadyMadeFormValues {
  return {
    number: dto.number,
    requiredCopy: dto.requiredCopy,
    qualityControlPassed: dto.qualityControlPassed,
    notes: dto.notes,
  }
}

function formValuesToCreateDTO(
  formValues: InvoiceReadyMadeFormValues,
  orderId: number
): InvoiceReadyMadeCreateDTO {
  return {
    orderId: orderId,
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

function formValuesToUpdateDTO(
  formValues: InvoiceReadyMadeFormValues
): InvoiceReadyMadeUpdateDTO {
  return {
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

export const invoiceReadyMadeMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}

