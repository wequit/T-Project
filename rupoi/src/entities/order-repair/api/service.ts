import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import type { ID, OrderStatusHistory, OrderFileDTO, OrderFileCreateDTO } from '@rupoi/shared/model'
import { IDSchema, OrderStatusHistorySchema, OrderFileDTOSchema, OrderFileCreateDTOSchema } from '@rupoi/shared/model'
import {
  OrderRepairDTOSchema,
  OrderRepairListDTOSchema,
  OrderRepairCreateDTOSchema,
  OrderRepairUpdateDTOSchema,
  OrderRepairListParamsSchema,
  OrderRepairStatusPatchDTOSchema,
  OrderRepairAssignWorkshopDTOSchema,
} from '../model/schemas'
import type {
  OrderRepairDTO,
  OrderRepairListDTO,
  OrderRepairCreateDTO,
  OrderRepairUpdateDTO,
  OrderRepairListParams,
  OrderRepairStatusPatchDTO,
  OrderRepairAssignWorkshopDTO,
} from '../model/types'

const BASE = '/repair-orders' as const

export async function getList(params?: OrderRepairListParams): Promise<OrderRepairListDTO> {
  const query = params ? parseOrThrow(OrderRepairListParamsSchema, params, 'GET /repair-orders params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(OrderRepairListDTOSchema, res.data, 'GET /repair-orders response')
}

export async function getById(id: ID): Promise<OrderRepairDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderRepair id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(OrderRepairDTOSchema, res.data, 'GET /repair-orders/{id} response')
}

export async function create(data: OrderRepairCreateDTO): Promise<OrderRepairDTO> {
  const payload = parseOrThrow(OrderRepairCreateDTOSchema, data, 'Create order-repair payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(OrderRepairDTOSchema, res.data, 'POST /repair-orders response')
}

export async function updateById(id: ID, data: OrderRepairUpdateDTO): Promise<OrderRepairDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderRepair id')
  const payload = parseOrThrow(OrderRepairUpdateDTOSchema, data, 'Update order-repair payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(OrderRepairDTOSchema, res.data, 'PUT /repair-orders/{id} response')
}

export async function deleteById(id: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, id, 'OrderRepair id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export async function patchStatus(id: ID, data: OrderRepairStatusPatchDTO): Promise<OrderRepairDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderRepair id')
  const payload = parseOrThrow(OrderRepairStatusPatchDTOSchema, data, 'Patch order-repair status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(OrderRepairDTOSchema, res.data, 'PATCH /repair-orders/{id}/status response')
}

export async function getHistory(orderId: ID): Promise<OrderStatusHistory> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderRepair id')
  const res = await rupoiInstance.get(`/order-status-history/repair-order/${validId}`)
  return parseOrThrow(OrderStatusHistorySchema, res.data, 'GET /order-status-history/repair-order/{id} response')
}

async function assignWorkshop(id: ID, data: OrderRepairAssignWorkshopDTO): Promise<OrderRepairDTO> {
  const validId = parseOrThrow(IDSchema, id, 'OrderRepair id')
  const payload = parseOrThrow(OrderRepairAssignWorkshopDTOSchema, data, 'Assign workshop payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/workshop`, payload)
  return parseOrThrow(OrderRepairDTOSchema, res.data, 'POST /repair-orders/{id}/workshop response')
}

async function addFile(orderId: ID, data: OrderFileCreateDTO): Promise<OrderFileDTO> {
  const validId = parseOrThrow(IDSchema, orderId, 'OrderRepair id')
  const payload = parseOrThrow(OrderFileCreateDTOSchema, data, 'Add file payload')
  const res = await rupoiInstance.post(`${BASE}/${validId}/files`, payload)
  return parseOrThrow(OrderFileDTOSchema, res.data, 'POST /repair-orders/{id}/files response')
}

async function removeFile(fileId: ID): Promise<void> {
  const validId = parseOrThrow(IDSchema, fileId, 'OrderFile id')
  await rupoiInstance.delete(`${BASE}/files/${validId}`)
}

export const orderRepairService = {
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
