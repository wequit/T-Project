import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID, OrderStatusHistory, OrderFileDTO, OrderFileCreateDTO } from '@rupoi/shared/model'
import { IDSchema, OrderStatusHistorySchema, OrderFileDTOSchema, OrderFileCreateDTOSchema } from '@rupoi/shared/model'
import {
  OrderShoeDTOSchema,
  OrderShoeListDTOSchema,
  OrderShoeCreateDTOSchema,
  OrderShoeUpdateDTOSchema,
  OrderShoeListParamsSchema,
  OrderShoeStatusPatchDTOSchema,
  OrderShoeAssignWorkshopDTOSchema,
} from '../model/schemas'
import type {
  OrderShoeDTO,
  OrderShoeListDTO,
  OrderShoeCreateDTO,
  OrderShoeUpdateDTO,
  OrderShoeListParams,
  OrderShoeStatusPatchDTO,
  OrderShoeAssignWorkshopDTO,
} from '../model/types'

const BASE = '/shoe-orders' as const

async function getList(params?: OrderShoeListParams): Promise<OrderShoeListDTO> {
  const query = params ? parseOrThrow(OrderShoeListParamsSchema, params, 'GET /shoe-orders params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(OrderShoeListDTOSchema, res.data, 'GET /shoe-orders response')
}

async function getById(id: ID): Promise<OrderShoeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderShoe id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(OrderShoeDTOSchema, res.data, 'GET /shoe-orders/{id} response')
}

async function create(data: OrderShoeCreateDTO): Promise<OrderShoeDTO> {
  const payload = parseOrThrow(OrderShoeCreateDTOSchema, data, 'Create order-shoe payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(OrderShoeDTOSchema, res.data, 'POST /shoe-orders response')
}

async function updateById(id: ID, data: OrderShoeUpdateDTO): Promise<OrderShoeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderShoe id')
  const payload = parseOrThrow(OrderShoeUpdateDTOSchema, data, 'Update order-shoe payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(OrderShoeDTOSchema, res.data, 'PUT /shoe-orders/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'OrderShoe id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

async function patchStatus(id: ID, data: OrderShoeStatusPatchDTO): Promise<OrderShoeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderShoe id')
  const payload = parseOrThrow(OrderShoeStatusPatchDTOSchema, data, 'Patch order-shoe status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(OrderShoeDTOSchema, res.data, 'PATCH /shoe-orders/{id}/status response')
}

async function getHistory(orderId: ID): Promise<OrderStatusHistory> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderShoe id')
  const res = await rupoiInstance.get(`/order-status-history/shoe-order/${validId}`)
  return parseOrThrow(OrderStatusHistorySchema, res.data, 'GET /order-status-history/shoe-order/{id} response')
}

async function assignWorkshop(id: ID, data: OrderShoeAssignWorkshopDTO): Promise<OrderShoeDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderShoe id')
  const payload = parseOrThrow(OrderShoeAssignWorkshopDTOSchema, data, 'Assign workshop payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/workshop`, payload)
  return parseOrThrow(OrderShoeDTOSchema, res.data, 'POST /shoe-orders/{id}/workshop response')
}

async function addFile(orderId: ID, data: OrderFileCreateDTO): Promise<OrderFileDTO> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderShoe id')
  const payload = parseOrThrow(OrderFileCreateDTOSchema, data, 'Add file payload')
  const res = await rupoiInstance.post(`${BASE}/${validId}/files`, payload)
  return parseOrThrow(OrderFileDTOSchema, res.data, 'POST /shoe-orders/{id}/files response')
}

async function removeFile(fileId: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, fileId, 'OrderFile id')
  await rupoiInstance.delete(`${BASE}/files/${validId}`)
}

export const orderShoeService = {
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
