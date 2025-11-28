import type {
  TechnicalOperationDTO,
  TechnicalOperationCreateDTO,
  TechnicalOperationUpdateDTO,
  TechnicalOperationFormValues,
} from '../model/types'
import type { ID } from '@rupoi/shared/model'

export function dtoToFormValues(dto: TechnicalOperationDTO): TechnicalOperationFormValues {
  return {
    operationId: dto.operationNameId,
    executorName: dto.executorName,
    executionDate: dto.executionDate,
    qualityControlMark: dto.qualityControlMark,
  }
}

export function formValuesToCreateDTO(
  formValues: TechnicalOperationFormValues,
  shoeOrderId: ID
): TechnicalOperationCreateDTO {
  return {
    operationId: formValues.operationId!,
    executorName: formValues.executorName ?? '',
    executionDate: formValues.executionDate ?? '',
    qualityControlMark: formValues.qualityControlMark,
    shoeOrderId,
  }
}

export function formValuesToUpdateDTO(
  formValues: TechnicalOperationFormValues,
  id: ID,
  shoeOrderId: ID
): TechnicalOperationUpdateDTO {
  return {
    id,
    operationId: formValues.operationId!,
    executorName: formValues.executorName ?? '',
    executionDate: formValues.executionDate ?? '',
    qualityControlMark: formValues.qualityControlMark,
    shoeOrderId,
  }
}

export const technicalOperationMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}
