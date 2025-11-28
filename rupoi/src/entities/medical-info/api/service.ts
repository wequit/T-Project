import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import {
  MedicalInfoDTOSchema,
  MedicalInfoListDTOSchema,
  MedicalInfoCreateDTOSchema,
  MedicalInfoUpdateDTOSchema,
} from '../model/schemas'
import type {
  MedicalInfoDTO,
  MedicalInfoListDTO,
  MedicalInfoCreateDTO,
  MedicalInfoUpdateDTO,
  MedicalInfoListParams,
} from '../model/types'

const BASE = '/medical-info' as const

export async function getList(params?: MedicalInfoListParams): Promise<MedicalInfoListDTO> {
  const res = await rupoiInstance.get(BASE, { params })
  return parseOrThrow(MedicalInfoListDTOSchema, res.data, 'GET /medical-info response')
}

export async function getById(id: number): Promise<MedicalInfoDTO> {
  const res = await rupoiInstance.get(`${BASE}/${id}`)
  return parseOrThrow(MedicalInfoDTOSchema, res.data, 'GET /medical-info/{id} response')
}

export async function create(data: MedicalInfoCreateDTO): Promise<MedicalInfoDTO> {
  const payload = parseOrThrow(MedicalInfoCreateDTOSchema, data, 'Create medical-info payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(MedicalInfoDTOSchema, res.data, 'POST /medical-info response')
}

export async function updateById(id: number, data: MedicalInfoUpdateDTO): Promise<MedicalInfoDTO> {
  const payload = parseOrThrow(MedicalInfoUpdateDTOSchema, data, 'Update medical-info payload')
  const res = await rupoiInstance.put(`${BASE}/${id}`, payload)
  return parseOrThrow(MedicalInfoDTOSchema, res.data, 'PUT /medical-info/{id} response')
}

export async function deleteById(id: number): Promise<void> {
  await rupoiInstance.delete(`${BASE}/${id}`)
}

export const medicalInfoService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
}