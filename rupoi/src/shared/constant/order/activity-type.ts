export enum ActivityType {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export const activityTypes = Object.values(ActivityType)

export const activityTypeOptions = [
  { label: 'Низкий', value: ActivityType.LOW },
  { label: 'Средний', value: ActivityType.MEDIUM },
  { label: 'Высокий', value: ActivityType.HIGH },
]
