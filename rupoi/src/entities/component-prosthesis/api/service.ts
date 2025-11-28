import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import {
  ComponentProsthesisCreateDTOSchema,
  ComponentProsthesisDTOSchema,
  ComponentProsthesisListDTOSchema,
  ComponentProsthesisListParamsSchema,
  ComponentProsthesisUpdateDTOSchema,
} from '../model/schemas'
import type {
  ComponentProsthesisCreateDTO,
  ComponentProsthesisDTO,
  ComponentProsthesisListDTO,
  ComponentProsthesisListParams,
  ComponentProsthesisUpdateDTO,
} from '../model/types'

const BASE = '/component-prosthesis-orders' as const

async function getList(params?: ComponentProsthesisListParams): Promise<ComponentProsthesisListDTO> {
  const query = params ? parseOrThrow(ComponentProsthesisListParamsSchema, params, 'GET /component-prosthesis-orders params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(ComponentProsthesisListDTOSchema, res.data, 'GET /component-prosthesis-orders response')
}

async function getById(id: ID): Promise<ComponentProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'ComponentProsthesis id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(ComponentProsthesisDTOSchema, res.data, 'GET /component-prosthesis-orders/{id} response')
}

async function create(data: ComponentProsthesisCreateDTO): Promise<ComponentProsthesisDTO> {
  const payload = parseOrThrow(ComponentProsthesisCreateDTOSchema, data, 'Create component-prosthesis-order payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(ComponentProsthesisDTOSchema, res.data, 'POST /component-prosthesis-orders response')
}

async function updateById(id: ID, data: ComponentProsthesisUpdateDTO): Promise<ComponentProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'ComponentProsthesis id')
  const payload = parseOrThrow(ComponentProsthesisUpdateDTOSchema, data, 'Update component-prosthesis-order payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(ComponentProsthesisDTOSchema, res.data, 'PUT /component-prosthesis-orders/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'ComponentProsthesis id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export const componentProsthesisService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
}
