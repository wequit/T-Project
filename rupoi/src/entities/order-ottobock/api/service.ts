import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID, OrderStatusHistory, OrderFileDTO, OrderFileCreateDTO } from '@rupoi/shared/model'
import { IDSchema, OrderStatusHistorySchema, OrderFileDTOSchema, OrderFileCreateDTOSchema } from '@rupoi/shared/model'
import {
  OrderOttobockDTOSchema,
  OrderOttobockListDTOSchema,
  OrderOttobockCreateDTOSchema,
  OrderOttobockUpdateDTOSchema,
  OrderOttobockListParamsSchema,
  OrderOttobockStatusPatchDTOSchema,
  OrderOttobockAssignWorkshopDTOSchema,
} from '../model/schemas'
import type {
  OrderOttobockDTO,
  OrderOttobockListDTO,
  OrderOttobockCreateDTO,
  OrderOttobockUpdateDTO,
  OrderOttobockListParams,
  OrderOttobockStatusPatchDTO,
  OrderOttobockAssignWorkshopDTO,
} from '../model/types'

const BASE = '/ottobock-orders' as const

export async function getList(params?: OrderOttobockListParams): Promise<OrderOttobockListDTO> {
  const query = params ? parseOrThrow(OrderOttobockListParamsSchema, params, 'GET /ottobock-orders params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(OrderOttobockListDTOSchema, res.data, 'GET /ottobock-orders response')
}

export async function getById(id: ID): Promise<OrderOttobockDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderOttobock id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(OrderOttobockDTOSchema, res.data, 'GET /ottobock-orders/{id} response')
}

export async function create(data: OrderOttobockCreateDTO): Promise<OrderOttobockDTO> {
  const payload = parseOrThrow(OrderOttobockCreateDTOSchema, data, 'Create order-ottobock payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(OrderOttobockDTOSchema, res.data, 'POST /ottobock-orders response')
}

export async function updateById(id: ID, data: OrderOttobockUpdateDTO): Promise<OrderOttobockDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderOttobock id')
  const payload = parseOrThrow(OrderOttobockUpdateDTOSchema, data, 'Update order-ottobock payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(OrderOttobockDTOSchema, res.data, 'PUT /ottobock-orders/{id} response')
}

export async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'OrderOttobock id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export async function patchStatus(id: ID, data: OrderOttobockStatusPatchDTO): Promise<OrderOttobockDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderOttobock id')
  const payload = parseOrThrow(OrderOttobockStatusPatchDTOSchema, data, 'Patch order-ottobock status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(OrderOttobockDTOSchema, res.data, 'PATCH /ottobock-orders/{id}/status response')
}

export async function getHistory(orderId: ID): Promise<OrderStatusHistory> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderOttobock id')
  const res = await rupoiInstance.get(`/order-status-history/ottobock-order/${validId}`)
  return parseOrThrow(OrderStatusHistorySchema, res.data, 'GET /order-status-history/ottobock-order/{id} response')
}

async function assignWorkshop(id: ID, data: OrderOttobockAssignWorkshopDTO): Promise<OrderOttobockDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderOttobock id')
  const payload = parseOrThrow(OrderOttobockAssignWorkshopDTOSchema, data, 'Assign workshop payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/workshop`, payload)
  return parseOrThrow(OrderOttobockDTOSchema, res.data, 'POST /ottobock-orders/{id}/workshop response')
}

async function addFile(orderId: ID, data: OrderFileCreateDTO): Promise<OrderFileDTO> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderOttobock id')
  const payload = parseOrThrow(OrderFileCreateDTOSchema, data, 'Add file payload')
  const res = await rupoiInstance.post(`${BASE}/${validId}/files`, payload)
  return parseOrThrow(OrderFileDTOSchema, res.data, 'POST /ottobock-orders/{id}/files response')
}

async function removeFile(fileId: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, fileId, 'OrderFile id')
  await rupoiInstance.delete(`${BASE}/files/${validId}`)
}

export const orderOttobockService = {
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
