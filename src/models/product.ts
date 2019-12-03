import { Reducer } from 'redux';
import { Effect } from 'dva';
import { appList, saveApp, delApp} from '@/services/product';

export interface ProductModelState {
  data: any;
}

export interface ModelType {
  namespace: string;
  state: ProductModelState;
  effects: {
    appList: Effect;
    saveApp: Effect;
    delApp: Effect;
  };
  reducers: {
    saveData: Reducer<{}>;
  };
}

const LoginModel: ModelType = {
  namespace: 'product',

  state: {
    data: []
  },

  effects: {
    *appList({ payload }, { put, call }) {
      const response = yield call(appList, payload);
      if (response) {
        yield put({
          type: 'saveData',
          payload: response,
        });
      }
    },
    *saveApp({ payload, callback }, { call }) {
      const response = yield call(saveApp, payload);
      if (callback) {
        callback(response);
      }
    },
    *delApp({ payload, callback }, { call }) {
      const response = yield call(delApp, payload);
      if (callback) {
        callback(response);
      }
    },
  },

  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
        data: payload.data,
      };
    },
  },
};

export default LoginModel;
