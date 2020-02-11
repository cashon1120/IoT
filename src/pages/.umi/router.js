import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/cashon/Documents/work/IoT/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/login',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Login" */ '../Login'),
              LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
                .default,
            })
          : require('../Login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/cashon/Documents/work/IoT/node_modules/_umi-build-dev@1.11.3@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    Routes: [require('../Authorized').default],
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/product',
        name: 'product',
        icon: 'plus-circle',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Product__List" */ '../Product/List'),
              LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
                .default,
            })
          : require('../Product/List').default,
        exact: true,
      },
      {
        path: '/device',
        name: 'device',
        icon: 'car',
        routes: [
          {
            path: '/device/list',
            name: 'list',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Device__List" */ '../Device/List'),
                  LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
                    .default,
                })
              : require('../Device/List').default,
            exact: true,
          },
          {
            path: '/device/reg',
            name: 'reg',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Device__Reg" */ '../Device/Reg'),
                  LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
                    .default,
                })
              : require('../Device/Reg').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/cashon/Documents/work/IoT/node_modules/_umi-build-dev@1.11.3@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        icon: 'team',
        routes: [
          {
            path: '/system/user',
            name: 'user',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__System__User" */ '../System/User'),
                  LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/User').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/cashon/Documents/work/IoT/node_modules/_umi-build-dev@1.11.3@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/cashon/Documents/work/IoT/node_modules/_umi-build-dev@1.11.3@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/Users/cashon/Documents/work/IoT/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/cashon/Documents/work/IoT/node_modules/_umi-build-dev@1.11.3@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
