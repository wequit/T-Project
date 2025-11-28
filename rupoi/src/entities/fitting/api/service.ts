import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import { 
  FittingDTOSchema, 
  FittingListDTOSchema,
  getFittingCreateDTOSchema, 
  getFittingUpdateDTOSchema,
  getFittingDTOSchema,
} from '../model/schemas'
import type { 
  FittingCreateDTO, 
  FittingDTO, 
  FittingListDTO,
  FittingUpdateDTO 
} from '../model/types'
import { FittingKind } from '../constant'

const BASES = {
  [FittingKind.OTTOBOCK]: '/ottobock-fitting-orders',
  [FittingKind.PROSTHESIS]: '/prosthesis-fitting-orders',
  [FittingKind.READY_MADE]: '/ready-poi-fitting-orders',
  [FittingKind.SHOE]: '/shoe-fitting-orders',
  [FittingKind.REPAIR]: '/repair-fitting-orders',
} as const

async function getList(kind: FittingKind): Promise<FittingListDTO> {
  const res = await rupoiInstance.get(BASES[kind])
  return parseOrThrow(FittingListDTOSchema, res.data, `GET ${BASES[kind]} response`)
}

async function getById(kind: FittingKind, id: ID): Promise<FittingDTO> {
  const validId = parseOrThrow(IDSchema, id, 'Fitting id')
  const res = await rupoiInstance.get(`${BASES[kind]}/${validId}`)
  const schema = getFittingDTOSchema(kind)
  return parseOrThrow(schema, res.data, `GET ${BASES[kind]}/{id} response`) as FittingDTO
}

async function create(kind: FittingKind, data: FittingCreateDTO): Promise<FittingDTO> {
  const schema = getFittingCreateDTOSchema(kind)
  const payload = parseOrThrow(schema, data, `Create ${kind} fitting payload`)
  const res = await rupoiInstance.post(BASES[kind], payload)
  const responseSchema = getFittingDTOSchema(kind)
  return parseOrThrow(responseSchema, res.data, `POST ${BASES[kind]} response`) as FittingDTO
}

async function updateById(
  kind: FittingKind,
  id: ID,
  data: FittingUpdateDTO
): Promise<FittingDTO> {
  const validId = parseOrThrow(IDSchema, id, 'Fitting id')
  const schema = getFittingUpdateDTOSchema(kind)
  const payload = parseOrThrow(schema, data, `Update ${kind} fitting payload`)
  const res = await rupoiInstance.put(`${BASES[kind]}/${validId}`, payload)
  const responseSchema = getFittingDTOSchema(kind)
  return parseOrThrow(responseSchema, res.data, `PUT ${BASES[kind]}/{id} response`) as FittingDTO
}

async function deleteById(kind: FittingKind, id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'Fitting id')
  await rupoiInstance.delete(`${BASES[kind]}/${validId}`)
}

export const fittingService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
}
