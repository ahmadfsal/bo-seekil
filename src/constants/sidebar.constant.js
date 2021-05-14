export const sidebarMenus = [
    {
        title: 'Dashboard',
        path: '/',
        child: []
    },
    // {
    //     title: 'Store',
    //     path: '/store',
    //     child: [
    //         {
    //             title: 'Workshop',
    //             path: '/store/workshop'
    //         },
    //         {
    //             title: 'Drop Zone',
    //             path: '/store/drop-zone'
    //         },
    //     ]
    // },
    {
        title: 'Master',
        path: '/master',
        child: [
            {
                title: 'Order',
                path: '/master/order'
            },
            {
                title: 'Services',
                path: '/master/services'
            },
            {
                title: 'Products',
                path: '/master/products'
            },
            {
                title: 'Partnership',
                path: '/master/partnership'
            },
            {
                title: 'Promo',
                path: '/master/promo'
            },
        ]
    },
    {
        title: 'Customer',
        path: '/customer',
        child: []
    },
    {
        title: 'Order',
        path: '/order',
        child: []
    },
    {
        title: 'Report',
        path: '/report',
        child: []
    },
]