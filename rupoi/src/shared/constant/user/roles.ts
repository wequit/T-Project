/**
 * Роли пользователей системы RUPOI
 */
export enum UserRole {
  ADMINISTRATOR = 'RUPOI_ADMINISTRATOR',
  MEDICAL_DEPARTMENT = 'RUPOI_MEDICAL_DEPARTMENT',
  CHIEF_DOCTOR = 'RUPOI_CHIEF_DOCTOR',
  DISPATCHER = 'RUPOI_DISPATCHER',
  WORKSHOP = 'RUPOI_WORKSHOP',
  WAREHOUSE = 'RUPOI_WAREHOUSE',
  REGISTRATION = 'RUPOI_REGISTRATION',
  TU_SPECIALIST = 'RUPOI_TU_SPECIALIST',
  TU_HEAD = 'RUPOI_TU_HEAD',
  DSZ_SPECIALIST = 'RUPOI_DSZ_SPECIALIST',
  DSZ_DIRECTOR = 'RUPOI_DSZ_DIRECTOR',
}

export const userRoles = Object.values(UserRole)

export const userRoleLabels: Record<UserRole, string> = {
  [UserRole.ADMINISTRATOR]: 'Администратор',
  [UserRole.MEDICAL_DEPARTMENT]: 'Медицинский отдел',
  [UserRole.CHIEF_DOCTOR]: 'Главный врач',
  [UserRole.DISPATCHER]: 'Диспетчер',
  [UserRole.WORKSHOP]: 'Мастерская',
  [UserRole.WAREHOUSE]: 'Склад',
  [UserRole.REGISTRATION]: 'Регистрация',
  [UserRole.TU_SPECIALIST]: 'Специалист ТУ',
  [UserRole.TU_HEAD]: 'Начальник ТУ',
  [UserRole.DSZ_SPECIALIST]: 'Специалист ДСЗ',
  [UserRole.DSZ_DIRECTOR]: 'Директор ДСЗ',
}

