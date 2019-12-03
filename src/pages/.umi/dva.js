import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'device', ...(require('/Users/cashon/Documents/work/IoT/src/models/device.ts').default) });
app.model({ namespace: 'global', ...(require('/Users/cashon/Documents/work/IoT/src/models/global.ts').default) });
app.model({ namespace: 'login', ...(require('/Users/cashon/Documents/work/IoT/src/models/login.ts').default) });
app.model({ namespace: 'product', ...(require('/Users/cashon/Documents/work/IoT/src/models/product.ts').default) });
app.model({ namespace: 'setting', ...(require('/Users/cashon/Documents/work/IoT/src/models/setting.ts').default) });
app.model({ namespace: 'system', ...(require('/Users/cashon/Documents/work/IoT/src/models/system.ts').default) });
app.model({ namespace: 'user', ...(require('/Users/cashon/Documents/work/IoT/src/models/user.ts').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
