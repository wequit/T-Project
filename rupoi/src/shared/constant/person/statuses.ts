export enum PersonStatus {
  ACTIVE = "ACTIVE",
  SENT_TO_MED = "SENT_TO_MED",
  INACTIVE = "INACTIVE",
}

export const personStatuses = Object.values(PersonStatus)

export const personStatusOptions = [
  { label: "Активен", value: PersonStatus.ACTIVE },
  { label: "Деактивирован", value: PersonStatus.INACTIVE },
]
