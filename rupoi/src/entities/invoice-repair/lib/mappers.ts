import type {
  InvoiceRepairDTO,
  InvoiceRepairCreateDTO,
  InvoiceRepairUpdateDTO,
  InvoiceRepairFormValues,
} from '../model/types'

function dtoToFormValues(dto: InvoiceRepairDTO): InvoiceRepairFormValues {
  return {
    number: dto.number,
    requiredCopy: dto.requiredCopy,
    qualityControlPassed: dto.qualityControlPassed,
    notes: dto.notes,
  }
}

function formValuesToCreateDTO(
  formValues: InvoiceRepairFormValues,
  orderId: number
): InvoiceRepairCreateDTO {
  return {
    orderId: orderId,
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

function formValuesToUpdateDTO(
  formValues: InvoiceRepairFormValues
): InvoiceRepairUpdateDTO {
  return {
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

export const invoiceRepairMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}

