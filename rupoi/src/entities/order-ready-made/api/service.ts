import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID, OrderStatusHistory, OrderFileDTO, OrderFileCreateDTO } from '@rupoi/shared/model'
import { IDSchema, OrderStatusHistorySchema, OrderFileDTOSchema, OrderFileCreateDTOSchema } from '@rupoi/shared/model'
import {
  OrderReadyMadeDTOSchema,
  OrderReadyMadeListDTOSchema,
  OrderReadyMadeCreateDTOSchema,
  OrderReadyMadeUpdateDTOSchema,
  OrderReadyMadeListParamsSchema,
  OrderReadyMadeStatusPatchDTOSchema,
  OrderReadyMadeAssignWorkshopDTOSchema,
} from '../model/schemas'
import type {
  OrderReadyMadeDTO,
  OrderReadyMadeListDTO,
  OrderReadyMadeCreateDTO,
  OrderReadyMadeUpdateDTO,
  OrderReadyMadeListParams,
  OrderReadyMadeStatusPatchDTO,
  OrderReadyMadeAssignWorkshopDTO,
} from '../model/types'

const BASE = '/ready-poi-orders' as const

export async function getList(params?: OrderReadyMadeListParams): Promise<OrderReadyMadeListDTO> {
  const query = params ? parseOrThrow(OrderReadyMadeListParamsSchema, params, 'GET /ready-poi-orders params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(OrderReadyMadeListDTOSchema, res.data, 'GET /ready-poi-orders response')
}

export async function getById(id: ID): Promise<OrderReadyMadeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderReadyMade id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(OrderReadyMadeDTOSchema, res.data, 'GET /ready-poi-orders/{id} response')
}

export async function create(data: OrderReadyMadeCreateDTO): Promise<OrderReadyMadeDTO> {
  const payload = parseOrThrow(OrderReadyMadeCreateDTOSchema, data, 'Create order-ready-made payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(OrderReadyMadeDTOSchema, res.data, 'POST /ready-poi-orders response')
}

export async function updateById(id: ID, data: OrderReadyMadeUpdateDTO): Promise<OrderReadyMadeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderReadyMade id')
  const payload = parseOrThrow(OrderReadyMadeUpdateDTOSchema, data, 'Update order-ready-made payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(OrderReadyMadeDTOSchema, res.data, 'PUT /ready-poi-orders/{id} response')
}

export async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'OrderReadyMade id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export async function patchStatus(id: ID, data: OrderReadyMadeStatusPatchDTO): Promise<OrderReadyMadeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderReadyMade id')
  const payload = parseOrThrow(OrderReadyMadeStatusPatchDTOSchema, data, 'Patch order-ready-made status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(OrderReadyMadeDTOSchema, res.data, 'PATCH /ready-poi-orders/{id}/status response')
}

export async function getHistory(orderId: ID): Promise<OrderStatusHistory> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderReadyMade id')
  const res = await rupoiInstance.get(`/order-status-history/ready-poi-order/${validId}`)
  return parseOrThrow(OrderStatusHistorySchema, res.data, 'GET /order-status-history/ready-poi-order/{id} response')
}

async function assignWorkshop(id: ID, data: OrderReadyMadeAssignWorkshopDTO): Promise<OrderReadyMadeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderReadyMade id')
  const payload = parseOrThrow(OrderReadyMadeAssignWorkshopDTOSchema, data, 'Assign workshop payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/workshop`, payload)
  return parseOrThrow(OrderReadyMadeDTOSchema, res.data, 'POST /ready-poi-orders/{id}/workshop response')
}

async function addFile(orderId: ID, data: OrderFileCreateDTO): Promise<OrderFileDTO> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderReadyMade id')
  const payload = parseOrThrow(OrderFileCreateDTOSchema, data, 'Add file payload')
  const res = await rupoiInstance.post(`${BASE}/${validId}/files`, payload)
  return parseOrThrow(OrderFileDTOSchema, res.data, 'POST /ready-poi-orders/{id}/files response')
}

async function removeFile(fileId: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, fileId, 'OrderFile id')
  await rupoiInstance.delete(`${BASE}/files/${validId}`)
}

export const orderReadyMadeService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
  patchStatus,
  getHistory,
  assignWorkshop,
  addFile,
  removeFile,
}
