import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import {
  InvoiceReadyMadeDTOSchema,
  InvoiceReadyMadeListDTOSchema,
  InvoiceReadyMadeCreateDTOSchema,
  InvoiceReadyMadeUpdateDTOSchema,
  InvoiceReadyMadeListParamsSchema,
  InvoiceReadyMadeStatusPatchDTOSchema,
} from '../model/schemas'
import type {
  InvoiceReadyMadeDTO,
  InvoiceReadyMadeListDTO,
  InvoiceReadyMadeCreateDTO,
  InvoiceReadyMadeUpdateDTO,
  InvoiceReadyMadeListParams,
  InvoiceReadyMadeStatusPatchDTO,
} from '../model/types'

const BASE = '/ready-poi-orders/overheads' as const

async function getList(params?: InvoiceReadyMadeListParams): Promise<InvoiceReadyMadeListDTO> {
  const query = params ? parseOrThrow(InvoiceReadyMadeListParamsSchema, params, 'GET /readyPoi-orders/overheads params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(InvoiceReadyMadeListDTOSchema, res.data, 'GET /readyPoi-orders/overheads response')
}

async function getById(id: ID): Promise<InvoiceReadyMadeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceReadyMade id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(InvoiceReadyMadeDTOSchema, res.data, 'GET /readyPoi-orders/overheads/{id} response')
}

async function create(data: InvoiceReadyMadeCreateDTO): Promise<InvoiceReadyMadeDTO> {
  const payload = parseOrThrow(InvoiceReadyMadeCreateDTOSchema, data, 'Create invoice-ready-made payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(InvoiceReadyMadeDTOSchema, res.data, 'POST /readyPoi-orders/overheads response')
}

async function updateById(id: ID, data: InvoiceReadyMadeUpdateDTO): Promise<InvoiceReadyMadeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceReadyMade id')
  const payload = parseOrThrow(InvoiceReadyMadeUpdateDTOSchema, data, 'Update invoice-ready-made payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(InvoiceReadyMadeDTOSchema, res.data, 'PUT /readyPoi-orders/overheads/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceReadyMade id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

async function patchStatus(id: ID, data: InvoiceReadyMadeStatusPatchDTO): Promise<InvoiceReadyMadeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceReadyMade id')
  const payload = parseOrThrow(InvoiceReadyMadeStatusPatchDTOSchema, data, 'Patch invoice-ready-made status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(InvoiceReadyMadeDTOSchema, res.data, 'PATCH /readyPoi-orders/overheads/{id}/status response')
}

export const invoiceReadyMadeService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
  patchStatus,
}

