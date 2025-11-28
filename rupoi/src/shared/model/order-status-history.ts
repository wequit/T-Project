import { z } from 'zod'
import { ZodErrorMessages } from '@rupoi/shared/constant'

/**
 * Общая схема для элемента истории статусов заказа
 * Используется всеми типами заказов (prosthesis, shoe, repair, ready-made, ottobock)
 */
export const OrderStatusHistoryItemSchema = z.object({
  id: z.number(ZodErrorMessages.INVALID_NUMBER),
  orderId: z.number(ZodErrorMessages.INVALID_NUMBER),
  status: z.string(ZodErrorMessages.INVALID_STRING),
  comment: z.string(ZodErrorMessages.INVALID_STRING),
  createdAt: z.string(ZodErrorMessages.INVALID_STRING), // ISO datetime
})

/**
 * Общая схема для массива истории статусов
 */
export const OrderStatusHistorySchema = z.array(OrderStatusHistoryItemSchema)

/**
 * Общие типы для истории статусов заказов
 */
export type OrderStatusHistoryItem = z.infer<typeof OrderStatusHistoryItemSchema>
export type OrderStatusHistory = z.infer<typeof OrderStatusHistorySchema>

