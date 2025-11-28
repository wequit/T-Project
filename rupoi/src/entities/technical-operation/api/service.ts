import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import { 
  TechnicalOperationCreateDTOSchema, 
  TechnicalOperationDTOSchema, 
  TechnicalOperationListDTOSchema,
  TechnicalOperationUpdateDTOSchema 
} from '../model/schemas'
import type { 
  TechnicalOperationCreateDTO, 
  TechnicalOperationDTO, 
  TechnicalOperationListDTO,
  TechnicalOperationUpdateDTO 
} from '../model/types'

const BASE = '/technical-operations' as const

async function getList(): Promise<TechnicalOperationListDTO> {
  const res = await rupoiInstance.get(BASE)
  return parseOrThrow(TechnicalOperationListDTOSchema, res.data, 'GET /technical-operations response')
}

async function getById(id: ID): Promise<TechnicalOperationDTO> {
  const validId = parseOrThrow(IDSchema, id, 'TechnicalOperation id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(TechnicalOperationDTOSchema, res.data, 'GET /technical-operations/{id} response')
}

async function create(data: TechnicalOperationCreateDTO): Promise<TechnicalOperationDTO> {
  const payload = parseOrThrow(TechnicalOperationCreateDTOSchema, data, 'Create technical-operation payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(TechnicalOperationDTOSchema, res.data, 'POST /technical-operations response')
}

async function updateById(id: ID, data: TechnicalOperationUpdateDTO): Promise<TechnicalOperationDTO> {
  const validId = parseOrThrow(IDSchema, id, 'TechnicalOperation id')
  const payload = parseOrThrow(TechnicalOperationUpdateDTOSchema, data, 'Update technical-operation payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(TechnicalOperationDTOSchema, res.data, 'PUT /technical-operations/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'TechnicalOperation id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export const technicalOperationService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
}
