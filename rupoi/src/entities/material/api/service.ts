import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import { 
  MaterialListDTOSchema,
  getMaterialCreateDTOSchema,
  getMaterialUpdateDTOSchema,
  getMaterialDTOSchema,
} from '../model/schemas'
import type { 
  MaterialCreateDTO, 
  MaterialDTO, 
  MaterialListDTO,
  MaterialUpdateDTO 
} from '../model/types'
import { MaterialKind } from '../constant'

const BASES = {
  [MaterialKind.OTTOBOCK]: '/materials-for-ottobock-orders',
  [MaterialKind.READY_MADE]: '/materials-for-ready-poi-orders',
  [MaterialKind.REPAIR]: '/materials-for-repair-orders',
} as const

async function getList(kind: MaterialKind): Promise<MaterialListDTO> {
  const res = await rupoiInstance.get(BASES[kind])
  return parseOrThrow(MaterialListDTOSchema, res.data, `GET ${BASES[kind]} response`)
}

async function getById(kind: MaterialKind, id: ID): Promise<MaterialDTO> {
  const validId = parseOrThrow(IDSchema, id, 'Material id')
  const res = await rupoiInstance.get(`${BASES[kind]}/${validId}`)
  const schema = getMaterialDTOSchema(kind)
  return parseOrThrow(schema, res.data, `GET ${BASES[kind]}/{id} response`)
}

async function create(kind: MaterialKind, data: MaterialCreateDTO): Promise<MaterialDTO> {
  const schema = getMaterialCreateDTOSchema(kind)
  const payload = parseOrThrow(schema, data, `Create ${kind} material payload`)
  const res = await rupoiInstance.post(BASES[kind], payload)
  const responseSchema = getMaterialDTOSchema(kind)
  return parseOrThrow(responseSchema, res.data, `POST ${BASES[kind]} response`)
}

async function updateById(
  kind: MaterialKind,
  id: ID,
  data: MaterialUpdateDTO
): Promise<MaterialDTO> {
  const validId = parseOrThrow(IDSchema, id, 'Material id')
  const schema = getMaterialUpdateDTOSchema(kind)
  const payload = parseOrThrow(schema, data, `Update ${kind} material payload`)
  const res = await rupoiInstance.put(`${BASES[kind]}/${validId}`, payload)
  const responseSchema = getMaterialDTOSchema(kind)
  return parseOrThrow(responseSchema, res.data, `PUT ${BASES[kind]}/{id} response`)
}

async function deleteById(kind: MaterialKind, id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'Material id')
  await rupoiInstance.delete(`${BASES[kind]}/${validId}`)
}

export const materialService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
}
