import type {
  InvoiceOttobockDTO,
  InvoiceOttobockCreateDTO,
  InvoiceOttobockUpdateDTO,
  InvoiceOttobockFormValues,
} from '../model/types'

function dtoToFormValues(dto: InvoiceOttobockDTO): InvoiceOttobockFormValues {
  return {
    number: dto.number,
    requiredCopy: dto.requiredCopy,
    qualityControlPassed: dto.qualityControlPassed,
    notes: dto.notes,
  }
}

function formValuesToCreateDTO(
  formValues: InvoiceOttobockFormValues,
  orderId: number
): InvoiceOttobockCreateDTO {
  return {
    orderId: orderId,
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

function formValuesToUpdateDTO(
  formValues: InvoiceOttobockFormValues
): InvoiceOttobockUpdateDTO {
  return {
    number: formValues.number!,
    requiredCopy: formValues.requiredCopy!,
    qualityControlPassed: formValues.qualityControlPassed!,
    notes: formValues.notes ?? '',
  }
}

export const invoiceOttobockMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}


