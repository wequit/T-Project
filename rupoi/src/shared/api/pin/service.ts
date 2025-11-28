import { rupoiInstance } from '@rupoi/shared/api/axios-instance'
import { parseOrThrow } from '@rupoi/shared/lib'
import { PinDataParamsSchema, PinDataResponseSchema } from '@rupoi/shared/model'
import type { PinDataParams, PinDataResponse } from '@rupoi/shared/model'

const BASE = '/zags' as const

async function getDataByPin(params: PinDataParams): Promise<PinDataResponse> {
  const query = parseOrThrow(PinDataParamsSchema, params, 'GET /zags/data-by-pin params')
  const res = await rupoiInstance.get(`${BASE}/data-by-pin`, { params: query })
  return parseOrThrow(PinDataResponseSchema, res.data, 'GET /zags/data-by-pin response')
}

export const pinService = {
  getDataByPin,
}

