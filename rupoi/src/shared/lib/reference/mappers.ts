import type { ReferenceDTO, SelectOption } from "@rupoi/shared/model"

export function mapRefToOptions(list: ReferenceDTO[]): SelectOption[] {
    return (list ?? []).map((r) => ({ label: r.nameRu, value: r.id }))
  }