import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import {type UUID, UUIDSchema} from '@rupoi/shared/model'
import {
  PersonDocumentDTOSchema,
  PersonDocumentListDTOSchema,
  PersonDocumentCreateDTOSchema,
  PersonDocumentUpdateDTOSchema,
} from '../model/schemas'
import type {
  PersonDocumentDTO,
  PersonDocumentListDTO,
  PersonDocumentCreateDTO,
  PersonDocumentUpdateDTO, PersonDocumentListParams,
} from '../model/types'

const BASE = '/person-documents' as const

async function getList(params?: PersonDocumentListParams): Promise<PersonDocumentListDTO> {
  const res = await rupoiInstance.get(BASE, { params })
  return parseOrThrow(PersonDocumentListDTOSchema, res.data, 'GET /person-documents response')
}

async function create(data: PersonDocumentCreateDTO): Promise<PersonDocumentDTO> {
  const payload = parseOrThrow(PersonDocumentCreateDTOSchema, data, 'Create person-document payload')
  const res = await rupoiInstance.post(BASE, payload)
  return parseOrThrow(PersonDocumentDTOSchema, res.data, 'POST /person-documents response')
}

async function updateById(id: UUID, data: PersonDocumentUpdateDTO): Promise<PersonDocumentDTO> {
  const validId = parseOrThrow(UUIDSchema, id, 'PersonDocument id')
  const payload = parseOrThrow(PersonDocumentUpdateDTOSchema, data, 'Update person-document payload')
  const res = await rupoiInstance.put(`${BASE}/${validId}`, payload)
  return parseOrThrow(PersonDocumentDTOSchema, res.data, 'PUT /person-documents/{id} response')
}

async function deleteById(id: UUID): Promise<void> {
  const validId = parseOrThrow(UUIDSchema, id, 'PersonDocument id')
  await rupoiInstance.delete(`${BASE}/${validId}`)
}

export const personDocumentService = {
  getList,
  create,
  updateById,
  deleteById,
}