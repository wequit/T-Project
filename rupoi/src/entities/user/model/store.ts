import { computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { UserRole } from '@rupoi/shared/constant'
import { commonAuthUserModel } from '@common/entities/common-auth-user'

const KNOWN_ROLES = new Set(Object.values(UserRole))

export const commonAuthUserStore = commonAuthUserModel.createStore('rupoi')

export const useStore = defineStore('rupoi-user', () => {

  const { roleCodes } = storeToRefs(commonAuthUserStore())

  const roles = computed<UserRole[]>(() => {
    return roleCodes.value
      ?.map(role => role.toUpperCase() as UserRole)
      .filter(role => KNOWN_ROLES.has(role)) ?? []
  })

  return {
    roles,
  }
})
