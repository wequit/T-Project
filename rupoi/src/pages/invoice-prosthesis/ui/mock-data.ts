export interface InvoiceProsthesisDTO {
  id: number
  invoiceNumber: string
  date: string
  client: string
  quantity: string
  amount: string
  product: {
    name: string
    description?: string
  }
  status: 'approved' | 'pending' | 'rejected'
  priority: 'normal' | 'high' | 'low'
}

export const mockData: InvoiceProsthesisDTO[] = [
  {
    id: 1,
    invoiceNumber: 'НП-2024-001',
    date: '2024-02-15',
    client: 'Абдыкадыров Айбек Асылбекович',
    quantity: '1шт',
    amount: '15 000,00 KGS',
    product: {
      name: 'Протез бедра модульный',
      description: 'Модульный протез бедра'
    },
    status: 'approved',
    priority: 'normal'
  },
  {
    id: 2,
    invoiceNumber: 'НП-2024-002',
    date: '2024-02-20',
    client: 'Иванов Иван Иванович',
    quantity: '2шт',
    amount: '28 500,00 KGS',
    product: {
      name: 'Протез голени',
      description: 'Протез голени с механическим коленным модулем'
    },
    status: 'pending',
    priority: 'high'
  },
  {
    id: 3,
    invoiceNumber: 'НП-2024-003',
    date: '2024-03-01',
    client: 'Петров Петр Петрович',
    quantity: '1шт',
    amount: '12 000,00 KGS',
    product: {
      name: 'Протез стопы',
      description: 'Протез стопы с энергонакопителем'
    },
    status: 'approved',
    priority: 'normal'
  },
  {
    id: 4,
    invoiceNumber: 'НП-2024-004',
    date: '2024-03-05',
    client: 'Сидорова Анна Сергеевна',
    quantity: '1шт',
    amount: '18 750,00 KGS',
    product: {
      name: 'Протез предплечья',
      description: 'Протез предплечья с микропроцессорным управлением'
    },
    status: 'rejected',
    priority: 'low'
  },
  {
    id: 5,
    invoiceNumber: 'НП-2024-005',
    date: '2024-03-10',
    client: 'Козлов Михаил Владимирович',
    quantity: '1шт',
    amount: '22 000,00 KGS',
    product: {
      name: 'Протез бедра',
      description: 'Протез бедра с компьютерным коленным модулем'
    },
    status: 'pending',
    priority: 'high'
  },
  {
    id: 6,
    invoiceNumber: 'НП-2024-006',
    date: '2024-03-15',
    client: 'Морозова Елена Александровна',
    quantity: '1шт',
    amount: '9 500,00 KGS',
    product: {
      name: 'Протез кисти',
      description: 'Косметический протез кисти'
    },
    status: 'approved',
    priority: 'normal'
  },
  {
    id: 7,
    invoiceNumber: 'НП-2024-007',
    date: '2024-03-20',
    client: 'Волков Алексей Дмитриевич',
    quantity: '2шт',
    amount: '35 000,00 KGS',
    product: {
      name: 'Протез голени',
      description: 'Протез голени с механическим коленным модулем'
    },
    status: 'approved',
    priority: 'high'
  },
  {
    id: 8,
    invoiceNumber: 'НП-2024-008',
    date: '2024-03-25',
    client: 'Новикова Ольга Викторовна',
    quantity: '1шт',
    amount: '16 500,00 KGS',
    product: {
      name: 'Протез бедра',
      description: 'Протез бедра модульный'
    },
    status: 'pending',
    priority: 'normal'
  },
]

