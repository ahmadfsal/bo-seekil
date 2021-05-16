import React from 'react';
import Loadable from 'react-loadable';
import { RouteWithSubRoutes } from '@utils';

const route = [
    {
        path: '/',
        title: 'Dashboard',
        exact: true,
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "dashboard" */ './dashboard'),
            loading: () => null,
            modules: ['dashboard']
        })
    },
    {
        path: '/master',
        title: 'Master',
        // exact: true,
        component: Loadable({
            loader: () => import(/* webpackChunkName: "master" */ './master'),
            loading: () => null,
            modules: ['master']
        })
    },
    {
        path: '/customer',
        title: 'Customer',
        // exact: true,
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "customer" */ './customer'),
            loading: () => null,
            modules: ['customer']
        })
    },
    {
        path: '/order',
        title: 'Order',
        exact: true,
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "order" */ './order/list'),
            loading: () => null,
            modules: ['order']
        })
    },
    {
        path: '/order/create',
        title: 'Create Order',
        exact: true,
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "create-order" */ './order/create'),
            loading: () => null,
            modules: ['create-order']
        })
    },
    {
        path: '/order/edit/:id',
        title: 'Edit Order',
        exact: true,
        component: Loadable({
            loader: () =>
                import(/* webpackChunkName: "edit-order" */ './order/edit'),
            loading: () => null,
            modules: ['edit-order']
        })
    },
    {
        path: '/report',
        title: 'Report',
        exact: true,
        component: Loadable({
            loader: () => import(/* webpackChunkName: "report" */ './report'),
            loading: () => null,
            modules: ['report']
        })
    }
];

const RouteList = () => <RouteWithSubRoutes routes={route} />;

export default RouteList;
