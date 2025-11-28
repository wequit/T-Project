import type { PersonDTO } from '../model/types'

/**
 * Получает номер телефона из контактов персоны
 */
function getPersonPhone(person: PersonDTO): string | null {
  return person.personContact?.phoneNumber || null
}

/**
 * Получает дополнительный номер телефона из контактов персоны
 */
function getPersonAdditionalPhone(person: PersonDTO): string | null {
  return person.personContact?.additionalNumber || null
}

/**
 * Получает адрес регистрации персоны
 */
function getPersonRegistrationAddress(person: PersonDTO): string | null {
  return person.personAddress?.registrationAddress || null
}

/**
 * Получает фактический адрес персоны
 */
function getPersonActualAddress(person: PersonDTO): string | null {
  return person.personAddress?.actualAddress || null
}

/**
 * Получает место работы персоны
 */
function getPersonWorkPlace(person: PersonDTO): string | null {
  return person.personContact?.workPlace || null
}

export const personAccessors = {
  getPersonPhone,
  getPersonAdditionalPhone,
  getPersonRegistrationAddress,
  getPersonActualAddress,
  getPersonWorkPlace,
}