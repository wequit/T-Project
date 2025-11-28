export const RouteConfig = {
  Person: {
    list: {
      path: '/person',
      name: 'PersonList',
    },
    view: {
      path: '/person/:id',
      name: 'PersonView',
    },
    create: {
      path: '/person/create',
      name: 'PersonCreate',
    },
    edit: {
      path: '/person/:id/edit',
      name: 'PersonEdit',
    },
  },

  Warehouse: {
    index: {
      path: '/warehouse',
      name: 'Warehouse',
    }
  },

  Reports: {
    index: {
      path: '/reports',
      name: 'Reports',
    },
  },

  Settings: {
    index: {
      path: '/settings',
      name: 'Settings',
    }
  },

  Dispatcher: {
    index: {
      path: '/dispatcher',
      name: 'Dispatcher',
    }
  },

  Workshop: {
    index: {
      path: '/workshop',
      name: 'Workshop',
    }
  },

  ChiefDoctor: {
    index: {
      path: '/chief-doctor',
      name: 'ChiefDoctor',
    }
  },

  Order: {
    // Заказы на изготовление протеза
    prosthesis: {
      list: {
        path: '/orders/prosthesis',
        name: 'OrderProsthesisList',
      },
      view: {
        path: '/orders/prosthesis/:id',
        name: 'OrderProsthesisView',
      },
      create: {
        path: '/orders/prosthesis/create',
        name: 'OrderProsthesisCreate',
      },
      edit: {
        path: '/orders/prosthesis/:id/edit',
        name: 'OrderProsthesisEdit',
      },
    },
    // Заказы на изготовление обуви
    shoe: {
      list: {
        path: '/orders/shoes',
        name: 'OrderShoesList',
      },
      view: {
        path: '/orders/shoes/:id',
        name: 'OrderShoesView',
      },
      create: {
        path: '/orders/shoes/create',
        name: 'OrderShoesCreate',
      },
      edit: {
        path: '/orders/shoes/:id/edit',
        name: 'OrderShoesEdit',
      },
    },
    // Заказы на изготовление Оттобок
    ottobock: {
      list: {
        path: '/orders/ottobock',
        name: 'OrderOttobockList',
      },
      view: {
        path: '/orders/ottobock/:id',
        name: 'OrderOttobockView',
      },
      create: {
        path: '/orders/ottobock/create',
        name: 'OrderOttobockCreate',
      },
      edit: {
        path: '/orders/ottobock/:id/edit',
        name: 'OrderOttobockEdit',
      },
    },
    // Наряды на ремонт
    repair: {
      list: {
        path: '/orders/repair',
        name: 'OrderRepairList',
      },
      view: {
        path: '/orders/repair/:id',
        name: 'OrderRepairView',
      },
      create: {
        path: '/orders/repair/create',
        name: 'OrderRepairCreate',
      },
      edit: {
        path: '/orders/repair/:id/edit',
        name: 'OrderRepairEdit',
      },
    },
    // Заказы на готовые ПОИ
    readyMade: {
      list: {
        path: '/orders/ready-made',
        name: 'OrderReadyMadeList',
      },
      view: {
        path: '/orders/ready-made/:id',
        name: 'OrderReadyMadeView',
      },
      create: {
        path: '/orders/ready-made/create',
        name: 'OrderReadyMadeCreate',
      },
      edit: {
        path: '/orders/ready-made/:id/edit',
        name: 'OrderReadyMadeEdit',
      },
    },
  },

  Invoice: {
    // Накладные на протезы
    prosthesis: {
      list: {
        path: '/invoices/prosthesis',
        name: 'InvoiceProsthesisList',
      },
      view: {
        path: '/invoices/prosthesis/:id',
        name: 'InvoiceProsthesisView',
      },
      create: {
        path: '/invoices/prosthesis/create',
        name: 'InvoiceProsthesisCreate',
      },
      edit: {
        path: '/invoices/prosthesis/:id/edit',
        name: 'InvoiceProsthesisEdit',
      },
    },
    // Накладные на обувь
    shoe: {
      list: {
        path: '/invoices/shoe',
        name: 'InvoiceShoeList',
      },
      view: {
        path: '/invoices/shoe/:id',
        name: 'InvoiceShoeView',
      },
      create: {
        path: '/invoices/shoe/create',
        name: 'InvoiceShoeCreate',
      },
      edit: {
        path: '/invoices/shoe/:id/edit',
        name: 'InvoiceShoeEdit',
      },
    },
    // Накладные на Оттобок
    ottobock: {
      list: {
        path: '/invoices/ottobock',
        name: 'InvoiceOttobockList',
      },
      view: {
        path: '/invoices/ottobock/:id',
        name: 'InvoiceOttobockView',
      },
      create: {
        path: '/invoices/ottobock/create',
        name: 'InvoiceOttobockCreate',
      },
      edit: {
        path: '/invoices/ottobock/:id/edit',
        name: 'InvoiceOttobockEdit',
      },
    },
    // Накладные на ремонт
    repair: {
      list: {
        path: '/invoices/repair',
        name: 'InvoiceRepairList',
      },
      view: {
        path: '/invoices/repair/:id',
        name: 'InvoiceRepairView',
      },
      create: {
        path: '/invoices/repair/create',
        name: 'InvoiceRepairCreate',
      },
      edit: {
        path: '/invoices/repair/:id/edit',
        name: 'InvoiceRepairEdit',
      },
    },
    // Накладные на готовые ПОИ
    readyMade: {
      list: {
        path: '/invoices/ready-made',
        name: 'InvoiceReadyMadeList',
      },
      view: {
        path: '/invoices/ready-made/:id',
        name: 'InvoiceReadyMadeView',
      },
      create: {
        path: '/invoices/ready-made/create',
        name: 'InvoiceReadyMadeCreate',
      },
      edit: {
        path: '/invoices/ready-made/:id/edit',
        name: 'InvoiceReadyMadeEdit',
      },
    },
  },

  WorkshopRegistry: {
    list: {
      path: '/workshop-registry',
      name: 'workshop-registry-list',
    },
    create: {
      path: '/workshop-registry/create',
      name: 'workshop-registry-create',
    },
    edit: {
      path: '/workshop-registry/:id/edit',
      name: 'workshop-registry-edit',
    },
  },
} as const
