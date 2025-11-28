import type {
  FittingDTO,
  FittingFormValues,
  OttobockFittingCreateDTO,
  ProsthesisFittingCreateDTO,
  ReadyMadeFittingCreateDTO,
  ShoeFittingCreateDTO,
  RepairFittingCreateDTO,
  OttobockFittingUpdateDTO,
  ProsthesisFittingUpdateDTO,
  ReadyMadeFittingUpdateDTO,
  ShoeFittingUpdateDTO,
  RepairFittingUpdateDTO,
} from '../model/types'

function dtoToFormValues(dto: FittingDTO): FittingFormValues {
  return {
    callDate: dto.callDate,
    appearanceDate: dto.appearanceDate,
    comment: dto.comment,
  }
}

function formValuesToOttobockCreateDTO(
  formValues: FittingFormValues,
  ottobockOrderId: number | null
): OttobockFittingCreateDTO {
  return {
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    ottobockOrderId,
  }
}

function formValuesToProsthesisCreateDTO(
  formValues: FittingFormValues,
  prosthesisOrderId: number | null
): ProsthesisFittingCreateDTO {
  return {
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    prosthesisOrderId,
  }
}

function formValuesToReadyMadeCreateDTO(
  formValues: FittingFormValues,
  readyPoiOrderId: number | null
): ReadyMadeFittingCreateDTO {
  return {
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    readyPoiOrderId,
  }
}

function formValuesToShoeCreateDTO(
  formValues: FittingFormValues,
  shoeOrderId: number | null
): ShoeFittingCreateDTO {
  return {
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    shoeOrderId,
  }
}

function formValuesToRepairCreateDTO(
  formValues: FittingFormValues,
  repairOrderId: number | null
): RepairFittingCreateDTO {
  return {
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    repairOrderId,
  }
}

function formValuesToOttobockUpdateDTO(
  formValues: FittingFormValues,
  id: number,
  ottobockOrderId: number | null
): OttobockFittingUpdateDTO {
  return {
    id,
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    ottobockOrderId,
  }
}

function formValuesToProsthesisUpdateDTO(
  formValues: FittingFormValues,
  id: number,
  prosthesisOrderId: number | null
): ProsthesisFittingUpdateDTO {
  return {
    id,
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    prosthesisOrderId,
  }
}

function formValuesToReadyMadeUpdateDTO(
  formValues: FittingFormValues,
  id: number,
  readyPoiOrderId: number | null
): ReadyMadeFittingUpdateDTO {
  return {
    id,
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    readyPoiOrderId,
  }
}

function formValuesToShoeUpdateDTO(
  formValues: FittingFormValues,
  id: number,
  shoeOrderId: number | null
): ShoeFittingUpdateDTO {
  return {
    id,
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    shoeOrderId,
  }
}

function formValuesToRepairUpdateDTO(
  formValues: FittingFormValues,
  id: number,
  repairOrderId: number | null
): RepairFittingUpdateDTO {
  return {
    id,
    callDate: formValues.callDate!,
    appearanceDate: formValues.appearanceDate!,
    comment: formValues.comment ?? '',
    repairOrderId,
  }
}

export const fittingMappers = {
  dtoToFormValues,
  formValuesToOttobockCreateDTO,
  formValuesToProsthesisCreateDTO,
  formValuesToReadyMadeCreateDTO,
  formValuesToShoeCreateDTO,
  formValuesToRepairCreateDTO,
  formValuesToOttobockUpdateDTO,
  formValuesToProsthesisUpdateDTO,
  formValuesToReadyMadeUpdateDTO,
  formValuesToShoeUpdateDTO,
  formValuesToRepairUpdateDTO,
}
