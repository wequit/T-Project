import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import {
  InvoiceOttobockDTOSchema,
  InvoiceOttobockListDTOSchema,
  InvoiceOttobockCreateDTOSchema,
  InvoiceOttobockUpdateDTOSchema,
  InvoiceOttobockListParamsSchema,
  InvoiceOttobockStatusPatchDTOSchema,
} from '../model/schemas'
import type {
  InvoiceOttobockDTO,
  InvoiceOttobockListDTO,
  InvoiceOttobockCreateDTO,
  InvoiceOttobockUpdateDTO,
  InvoiceOttobockListParams,
  InvoiceOttobockStatusPatchDTO,
} from '../model/types'

const BASE = '/ottobock-orders/overheads' as const

async function getList(params?: InvoiceOttobockListParams): Promise<InvoiceOttobockListDTO> {
  const query = params ? parseOrThrow(InvoiceOttobockListParamsSchema, params, 'GET /ottobock-orders/overheads params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(InvoiceOttobockListDTOSchema, res.data, 'GET /ottobock-orders/overheads response')
}

async function getById(id: ID): Promise<InvoiceOttobockDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceOttobock id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(InvoiceOttobockDTOSchema, res.data, 'GET /ottobock-orders/overheads/{id} response')
}

async function create(data: InvoiceOttobockCreateDTO): Promise<InvoiceOttobockDTO> {
  const payload = parseOrThrow(InvoiceOttobockCreateDTOSchema, data, 'Create invoice-ottobock payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(InvoiceOttobockDTOSchema, res.data, 'POST /ottobock-orders/overheads response')
}

async function updateById(id: ID, data: InvoiceOttobockUpdateDTO): Promise<InvoiceOttobockDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceOttobock id')
  const payload = parseOrThrow(InvoiceOttobockUpdateDTOSchema, data, 'Update invoice-ottobock payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(InvoiceOttobockDTOSchema, res.data, 'PUT /ottobock-orders/overheads/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceOttobock id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

async function patchStatus(id: ID, data: InvoiceOttobockStatusPatchDTO): Promise<InvoiceOttobockDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceOttobock id')
  const payload = parseOrThrow(InvoiceOttobockStatusPatchDTOSchema, data, 'Patch invoice-ottobock status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(InvoiceOttobockDTOSchema, res.data, 'PATCH /ottobock-orders/overheads/{id}/status response')
}

export const invoiceOttobockService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
  patchStatus,
}


