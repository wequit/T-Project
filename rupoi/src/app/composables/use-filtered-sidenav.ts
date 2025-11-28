import { computed } from 'vue'
import type { SidenavListItem } from '@common/widgets'
import {userModel} from '@rupoi/entities/user'
import { hasAnyRole } from '@rupoi/shared/lib'
import type { UserRole } from '@rupoi/shared/constant'

export interface SidenavListItemWithRoles extends Omit<SidenavListItem, 'list'> {
  roles?: UserRole[]
  list?: Array<{
    routeName: string
    text: string
    roles?: UserRole[]
  }>
}

/** Фильтрует сайдбар по ролям пользователя */
export function useFilteredSidenav(items: SidenavListItemWithRoles[]) {
  const userStore = userModel.useStore()
  
  const filteredItems = computed<SidenavListItem[]>(() => {
    return items
      .filter(item => hasAnyRole(userStore.roles, item.roles))
      .map(item => {
        if (item.list && item.list.length > 0) {
          const filteredList = item.list.filter(subItem => 
            hasAnyRole(userStore.roles, subItem.roles)
          )
          
          if (filteredList.length === 0) return null
          
          return {
            ...item,
            list: filteredList.map(({ routeName, text }) => ({ routeName, text })) as SidenavListItem['list']
          } as SidenavListItem
        }
        
        return item as SidenavListItem
      })
      .filter((item): item is SidenavListItem => item !== null)
  })
  
  return { filteredItems }
}

