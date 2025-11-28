import type { 
  PersonStatus, 
  OrderStatus, 
  OrderPriority, 
  ActivityType, 
  OrderType, 
  ServiceFeeType, 
  ProsthesisSide 
} from '@rupoi/shared/constant'

export interface BaseStatusTagProps {
  status: PersonStatus | OrderStatus | OrderPriority | ActivityType | OrderType | ServiceFeeType | ProsthesisSide | string
  size?: 'sm' | 'md' | 'lg'
}

