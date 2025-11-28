export interface BaseModalProps {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showClose?: boolean
  persistent?: boolean
  centered?: boolean
  fullscreen?: boolean
}

export interface BaseModalEmits {
  'update:modelValue': [value: boolean]
  beforeClose: []
  afterClose: []
  beforeOpen: []
  afterOpen: []
}

