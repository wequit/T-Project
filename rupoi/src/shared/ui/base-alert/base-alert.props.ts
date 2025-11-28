export interface BaseAlertProps {
  type?: 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary'
  icon?: string
  title?: string
  dismissible?: boolean
}

