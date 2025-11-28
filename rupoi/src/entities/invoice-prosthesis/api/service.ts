import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import {
  InvoiceProsthesisDTOSchema,
  InvoiceProsthesisListDTOSchema,
  InvoiceProsthesisCreateDTOSchema,
  InvoiceProsthesisUpdateDTOSchema,
  InvoiceProsthesisListParamsSchema,
  InvoiceProsthesisStatusPatchDTOSchema,
} from '../model/schemas'
import type {
  InvoiceProsthesisDTO,
  InvoiceProsthesisListDTO,
  InvoiceProsthesisCreateDTO,
  InvoiceProsthesisUpdateDTO,
  InvoiceProsthesisListParams,
  InvoiceProsthesisStatusPatchDTO,
} from '../model/types'

const BASE = '/prosthesis-orders/overheads' as const

async function getList(params?: InvoiceProsthesisListParams): Promise<InvoiceProsthesisListDTO> {
  const query = params ? parseOrThrow(InvoiceProsthesisListParamsSchema, params, 'GET /prosthesis-orders/overheads params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(InvoiceProsthesisListDTOSchema, res.data, 'GET /prosthesis-orders/overheads response')
}

async function getById(id: ID): Promise<InvoiceProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceProsthesis id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(InvoiceProsthesisDTOSchema, res.data, 'GET /prosthesis-orders/overheads/{id} response')
}

async function create(data: InvoiceProsthesisCreateDTO): Promise<InvoiceProsthesisDTO> {
  const payload = parseOrThrow(InvoiceProsthesisCreateDTOSchema, data, 'Create invoice-prosthesis payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(InvoiceProsthesisDTOSchema, res.data, 'POST /prosthesis-orders/overheads response')
}

async function updateById(id: ID, data: InvoiceProsthesisUpdateDTO): Promise<InvoiceProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceProsthesis id')
  const payload = parseOrThrow(InvoiceProsthesisUpdateDTOSchema, data, 'Update invoice-prosthesis payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(InvoiceProsthesisDTOSchema, res.data, 'PUT /prosthesis-orders/overheads/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceProsthesis id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

async function patchStatus(id: ID, data: InvoiceProsthesisStatusPatchDTO): Promise<InvoiceProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceProsthesis id')
  const payload = parseOrThrow(InvoiceProsthesisStatusPatchDTOSchema, data, 'Patch invoice-prosthesis status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(InvoiceProsthesisDTOSchema, res.data, 'PATCH /prosthesis-orders/overheads/{id}/status response')
}

export const invoiceProsthesisService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
  patchStatus,
}

