import type {
  ComponentProsthesisDTO,
  ComponentProsthesisCreateDTO,
  ComponentProsthesisUpdateDTO,
  ComponentProsthesisFormValues,
} from '../model/types'

function dtoToFormValues(dto: ComponentProsthesisDTO): ComponentProsthesisFormValues {
  return {
    semiFinishedProductId: dto.componentNameId,
    semiFinishedProductCode: dto.componentCode,
    size: dto.size,
    quantityLeft: dto.leftQuantity,
    quantityRight: dto.rightQuantity,
  }
}

function formValuesToCreateDTO(
  formValues: ComponentProsthesisFormValues,
  prosthesisOrderId: number
): ComponentProsthesisCreateDTO {
  return {
    semiFinishedProductId: formValues.semiFinishedProductId!,
    semiFinishedProductCode: formValues.semiFinishedProductCode!,
    size: formValues.size!,
    quantityLeft: formValues.quantityLeft!,
    quantityRight: formValues.quantityRight!,
    prosthesisOrderId,
  }
}

function formValuesToUpdateDTO(
  formValues: ComponentProsthesisFormValues,
  prosthesisOrderId: number
): ComponentProsthesisUpdateDTO {
  return {
    semiFinishedProductId: formValues.semiFinishedProductId!,
    semiFinishedProductCode: formValues.semiFinishedProductCode!,
    size: formValues.size!,
    quantityLeft: formValues.quantityLeft!,
    quantityRight: formValues.quantityRight!,
    prosthesisOrderId,
  }
}

export const componentProsthesisMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}
