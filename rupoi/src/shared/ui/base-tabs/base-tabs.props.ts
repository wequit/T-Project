export interface TabItem {
  key: string
  label: string
  icon?: string
  disabled?: boolean
}

export interface BaseTabsProps {
  tabs: TabItem[]
  modelValue: string
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}


