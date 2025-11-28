import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID } from '@rupoi/shared/model'
import { IDSchema } from '@rupoi/shared/model'
import {
  InvoiceRepairDTOSchema,
  InvoiceRepairListDTOSchema,
  InvoiceRepairCreateDTOSchema,
  InvoiceRepairUpdateDTOSchema,
  InvoiceRepairListParamsSchema,
  InvoiceRepairStatusPatchDTOSchema,
} from '../model/schemas'
import type {
  InvoiceRepairDTO,
  InvoiceRepairListDTO,
  InvoiceRepairCreateDTO,
  InvoiceRepairUpdateDTO,
  InvoiceRepairListParams,
  InvoiceRepairStatusPatchDTO,
} from '../model/types'

const BASE = '/repair-orders/overheads' as const

async function getList(params?: InvoiceRepairListParams): Promise<InvoiceRepairListDTO> {
  const query = params ? parseOrThrow(InvoiceRepairListParamsSchema, params, 'GET /repair-orders/overheads params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(InvoiceRepairListDTOSchema, res.data, 'GET /repair-orders/overheads response')
}

async function getById(id: ID): Promise<InvoiceRepairDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceRepair id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(InvoiceRepairDTOSchema, res.data, 'GET /repair-orders/overheads/{id} response')
}

async function create(data: InvoiceRepairCreateDTO): Promise<InvoiceRepairDTO> {
  const payload = parseOrThrow(InvoiceRepairCreateDTOSchema, data, 'Create invoice-repair payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(InvoiceRepairDTOSchema, res.data, 'POST /repair-orders/overheads response')
}

async function updateById(id: ID, data: InvoiceRepairUpdateDTO): Promise<InvoiceRepairDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceRepair id')
  const payload = parseOrThrow(InvoiceRepairUpdateDTOSchema, data, 'Update invoice-repair payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(InvoiceRepairDTOSchema, res.data, 'PUT /repair-orders/overheads/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceRepair id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

async function patchStatus(id: ID, data: InvoiceRepairStatusPatchDTO): Promise<InvoiceRepairDTO> {
  const validId = parseOrThrow(IDSchema, id, 'InvoiceRepair id')
  const payload = parseOrThrow(InvoiceRepairStatusPatchDTOSchema, data, 'Patch invoice-repair status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(InvoiceRepairDTOSchema, res.data, 'PATCH /repair-orders/overheads/{id}/status response')
}

export const invoiceRepairService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
  patchStatus,
}

