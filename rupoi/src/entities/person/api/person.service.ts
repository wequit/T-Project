import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import {type UUID, UUIDSchema} from '@rupoi/shared/model'
import {
  PersonDTOSchema,
  PersonListDTOSchema,
  PersonCreateDTOSchema,
  PersonUpdateDTOSchema,
  PersonChangeStatusDTOSchema,
  PersonListParamsSchema,
} from '../model/schemas'
import type {
  PersonDTO,
  PersonListDTO,
  PersonCreateDTO,
  PersonUpdateDTO,
  PersonChangeStatusDTO,
  PersonListParams,
} from '../model/types'

const BASE = '/persons' as const

async function getList(params?: PersonListParams): Promise<PersonListDTO> {
  const query = params ? parseOrThrow(PersonListParamsSchema, params, 'GET /persons params') : undefined
  const res = await rupoiInstance.get(BASE, { params: query })
  return parseOrThrow(PersonListDTOSchema, res.data, 'GET /persons response')
}

async function getById(id: UUID): Promise<PersonDTO> {
  const validId = parseOrThrow(UUIDSchema, id, 'Person id')
  const res = await rupoiInstance.get(`${BASE}/${validId}`)
  return parseOrThrow(PersonDTOSchema, res.data, 'GET /persons/{id} response')
}

async function create(data: PersonCreateDTO): Promise<PersonDTO> {
  const payload = parseOrThrow(PersonCreateDTOSchema, data, 'Create person payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(PersonDTOSchema, res.data, 'POST /persons response')
}

async function updateById(id: UUID, data: PersonUpdateDTO): Promise<PersonDTO> {
  const validId = parseOrThrow(UUIDSchema, id, 'Person id')
  const payload = parseOrThrow(PersonUpdateDTOSchema, data, 'Update person payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(PersonDTOSchema, res.data, 'PUT /persons/{id} response')
}

async function deleteById(id: UUID): Promise<void> {
  const validId = parseOrThrow(UUIDSchema, id, 'Person id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

async function changeStatus(id: UUID, data: PersonChangeStatusDTO): Promise<PersonDTO> {
  const validId = parseOrThrow(UUIDSchema, id, 'Person id')
  const payload = parseOrThrow(PersonChangeStatusDTOSchema, data, 'Change person status payload')
  const res = await rupoiInstance.patch(`${BASE}/${validId}/status`, payload)
  return parseOrThrow(PersonDTOSchema, res.data, 'PATCH /persons/{id}/status response')
}

export const personService = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
  changeStatus,
}