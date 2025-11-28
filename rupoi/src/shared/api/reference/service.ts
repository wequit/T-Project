import {commonInstance} from "@rupoi/shared/api/axios-instance.ts";
import { parseOrThrow } from "@rupoi/shared/lib";
import { ReferenceTypes } from "@rupoi/shared/constant";
import {
  ReferenceDTOSchema,
  ReferenceListAllParamsSchema,
  ReferenceListPagedParamsSchema,
  ReferenceListAllDTOSchema,
  ReferenceListPagedDTOSchema,
} from "@rupoi/shared/model/reference/schemas.ts";
import type {
  ReferenceDTO,
  ReferenceListAllDTO,
  ReferenceListPagedDTO,
  ReferenceListAllParams,
  ReferenceListPagedParams,
} from "@rupoi/shared/model/reference/types.ts";
import { IDSchema } from "@rupoi/shared/model";

export async function getOne(type: ReferenceTypes, id: number): Promise<ReferenceDTO> {
  const validId = parseOrThrow(IDSchema, id, "Reference id");
  const res = await commonInstance.get(`/ref-${type}/${validId}`);
  return parseOrThrow(ReferenceDTOSchema, res.data, `GET /ref-${type}/{id} response`);
}

export async function getAll(
  type: ReferenceTypes,
  params?: ReferenceListAllParams
): Promise<ReferenceListAllDTO> {
  const query = params
    ? parseOrThrow(ReferenceListAllParamsSchema, params, `GET /ref-${type}/all params (all)`)
    : undefined;
  const res = await commonInstance.get(`/ref-${type}/all`, { params: query });
  return parseOrThrow(ReferenceListAllDTOSchema, res.data, `GET /ref-${type}/all response (all)`);
}

export async function getPaged(
  type: ReferenceTypes,
  params?: ReferenceListPagedParams
): Promise<ReferenceListPagedDTO> {
  const query = params
    ? parseOrThrow(ReferenceListPagedParamsSchema, params, `GET /ref-${type}/paged params (paged)`)
    : undefined;
  const res = await commonInstance.get(`/ref-${type}/paged`, { params: query });
  return parseOrThrow(ReferenceListPagedDTOSchema, res.data, `GET /ref-${type}/paged response (paged)`);
}
