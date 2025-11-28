import { apiClient } from "@/shared/api/client";
import { parseOrThrow } from "@/shared/lib";
import { ProjectDTOSchema, ProjectListDTOSchema, ProjectCreateParamsSchema } from "../model/schemas";
import type { ProjectDTO, ProjectListDTO, ProjectCreateParams } from "../model/types";

const BASE = "/projects";

async function getAll(): Promise<ProjectListDTO> {
  const res = await apiClient.get(`${BASE}/getAll`);
  return parseOrThrow(ProjectListDTOSchema, res.data, "GET /projects/getAll");
}

async function create(params: ProjectCreateParams): Promise<ProjectDTO> {
  const validatedParams = parseOrThrow(
    ProjectCreateParamsSchema,
    params,
    "Create project params"
  );
  
  const res = await apiClient.post(
    `${BASE}/create`,
    null,
    {
      params: {
        title: validatedParams.title,
        ...(validatedParams.description && { description: validatedParams.description }),
      },
    }
  );
  
  return parseOrThrow(ProjectDTOSchema, res.data, "POST /projects/create");
}

async function deleteById(projectId: number): Promise<void> {
  await apiClient.delete(`${BASE}/${projectId}`);
}

async function getById(projectId: number): Promise<ProjectDTO> {
  const res = await apiClient.get(`${BASE}/${projectId}`);
  return parseOrThrow(ProjectDTOSchema, res.data, `GET /projects/${projectId}`);
}

export const projectService = {
  getAll,
  getById,
  create,
  deleteById,
};

