import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID, OrderStatusHistory, OrderFileDTO, OrderFileCreateDTO } from '@rupoi/shared/model'
import { IDSchema, OrderStatusHistorySchema, OrderFileDTOSchema, OrderFileCreateDTOSchema } from '@rupoi/shared/model'
import {
  OrderProsthesisDTOSchema,
  OrderProsthesisListDTOSchema,
  OrderProsthesisCreateDTOSchema,
  OrderProsthesisUpdateDTOSchema,
  OrderProsthesisListParamsSchema,
  OrderProsthesisStatusPatchDTOSchema,
  OrderProsthesisAssignWorkshopDTOSchema,
} from '../model/schemas'
import type {
  OrderProsthesisDTO,
  OrderProsthesisListDTO,
  OrderProsthesisCreateDTO,
  OrderProsthesisUpdateDTO,
  OrderProsthesisListParams,
  OrderProsthesisStatusPatchDTO,
  OrderProsthesisAssignWorkshopDTO,
} from '../model/types'

const BASE = '/prosthesis-orders' as const

async function getList(params?: OrderProsthesisListParams): Promise<OrderProsthesisListDTO> {
  const query = params ? parseOrThrow(OrderProsthesisListParamsSchema, params, 'GET /prosthesis-orders params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(OrderProsthesisListDTOSchema, res.data, 'GET /prosthesis-orders response')
}

async function getById(id: ID): Promise<OrderProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderProsthesis id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(OrderProsthesisDTOSchema, res.data, 'GET /prosthesis-orders/{id} response')
}

async function create(data: OrderProsthesisCreateDTO): Promise<OrderProsthesisDTO> {
  const payload = parseOrThrow(OrderProsthesisCreateDTOSchema, data, 'Create order-prosthesis payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(OrderProsthesisDTOSchema, res.data, 'POST /prosthesis-orders response')
}

async function updateById(id: ID, data: OrderProsthesisUpdateDTO): Promise<OrderProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderProsthesis id')
  const payload = parseOrThrow(OrderProsthesisUpdateDTOSchema, data, 'Update order-prosthesis payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(OrderProsthesisDTOSchema, res.data, 'PUT /prosthesis-orders/{id} response')
}

async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'OrderProsthesis id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

async function patchStatus(id: ID, data: OrderProsthesisStatusPatchDTO): Promise<OrderProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderProsthesis id')
  const payload = parseOrThrow(OrderProsthesisStatusPatchDTOSchema, data, 'Patch order-prosthesis status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(OrderProsthesisDTOSchema, res.data, 'PATCH /prosthesis-orders/{id}/status response')
}

async function getHistory(orderId: ID): Promise<OrderStatusHistory> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderProsthesis id')
  const res = await rupoiInstance.get(`/order-status-history/prosthesis-order/${validId}`)
  return parseOrThrow(OrderStatusHistorySchema, res.data, 'GET /order-status-history/prosthesis-order/{id} response')
}

async function assignWorkshop(id: ID, data: OrderProsthesisAssignWorkshopDTO): Promise<OrderProsthesisDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderProsthesis id')
  const payload = parseOrThrow(OrderProsthesisAssignWorkshopDTOSchema, data, 'Assign workshop payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/workshop`, payload)
  return parseOrThrow(OrderProsthesisDTOSchema, res.data, 'POST /prosthesis-orders/{id}/workshop response')
}

async function addFile(orderId: ID, data: OrderFileCreateDTO): Promise<OrderFileDTO> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderProsthesis id')
  const payload = parseOrThrow(OrderFileCreateDTOSchema, data, 'Add file payload')
  const res = await rupoiInstance.post(`${BASE}/${validId}/files`, payload)
  return parseOrThrow(OrderFileDTOSchema, res.data, 'POST /prosthesis-orders/{id}/files response')
}

async function removeFile(fileId: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, fileId, 'OrderFile id')
  await rupoiInstance.delete(`${BASE}/files/${validId}`)
}

export const orderProsthesisService = {
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
