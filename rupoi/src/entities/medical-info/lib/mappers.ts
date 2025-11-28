import type {
  MedicalInfoDTO,
  MedicalInfoCreateDTO,
  MedicalInfoUpdateDTO,
  MedicalInfoFormValues,
} from '../model/types'

function dtoToFormValues(dto: MedicalInfoDTO): MedicalInfoFormValues {
  return {
    disabilityCategory: dto.disabilityCategory,
    disabilityGroup: dto.disabilityGroup,
    disabilityReason: dto.disabilityReason,
    operationLocationAndDate: dto.operationLocationAndDate,
    additionalInfo: dto.additionalInfo,
  }
}

function formValuesToCreateDTO(
  formValues: MedicalInfoFormValues,
  personId: string
): MedicalInfoCreateDTO {
  return {
    disabilityCategory: formValues.disabilityCategory!,
    disabilityGroup: formValues.disabilityGroup!,
    disabilityReason: formValues.disabilityReason!,
    operationLocationAndDate: formValues.operationLocationAndDate ?? '',
    additionalInfo: formValues.additionalInfo ?? '',
    personId,
  }
}

function formValuesToUpdateDTO(
  formValues: MedicalInfoFormValues,
  personId: string
): MedicalInfoUpdateDTO {
  return {
    disabilityCategory: formValues.disabilityCategory!,
    disabilityGroup: formValues.disabilityGroup!,
    disabilityReason: formValues.disabilityReason!,
    operationLocationAndDate: formValues.operationLocationAndDate ?? '',
    additionalInfo: formValues.additionalInfo ?? '',
    personId,
  }
}

export const medicalInfoMappers = {
  dtoToFormValues,
  formValuesToCreateDTO,
  formValuesToUpdateDTO,
}