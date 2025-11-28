
import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import {
  PersonContactDTOSchema,
  PersonContactListDTOSchema,
  PersonContactCreateDTOSchema,
  PersonContactUpdateDTOSchema,
} from '../model/schemas'
import type {
  PersonContactDTO,
  PersonContactListDTO,
  PersonContactCreateDTO,
  PersonContactUpdateDTO, PersonContactListParams,
} from '../model/types'
import z from 'zod'
import { ZodErrorMessages } from '@rupoi/shared/constant'

const BASE = '/person-contacts' as const

async function getList(params?: PersonContactListParams): Promise<PersonContactListDTO> {
  const res = await rupoiInstance.get(BASE, { params })
  return parseOrThrow(PersonContactListDTOSchema, res.data, 'GET /person-contacts response')
}

async function create(data: PersonContactCreateDTO): Promise<PersonContactDTO> {
  const payload = parseOrThrow(PersonContactCreateDTOSchema, data, 'Create person-contact payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(PersonContactDTOSchema, res.data, 'POST /person-contacts response')
}

async function updateById(id: number, data: PersonContactUpdateDTO): Promise<PersonContactDTO> {
  const validId = parseOrThrow(z.number(ZodErrorMessages.INVALID_NUMBER), id, 'PersonContact id')
  const payload = parseOrThrow(PersonContactUpdateDTOSchema, data, 'Update person-contact payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(PersonContactDTOSchema, res.data, 'PUT /person-contacts/{id} response')
}

async function deleteById(id: number): Promise<void> {
  const validId = parseOrThrow(z.number(ZodErrorMessages.INVALID_NUMBER), id, 'PersonContact id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export const personContactService = {
  getList,
  create,
  updateById,
  deleteById,
}