import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import {
  InvoiceShoeDTOSchema,
  InvoiceShoeListDTOSchema,
  InvoiceShoeCreateDTOSchema,
  InvoiceShoeUpdateDTOSchema,
  InvoiceShoeListParamsSchema,
  InvoiceShoeStatusPatchDTOSchema,
} from '../model/schemas'
import type {
  InvoiceShoeDTO,
  InvoiceShoeListDTO,
  InvoiceShoeCreateDTO,
  InvoiceShoeUpdateDTO,
  InvoiceShoeListParams,
  InvoiceShoeStatusPatchDTO,
} from '../model/types'

const BASE = '/shoe-orders/overheads' as const

async function getList(params?: InvoiceShoeListParams): Promise<InvoiceShoeListDTO> {
  const query = params ? parseOrThrow(InvoiceShoeListParamsSchema, params, 'GET /shoe-orders/overheads params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(InvoiceShoeListDTOSchema, res.data, 'GET /shoe-orders/overheads response')
}

async function getById(id: ID): Promise<InvoiceShoeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceShoe id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(InvoiceShoeDTOSchema, res.data, 'GET /shoe-orders/overheads/{id} response')
}

async function create(data: InvoiceShoeCreateDTO): Promise<InvoiceShoeDTO> {
  const payload = parseOrThrow(InvoiceShoeCreateDTOSchema, data, 'Create invoice-shoe payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(InvoiceShoeDTOSchema, res.data, 'POST /shoe-orders/overheads response')
}

async function updateById(id: ID, data: InvoiceShoeUpdateDTO): Promise<InvoiceShoeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceShoe id')
  const payload = parseOrThrow(InvoiceShoeUpdateDTOSchema, data, 'Update invoice-shoe payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(InvoiceShoeDTOSchema, res.data, 'PUT /shoe-orders/overheads/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceShoe id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

async function patchStatus(id: ID, data: InvoiceShoeStatusPatchDTO): Promise<InvoiceShoeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceShoe id')
  const payload = parseOrThrow(InvoiceShoeStatusPatchDTOSchema, data, 'Patch invoice-shoe status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(InvoiceShoeDTOSchema, res.data, 'PATCH /shoe-orders/overheads/{id}/status response')
}

export const invoiceShoeService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
  patchStatus,
}

