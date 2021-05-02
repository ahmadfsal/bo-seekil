import React from 'react';
import Loadable from 'react-loadable';
import { RouteWithSubRoutes } from '@utils';

const route = [
    {
        path: '/products',
        title: 'Products',
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "products" */ './products'),
            loading: () => null,
            modules: ['products']
        })
    },
    {
        path: '/services',
        title: 'Services',
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "services" */ './services'),
            loading: () => null,
            modules: ['services']
        })
    },
    {
        path: '/order',
        title: 'Order',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "order" */ './order'),
            loading: () => null,
            modules: ['order']
        })
    },
    {
        path: '/partnership',
        title: 'Partnership',
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "partnership" */ './partnership'),
            loading: () => null,
            modules: ['partnership']
        })
    },
    {
        path: '/promo',
        title: 'Promo',
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "promo" */ './topping'),
            loading: () => null,
            modules: ['promo']
        })
    }
];

const RouteList = () => <RouteWithSubRoutes routes={route} />;

export default RouteList;
