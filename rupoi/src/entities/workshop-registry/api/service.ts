import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import {
  WorkshopRegistryDTOSchema,
  WorkshopRegistryListDTOSchema,
  WorkshopRegistryCreateDTOSchema,
  WorkshopRegistryUpdateDTOSchema,
  WorkshopRegistryListParamsSchema,
} from '../model/schemas'
import type {
  WorkshopRegistryDTO,
  WorkshopRegistryListDTO,
  WorkshopRegistryCreateDTO,
  WorkshopRegistryUpdateDTO,
  WorkshopRegistryListParams,
} from '../model/types'

const BASE = '/workshops' as const

export async function getList(params?: WorkshopRegistryListParams): Promise<WorkshopRegistryListDTO> {
  const query = params ? parseOrThrow(WorkshopRegistryListParamsSchema, params, 'GET /workshops params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(WorkshopRegistryListDTOSchema, res.data, 'GET /workshops response')
}

export async function getById(id: ID): Promise<WorkshopRegistryDTO> {
  const validId = parseOrThrow(IDSchema, id, 'WorkshopRegistry id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(WorkshopRegistryDTOSchema, res.data, 'GET /workshops/{id} response')
}

export async function create(data: WorkshopRegistryCreateDTO): Promise<WorkshopRegistryDTO> {
  const payload = parseOrThrow(WorkshopRegistryCreateDTOSchema, data, 'Create workshop-registry payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(WorkshopRegistryDTOSchema, res.data, 'POST /workshops response')
}

export async function updateById(id: ID, data: WorkshopRegistryUpdateDTO): Promise<WorkshopRegistryDTO> {
  const validId = parseOrThrow(IDSchema, id, 'WorkshopRegistry id')
  const payload = parseOrThrow(WorkshopRegistryUpdateDTOSchema, data, 'Update workshop-registry payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(WorkshopRegistryDTOSchema, res.data, 'PUT /workshops/{id} response')
}

export async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'WorkshopRegistry id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export const workshopRegistryService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
}

