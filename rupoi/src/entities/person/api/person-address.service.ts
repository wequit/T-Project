import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import {
  PersonAddressDTOSchema,
  PersonAddressListDTOSchema,
  PersonAddressCreateDTOSchema,
  PersonAddressUpdateDTOSchema,
} from '../model/schemas'
import type {
  PersonAddressDTO,
  PersonAddressListDTO,
  PersonAddressCreateDTO,
  PersonAddressUpdateDTO, PersonAddressListParams,
} from '../model/types'
import z from 'zod'
import { ZodErrorMessages } from '@rupoi/shared/constant'

const BASE = '/person-addresses' as const

async function getList(params?: PersonAddressListParams): Promise<PersonAddressListDTO> {
  const res = await rupoiInstance.get(BASE, { params })
  return parseOrThrow(PersonAddressListDTOSchema, res.data, 'GET /person-addresses response')
}

async function create(data: PersonAddressCreateDTO): Promise<PersonAddressDTO> {
  const payload = parseOrThrow(PersonAddressCreateDTOSchema, data, 'Create person-address payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(PersonAddressDTOSchema, res.data, 'POST /person-addresses response')
}

async function updateById(id: number, data: PersonAddressUpdateDTO): Promise<PersonAddressDTO> {
  const validId = parseOrThrow(z.number(ZodErrorMessages.INVALID_NUMBER), id, 'PersonAddress id')
  const payload = parseOrThrow(PersonAddressUpdateDTOSchema, data, 'Update person-address payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(PersonAddressDTOSchema, res.data, 'PUT /person-addresses/{id} response')
}

async function deleteById(id: number): Promise<void> {
  const validId = parseOrThrow(z.number(ZodErrorMessages.INVALID_NUMBER), id, 'PersonAddress id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export const personAddressService = {
  getList,
  create,
  updateById,
  deleteById,
}